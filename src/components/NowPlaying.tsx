"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import TerminalPanel from "./TerminalPanel";
import { nowPlaying } from "@/data/portfolio";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
}

interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        options: {
          videoId: string;
          width?: string;
          height?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: YTPlayerEvent) => void;
            onStateChange?: (event: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_API_SRC = "https://www.youtube.com/iframe_api";

export default function NowPlaying() {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState<"idle" | "waiting" | "loading" | "playing" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    const attemptPlay = () => {
      playerRef.current?.playVideo();
    };

    const attachInteractionListeners = () => {
      const events: (keyof DocumentEventMap)[] = ["click", "keydown", "touchstart"];
      events.forEach((e) => document.addEventListener(e, onFirstInteraction, { once: true }));
    };

    const onFirstInteraction = () => {
      attemptPlay();
    };

    const onReady = (event: YTPlayerEvent) => {
      if (cancelled) return;
      playerRef.current = event.target;
      attemptPlay();
      // The IFrame API gives no reject-style signal for blocked autoplay —
      // check shortly after whether it actually started.
      setTimeout(() => {
        if (cancelled) return;
        if (!playingRef.current) {
          setStatus("waiting");
          attachInteractionListeners();
        }
      }, 800);
    };

    const onStateChange = (event: YTPlayerEvent) => {
      if (cancelled) return;
      const YT = window.YT;
      if (!YT) return;
      if (event.data === YT.PlayerState.PLAYING) {
        playingRef.current = true;
        setPlaying(true);
        setStatus("playing");
      } else if (event.data === YT.PlayerState.PAUSED) {
        playingRef.current = false;
        setPlaying(false);
        setStatus("idle");
      } else if (event.data === YT.PlayerState.BUFFERING) {
        setStatus("loading");
      }
    };

    const createPlayer = () => {
      if (!mountRef.current || cancelled) return;
      new window.YT!.Player(mountRef.current, {
        videoId: nowPlaying.youtubeVideoId,
        width: "0",
        height: "0",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: nowPlaying.youtubeVideoId,
        },
        events: { onReady, onStateChange },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        createPlayer();
      };
      if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
        const script = document.createElement("script");
        script.src = YT_API_SRC;
        script.onerror = () => !cancelled && setStatus("error");
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  return (
    <TerminalPanel title="~/now_playing">
      <div ref={mountRef} className="sr-only" aria-hidden="true" />

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
        {status === "waiting" && "click anywhere to start audio"}
        {status === "error" && "playback unavailable"}
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
