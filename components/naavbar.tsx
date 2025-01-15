"use client";

import { itemsNavbar } from "@/data";
import { socialNetworks } from "@/data";
import { MotionTransition } from "./transition-component";

const Navbar = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MotionTransition
      position="right"
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
    >
      <nav>
        <div className="flex items-center justify-between px-4 md:px-10 py-2">
          {/* Menú de Navegación */}
          <div className="flex items-center gap-2 md:gap-5">
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

          {/* Redes Sociales */}
          <div className="flex items-center gap-3 md:gap-5">
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
      </nav>
    </MotionTransition>
  );
};

export default Navbar;
