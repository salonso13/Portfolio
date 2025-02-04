"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsGithub } from "react-icons/bs";
import { Tooltip } from "@heroui/tooltip";
import Link from "next/link";
import Image from "next/legacy/image";

const projects = [
  {
    id: "1",
    titulo: "API realizada con C#",
    descripcion:
      "API para autenticación y gestión de suscripciones personales, con soporte para tokens JWT (generación, validación y revocación), gestión de claves API seguras y funcionalidades avanzadas de seguridad.",
    image: "/GestorSus.png",
    github: "https://github.com/salonso13/Gestor-suscripciones",
    alt: "Gestor Suscripciones",
  },
  {
    id: "2",
    titulo: "API ChatBot con Gemini",
    descripcion:
      "API que usa la clave de Gemini para crear un chatbot inteligente, permitiendo interacciones en tiempo real con respuestas contextuales.",
    image: "/chatbot.png",
    github: "https://github.com/salonso13/Api-ChatBot.git",
    alt: "Gestor Suscripciones",
  },
];

const ContactMe = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    const currentIndex = swiper.activeIndex;
    if (currentIndex < projects.length) {
      setProject(projects[currentIndex]);
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 z-10">
          Proyectos
        </h1>
      </div>
      <div className="md:flex-row items-start px-4 md:px-16 py-6 md:py-10">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[20px] h-[50%]">
              {/* outline Numero */}
              <div className="text-8xl leading-none font-TourneyReg font-extrabold text-outline">
                {project.id}
              </div>
              {/* outline Categoria */}
              <div className="text-[42px] font-bold leading-none group-hover:text-accent capitalize">
                {project.titulo}
              </div>
              {/* Descripcion proyecto */}
              <div className="text-black/60 ">{project.descripcion}</div>
              {/* Linea */}
              <div className="border border-black/20 w-[96%]"></div>
              {/* Boton Github */}
              <div className="w-[50px] h-[50px]">
                <Link href={project.github}>
                  <Tooltip delay={100} content="Repositorio del proyecto">
                    <div className="w-[50px] h-[50px] rounded-full bg-darkBg flex justify-center items-center group">
                      <BsGithub className="text-white text-3xl group-hover:text-circuloPoryecto" />
                    </div>
                  </Tooltip>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] h-[400px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-black/5">
                      {/* Overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* Imagen */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
