using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using static trim1_dwes.Program;

namespace trim1_dwes
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Conexion a la base de datos SQLite
            string connectionString = "Data Source=Auth.db";
            var secretKey = "your_longer_secret_key_here_123your_longer_secret_key_here_123"; // Clave secreta
            var issuer = "example.com"; // Emisor del token
            var audience = "example_audience"; // Audiencia del token

            // Lista para manejar tokens revocados
            var revokedTokens = new HashSet<string>();

            // Agrega servicios de autenticación y autorización
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = issuer,
                        ValidAudience = audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)) // Clave secreta
                    };

                    // Validación de token revocado
                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var token = context.Request.Headers["Authorization"].ToString().Split(" ").Last();
                            if (revokedTokens.Contains(token))
                            {
                                context.Fail("Token revocado.");
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            builder.Services.AddAuthorization();

            var app = builder.Build();

            app.UseAuthentication();
            app.UseAuthorization();

            // Endpoint para obtener el token JWT
            app.MapPost("/auth/login", async (UserCredentials user) =>
            {
                using (var connection = new SqliteConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "SELECT * FROM Users WHERE Username = @user AND Password = @passwrd;";
                    command.Parameters.AddWithValue("@user", user.Username);
                    command.Parameters.AddWithValue("@passwrd", user.Password);

                    var reader = await command.ExecuteReaderAsync();
                    if (await reader.ReadAsync()) // Validación básica
                    {
                        var jwtToken = GenerateJwtToken(user.Username, reader.GetInt32(0), secretKey, issuer, audience, TimeSpan.FromHours(1));

                        return Results.Ok(new { Token = jwtToken });
                    }
                    return Results.Unauthorized();
                }
            });

            // Endpoint para obtener todas las suscripciones del usuario autenticado
            app.MapGet("/subscriptions", async (HttpContext context) =>
            {
                var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Results.BadRequest("UserId inválido.");
                }

                using (var connection = new SqliteConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "SELECT * FROM Subscriptions WHERE UserID = @UserID";
                    command.Parameters.AddWithValue("@UserID", userId);

                    var reader = await command.ExecuteReaderAsync();
                    var subscriptions = new List<Subscriptions>();

                    while (await reader.ReadAsync())
                    {
                        subscriptions.Add(new Subscriptions
                        {
                            ID = reader.GetInt32(0),
                            ServiceName = reader.GetString(1),
                            MonthlyCost = reader.GetDouble(2),
                            RenewDate = reader.GetString(3),
                            UserID = reader.GetInt32(4)
                        });
                    }

                    if (subscriptions.Count > 0)
                    {
                        return Results.Ok(subscriptions);
                    }
                    return Results.NotFound("No se encontraron suscripciones.");
                }
            });

            // Endpoint para agregar una nueva suscripción
            app.MapPost("/subscriptions", async (HttpContext context, Subscriptions newSubscription) =>
            {
                var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Results.BadRequest("UserId inválido.");
                }

                using (var connection = new SqliteConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "INSERT INTO Subscriptions (ServiceName, MonthlyCost, RenewalDate, UserID) VALUES (@ServiceName, @MonthlyCost, @RenewalDate, @UserID)";

                    command.Parameters.AddWithValue("@ServiceName", newSubscription.ServiceName);
                    command.Parameters.AddWithValue("@MonthlyCost", newSubscription.MonthlyCost);
                    command.Parameters.AddWithValue("@RenewalDate", newSubscription.RenewDate);
                    command.Parameters.AddWithValue("@UserID", userId);

                    await command.ExecuteNonQueryAsync();
                    return Results.Created($"/subscriptions/{newSubscription.ServiceName}", newSubscription);
                }
                // Cuando creas una subscripcion en postman el userid y el id aparecen como 0, pero en la base de datos esta todo bien
            });

            // Endpoint para generar una nueva API Key
            app.MapPost("/apikeys", async (HttpContext context) =>
            {
                var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Results.BadRequest("UserId inválido.");
                }

                var apiKey = Guid.NewGuid().ToString();
                using (var connection = new SqliteConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "INSERT INTO ApiKeys (Key, UserId, CreatedAt, IsRevoked) VALUES (@Key, @UserId, @CreatedAt, 0)";
                    command.Parameters.AddWithValue("@Key", apiKey);
                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"));

                    await command.ExecuteNonQueryAsync();
                }
                return Results.Ok(apiKey);
            });

            // Endpoint para obtener todas las claves API activas
            app.MapGet("/apikeys", async (HttpContext context) =>
            {
                var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (!int.TryParse(userIdClaim, out int userId))
                {
                    return Results.BadRequest("UserId inválido.");
                }

                using (var connection = new SqliteConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "SELECT * FROM ApiKeys WHERE UserId = @UserId AND IsRevoked = 0";
                    command.Parameters.AddWithValue("@UserId", userId);

                    var reader = await command.ExecuteReaderAsync();
                    var apiKeys = new List<ApiKey>();

                    while (await reader.ReadAsync())
                    {
                        apiKeys.Add(new ApiKey
                        {
                            Id = reader.GetInt32(0),
                            Key = reader.GetString(1),
                            UserId = reader.GetInt32(2),
                            CreatedAt = reader.GetString(3),
                            IsRevoked = reader.GetInt32(4)

                        });
                    }
                    if (apiKeys.Count > 0)
                    {
                        return Results.Ok(apiKeys);
                    }
                    return Results.NotFound("No se encontraron Api Keys.");
                }
            });

            // Endpoint para revocar una clave API específica
            app.MapDelete("/apikeys/{id}", async (int id) =>
            {
                using (var connection = new SqliteConnection(connectionString))
                {
                    await connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "UPDATE ApiKeys SET IsRevoked = 1 WHERE Id = @Id";
                    command.Parameters.AddWithValue("@Id", id);

                    await command.ExecuteNonQueryAsync();
                    return Results.Ok("API key revoked");
                }
            });

            // Endpoint para validar una clave API
            app.MapGet("/apikeys/validate", (HttpContext context) =>
            {
                var apiKey = context.Request.Headers["x-api-key"].ToString();
                using (var connection = new SqliteConnection(connectionString))
                {
                    connection.OpenAsync();
                    var command = connection.CreateCommand();
                    command.CommandText = "SELECT * FROM ApiKeys WHERE Key = @Key AND IsRevoked = 0";
                    command.Parameters.AddWithValue("@Key", apiKey);

                    var reader = command.ExecuteReader();
                    if (reader.Read())
                    {
                        return Results.Ok("Api key is valid");
                    }
                    return Results.Unauthorized();
                }
            });

            // Helper para generar tokens JWT
            string GenerateJwtToken(string username, int userId, string key, string issuer, string audience, TimeSpan expiration)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var keyBytes = Encoding.UTF8.GetBytes(key);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name, username),
                        new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                    }),
                    Expires = DateTime.UtcNow.Add(expiration),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

            app.Run();
        }

        // Modelos
        public class Subscriptions
        {
            public int ID { get; set; }
            public string ServiceName { get; set; } = string.Empty;
            public double MonthlyCost { get; set; }
            public string RenewDate { get; set; } = string.Empty;
            public int UserID { get; set; }
        }

        public class UserCredentials
        {
            public int Id { get; set; }
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class ApiKey
        {
            public int Id { get; set; }
            public string Key { get; set; }
            public int UserId { get; set; }
            public string CreatedAt { get; set; }
            public int IsRevoked { get; set; }

        }
    }
}
