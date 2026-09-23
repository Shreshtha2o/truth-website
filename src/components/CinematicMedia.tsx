"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type CinematicMediaProps = Omit<ImageProps, "alt"> & {
  alt: string;
  reveal?: boolean;
  parallax?: number;
  eager?: boolean;
};

export default function CinematicMedia({
  alt,
  reveal = true,
  parallax = 0,
  eager = false,
  className = "",
  onLoad,
  ...props
}: CinematicMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!reveal || eager);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!reveal || eager || !ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "18% 0px 18% 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, reveal]);

  const handleLoad: NonNullable<ImageProps["onLoad"]> = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  return (
    <div
      ref={ref}
      className={`cinematic-media ${visible ? "is-visible" : ""} ${loaded ? "is-loaded" : ""} ${className}`}
      style={{ "--media-parallax": `${parallax}px` } as React.CSSProperties}
    >
      <span className="cinematic-media__veil" aria-hidden="true" />
      {visible ? (
        <Image
          {...props}
          alt={alt}
          className="cinematic-media__image"
          loading={eager ? "eager" : "lazy"}
          onLoad={handleLoad}
        />
      ) : null}
    </div>
  );
}
