"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  label?: string;
};

export default function AmbientSoundscape({
  src = "/audio/ambience.mp3",
  label = "Ambient sound",
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(false);
  const [volume, setVolume] = useState(0.22);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.loop = true;
    audio.volume = volume;
    audio.src = src;
    audioRef.current = audio;

    const onCanPlay = () => setAvailable(true);
    const onError = () => setAvailable(false);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (enabled) {
      audio.pause();
      setEnabled(false);
      return;
    }

    try {
      await audio.play();
      setEnabled(true);
    } catch {
      setEnabled(false);
    }
  };

  return (
    <div className="ambient-sound" aria-label={label} data-enabled={enabled}>
      <button
        type="button"
        className="ambient-sound__toggle"
        onClick={toggle}
        disabled={!available}
        aria-pressed={enabled}
        aria-label={available ? `${enabled ? "Mute" : "Play"} ambient sound` : "Ambient sound unavailable"}
        title={available ? `${enabled ? "Mute" : "Play"} ambient sound` : "Add /public/audio/ambience.mp3 to enable"}
      >
        <span className="ambient-sound__bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span>{enabled ? "SOUND ON" : "SOUND"}</span>
      </button>

      {available && (
        <label className="ambient-sound__volume">
          <span className="sr-only">Ambient sound volume</span>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      )}
    </div>
  );
}
