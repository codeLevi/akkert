"use client";

import { useEffect, useState } from "react";

export default function Slideshow() {
  const images = [
    "/slides/slide1.jpg",
    "/slides/slide2.jpg",
    "/slides/slide3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border bg-white/70 backdrop-blur">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
            (i === index ? "opacity-100" : "opacity-0")
          }
        />
      ))}
    </div>
  );
}
