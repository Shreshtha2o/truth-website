"use client";

import { useEffect } from "react";

type MediaPreloaderProps = {
  sources: string[];
  enabled?: boolean;
};

export default function MediaPreloader({ sources, enabled = true }: MediaPreloaderProps) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const images = sources.filter(Boolean).map((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    return () => images.forEach((image) => { image.src = ""; });
  }, [enabled, sources]);

  return null;
}
