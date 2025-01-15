"use client";
import Image from 'next/image';

const Photo = () => {
    return (
        <div id="inicio" className="w-full bg-darkBg/60">
            <div className="flex justify-center pt-2">
            <h1 className="text-5xl font-bold text-white mb-4">
                Sergio Alonso Revueltas
            </h1>
            </div>
            <div className="flex justify-center pt-2 pb-4">

                <Image
                    src="/yo.png"
                    priority
                    width={300}
                    height={300}
                    alt="Foto perfil"
                    className="rounded-full z-10"
                />
            </div>
        </div>
    );
}

export default Photo;
