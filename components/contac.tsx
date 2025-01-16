"use client";

const ContactMe = () => {
  return (
    <div className="w-full pt-16 md:pt-20 z-20">
      <div className="flex justify-center pt-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 z-10">
          Contáctame
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start px-4 md:px-16 py-6 md:py-10 z-10 ">
        {/* Columna Izquierda */}
        <div className="w-full md:w-1/2 px-2 md:px-5 z-10 pl-[5%]">
        <div className="w-full px-2 md:px-5 z-10">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Número de teléfono:</h1>
          <p className="text-sm sm:text-base pt-2">+34 679 747 854</p>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold pt-5">Correo Electrónico:</h1>
          <p className="text-sm sm:text-base pt-2">s.alonsorevueltas@gmail.com</p>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold pt-5">Localidad:</h1>
          <p className="text-sm sm:text-base pt-2">Madrid, España</p>
        </div>
        </div>

        {/* Columna Derecha */}
        <div className="w-full md:w-1/2 px-2 md:px-5 z-10">
        <form className="pl-[5%]" action="https://formspree.io/f/xjkkzezq" method="POST">
            <input id="nomb" placeholder="Nombre o Empresa" type="text" min="1" max="20" name="Name" />
            <input id="asun" placeholder="Asunto" type="text" name="Subject" />
            <input id="email" placeholder="Correo de contacto" type="email" min="1" max="20" name="Email" />
            <textarea id="messsage" placeholder="Mensaje" name="Message"></textarea>
            <br/>
            <button id="send" className="hover:bg-secondary" type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
