"use client";

import Link from "next/link";
import { itemsNavbar } from "@/data";
import { socialNetworks } from "@/data";
import { MotionTransition } from "./transition-component";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = usePathname();
  return (
    <MotionTransition position="right" className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <nav>
        <div className="flex items-center justify-between px-4 py-2">
          {/* Botones de navegación alineados a la izquierda */}
          <div className="flex items-center gap-4">
            {itemsNavbar.map((item) => (
              <div
                key={item.id}
                className={`px-3 py-2 transition duration-150 rounded-full cursor-pointer hover:bg-secondary 
                  ${router === item.link && 'bg-secondary'}`}
              >
                <Link href={item.link}>{item.icon}</Link>
              </div>
            ))}
          </div>

          {/* Logos de redes sociales alineados a la derecha */}
          <div className="flex items-center gap-5">
            {socialNetworks.map(({ logo, src, id }) => (
              <Link
                key={id}
                href={src}
                target="_blank"
                className="transition-all duration-300 hover:text-secondary"
              >
                {logo}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </MotionTransition>
  );
};

export default Navbar;
