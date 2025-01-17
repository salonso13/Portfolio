"use client";

import { useState } from "react";
import { itemsNavbar } from "@/data";
import { socialNetworks } from "@/data";
import { MotionTransition } from "./transition-component";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Cierra el menú después de hacer clic en un enlace
  };

  return (
    <MotionTransition
      position="right"
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
    >
      <nav>
        <div className="flex items-center justify-between px-4 md:px-10 py-2">
          {/* Botón Hamburguesa (Solo en pantallas pequeñas) */}
          <div className="block md:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 focus:outline-none"
            >
              <Image
                src="/menu-icon.png" // Asegúrate de tener este ícono en la carpeta public
                alt="Menu"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Menú de Navegación (Pantallas Grandes) */}
          <div className="hidden md:flex items-center gap-2 md:gap-5">
            {itemsNavbar.map((item) => (
              <div
                key={item.id}
                onClick={() => handleScroll(item.link.replace("#", ""))}
                className="px-2 md:px-4 py-1 md:py-2 rounded-full cursor-pointer hover:bg-secondary transition"
              >
                {item.icon}
              </div>
            ))}
          </div>

          {/* Redes Sociales (Pantallas Grandes) */}
          <div className="hidden md:flex items-center gap-3 md:gap-5">
            {socialNetworks.map(({ logo, src, id }) => (
              <a
                key={id}
                href={src}
                target="_blank"
                className="hover:text-secondary transition"
              >
                {logo}
              </a>
            ))}
          </div>
        </div>

        {/* Menú desplegable de pantalla completa (Pantallas Pequeñas) */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
            {/* Botón para cerrar el menú */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 focus:outline-none"
            >
              <Image
                src="/cerrar-menu.png" // Ícono de cierre en la carpeta public
                alt="Close Menu"
                width={24}
                height={24}
              />
            </button>

            {/* Enlaces de navegación */}
            <div className="flex flex-col items-center gap-4">
              {itemsNavbar.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleScroll(item.link.replace("#", ""))}
                  className="text-xl font-medium cursor-pointer hover:text-secondary transition"
                >
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Redes Sociales */}
            <div className="flex items-center gap-6 mt-8">
              {socialNetworks.map(({ logo, src, id }) => (
                <a
                  key={id}
                  href={src}
                  target="_blank"
                  className="hover:text-secondary transition"
                >
                  {logo}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </MotionTransition>
  );
};

export default Navbar;
