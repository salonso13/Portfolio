"use client";

import { itemsNavbar } from "@/data";
import { socialNetworks } from "@/data";
import { MotionTransition } from "./transition-component";

const Navbar = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
    }
  };

  return (
    <MotionTransition position="right" className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            {itemsNavbar.map((item) => (
              <div
                key={item.id}
                onClick={() => handleScroll(item.link.replace("#", ""))} // Llama a handleScroll
                className="px-3 py-2 transition duration-150 rounded-full cursor-pointer hover:bg-secondary"
              >
                {item.icon}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {socialNetworks.map(({ logo, src, id }) => (
              <a
                key={id}
                href={src}
                target="_blank"
                className="transition-all duration-300 hover:text-secondary"
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
