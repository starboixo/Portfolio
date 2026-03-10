"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 75;

function getFramePath(index: number) {
  const paddedIndex = index.toString().padStart(2, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndexTransformer = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndexTransformer, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current) return;
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest)));
    const img = images[index];
    if (img) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        if (canvasRef.current.width !== img.width || canvasRef.current.height !== img.height) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
        }
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      }
    }
  });

  // Initial draw
  useEffect(() => {
     if (imagesLoaded && images[0] && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
            canvasRef.current.width = images[0].width;
            canvasRef.current.height = images[0].height;
            ctx.drawImage(images[0], 0, 0);
        }
     }
  }, [imagesLoaded, images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
         {!imagesLoaded && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 bg-[#121212]">
                <div className="animate-pulse tracking-widest text-sm text-neutral-400 mb-2">LOADING SEQUENCE...</div>
                <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-white transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
                </div>
             </div>
         )}
         <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 delay-300"
          style={{ opacity: imagesLoaded ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
