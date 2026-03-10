"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import ChatBox from "./ChatBox";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Opacity transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 0]);

  // Y transforms (Parallax effect)
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.45], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.8], [100, -100]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 h-[500vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* Section 1: 0% */}
        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center drop-shadow-2xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 uppercase">
            Amogh Lonare
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest text-neutral-300 uppercase mb-8">
            MSc Business Analytics & Management Science
          </p>
          <a
            href="/resume.pdf"
            download
            className="pointer-events-auto inline-block bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-mono px-8 py-3 rounded-full transition-all font-bold hover:scale-105"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Section 2: 30% */}
        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute left-[5%] md:left-[15%] text-left max-w-xl pr-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 drop-shadow-lg leading-tight mb-4">
            Driving data-informed strategic decisions
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            Over 3 years at Ubisoft bridging technical and product teams. Specializing in Agile QA, risk assessment, and KPI tracking to optimize operations.
          </p>
        </motion.div>

        {/* Section 3: 60% */}
        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute right-[5%] md:right-[15%] text-right max-w-xl pl-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg leading-tight mb-4">
            Bridging analytics <span className="text-neutral-500">& management</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            Leveraging Python, SQL, and AnyLogic simulations to translate complex data into actionable business recommendations.
          </p>
        </motion.div>

      </div>

      {/* Interactive elements need pointer-events-auto because parent has pointer-events-none */}
      <div className="pointer-events-auto">
        <ChatBox />
      </div>
    </div>
  );
}
