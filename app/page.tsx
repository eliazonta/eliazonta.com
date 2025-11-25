"use client";
import Image from "next/image";
import { motion } from "framer-motion";
// import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex-grow flex items-center justify-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-[#141414] to-[#141414]" />

        <div className="text-center">
          <motion.div
            onPointerMove={(e) => {
              const { offsetX, offsetY, currentTarget } = e.nativeEvent;
              if (currentTarget) {
                const target = currentTarget as HTMLElement;
                const x = offsetX / target.offsetWidth - 0.5;
                const y = offsetY / target.offsetHeight - 0.5;

                e.currentTarget.style.transform = `rotateX(${
                  y * 2
                }deg) rotateY(${x * 4}deg) scale(1.01)`;
              }
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.transform =
                "rotateX(0deg) rotateY(0deg) scale(1)";
            }}
            className="blob overflow-hidden w-40 h-40 mx-auto shadow-xl"
          >
            <Image
              src="/pfp.jpeg"
              alt="Elia Zonta"
              // fill
              width={500}
              height={500}
              className="object-cover"
              // className="rounded-full mx-auto mb-8 shadow-lg"
            />
          </motion.div>
          <h1 className="text-6xl mb-4 text-white font-['ABC_Diatype'] font-[400] tracking-wide leading-tight">
            Elia Zonta
          </h1>
          <h2 className="text-2xl mb-6 text-white">
            <span className="opacity-80">chasing structure in </span>
            <a href="/about">chaos</a>
          </h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
