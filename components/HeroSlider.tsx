"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// FIX #28: unique, descriptive alt text per slide
const slides = [
  { src: "/slide1.jpg", alt: "NK Hospital Main Entrance, Kalaburagi" },
  { src: "/slide2.jpg", alt: "NK Hospital Patient Care Wing" },
  { src: "/slide3.jpg", alt: "NK Hospital Advanced Surgical Block" },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className={`hero-slide object-cover${i === current ? " active" : ""}`}
          sizes="100vw"
        />
      ))}

      {/* FIX #9: Dot indicators so users know slides exist */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
