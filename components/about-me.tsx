"use client";

const AboutMe = () => {
    return (
        <div className="w-full pt-[56px] z-20">
            <div className="flex justify-center pt-5">
                <h1 className="text-5xl font-bold text-black mb-4 z-10">
                    Sobre mi
                </h1>
            </div>
            <div className="flex items-center px-4 py-2 pt-10 z-10">
                <div className="flex-column items-center gap-4 w-[60%] z-10">
                    <h1 className="text-[20px] font-bold">Fecha de nacimiento:</h1>
                    <p className="text-[15px] pt-2">4 de octubre de 2003.</p>

                    <h1 className="text-[20px] font-bold pt-5">Educación:</h1>
                    <ul className="list-disc list-inside text-[15px] pt-2">
                        <li>Curso de premonitor (Sept 2019 - Oct 2019)</li>
                        <li>Educación Secundaria Obligatoria (Sept 2014 - Jun 2021)</li>
                        <li>Técnico en sistemas microinformáticos y redes (Sept 2021 - Jun 2023)</li>
                        <li>Técnico Superior en desarrollo de aplicaciones web (Sept 2023- Actualidad)</li>
                    </ul>
                    <h1 className="text-[20px] font-bold pt-5">Experiencia:</h1>
                    <ul className="list-disc list-inside text-[15px] pt-2">
                        <li>Técnico Informático en Ortoalresa (Mar 2023 - Jun 2023)</li>
                        <li>Ayudante de camarero en Cafetería RENE (Jun 2022 - Sept 2022) (May 2024 - Sept 2024)</li>
                    </ul>
                    <h1 className="text-[20px] font-bold pt-5">Idiomas:</h1>
                    <ul className="list-disc list-inside text-[15px] pt-2">
                        <li>Español nativo</li>
                        <li>Ingles nivel B2</li>
                    </ul>

                </div>
                <div className="flex-column items-center gap-4 w-[60%]">
                    <h1 className="text-[20px] font-bold">Acerca de:</h1>
                    <p className="text-[15px] pt-2">A pesar de mi falta de experiencia laboral, he adquirido habilidades valiosas a través de mis
                        prácticas del ciclo formativo. Estas experiencias me han permitido desarrollar una mentalidad
                        proactiva, capacidad de resolución de problemas y habilidades de trabajo en equipo.
                        <br/>
                        Aunque soy un profesional en desarrollo con experiencia limitada. Estoy ansioso por aprender y
                        crecer profesionalmente, y estoy dispuesto a asumir nuevos desafíos. Soy una persona
                        altamente motivada, dedicada y comprometida con la excelencia. Además, tengo una gran
                        capacidad de adaptación y una actitud positiva hacia el aprendizaje continuo.
                        <br/>
                        Agradezco su consideración y la oportunidad de discutir cómo puedo contribuir al éxito de su
                        empresa. Estoy disponible para una entrevista en persona o por teléfono para profundizar en mi
                        perfil y mis capacidades.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
