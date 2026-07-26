"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import TerminalPanel from "./TerminalPanel";
import { nowPlaying } from "@/data/portfolio";

export default function NowPlaying() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "error">("idle");

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      setStatus("idle");
      return;
    }

    try {
      setStatus("loading");
      await audio.play();
      setPlaying(true);
      setStatus("playing");
    } catch {
      setStatus("error");
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <TerminalPanel title="~/now_playing">
      <audio
        ref={audioRef}
        src={nowPlaying.streamUrl}
        preload="none"
        onError={() => {
          setStatus("error");
          setPlaying(false);
        }}
      />

      <p className="font-semibold text-fg">{nowPlaying.track}</p>
      <p className="text-xs text-muted mb-4">&gt; {nowPlaying.source}</p>

      <div className="flex items-center gap-2 text-xs text-muted mb-4">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            status === "playing" ? "bg-accent pulse-dot" : "bg-muted"
          }`}
        />
        {status === "playing" && "streaming live"}
        {status === "loading" && "connecting..."}
        {status === "error" && "stream unavailable — replace streamUrl in portfolio.ts"}
        {status === "idle" && "paused"}
      </div>

      <div className="flex items-center justify-center gap-8">
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
          className="text-accent hover:text-fg transition-colors"
        >
          {playing ? (
            <Pause className="h-6 w-6" fill="currentColor" />
          ) : (
            <Play className="h-6 w-6" fill="currentColor" />
          )}
        </button>
        <button
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={toggleMute}
          className="text-muted hover:text-accent transition-colors"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </TerminalPanel>
  );
}
