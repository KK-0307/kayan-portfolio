"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { profile, basePath } from "@/data/portfolio";

// Dense → sparse. Dark source pixels get "ink"-heavy characters, light pixels
// (e.g. the studio backdrop) fade toward space so the subject reads as a
// glowing pink silhouette against the terminal background.
const RAMP = "@%#*+=-:. ";
const CHAR_ADVANCE = 0.6; // approx glyph width as a fraction of font-size for monospace fonts

export default function Portrait({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [ascii, setAscii] = useState<string | null>(null);
  const [cellSize, setCellSize] = useState({ fontSize: 5, lineHeight: 5 });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.src = `${basePath}${profile.portraitSrc}`;

    img.onload = () => {
      if (cancelled) return;
      imageRef.current = img;
      render();
    };
    img.onerror = () => {
      if (!cancelled) setFailed(true);
    };

    function render() {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image) return;

      const rect = container.getBoundingClientRect();
      const containerW = rect.width || 320;
      const containerH = rect.height || 400;
      const targetAspect = containerW / containerH;

      const cols = Math.max(50, Math.min(110, Math.round(containerW / 5)));
      const rows = Math.max(1, Math.round(cols / targetAspect));

      // Center-crop the source image to the container's aspect ratio (object-fit: cover).
      const iw = image.naturalWidth;
      const ih = image.naturalHeight;
      let sx = 0;
      let sy = 0;
      let sw = iw;
      let sh = ih;
      if (iw / ih > targetAspect) {
        sw = ih * targetAspect;
        sx = (iw - sw) / 2;
      } else {
        sh = iw / targetAspect;
        sy = (ih - sh) / 2;
      }

      const canvas = document.createElement("canvas");
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cols, rows);

      let data: Uint8ClampedArray;
      try {
        data = ctx.getImageData(0, 0, cols, rows).data;
      } catch {
        setFailed(true);
        return;
      }

      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          const charIndex = Math.min(RAMP.length - 1, Math.floor((brightness / 255) * RAMP.length));
          out += RAMP[charIndex];
        }
        out += "\n";
      }

      setAscii(out);
      setCellSize({
        fontSize: containerW / cols / CHAR_ADVANCE,
        lineHeight: containerH / rows,
      });
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`glow-accent relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border border-accent/40 bg-black ${className}`}
    >
      {!failed ? (
        <>
          <pre
            aria-hidden={!ascii}
            className="absolute inset-0 m-0 w-full overflow-hidden whitespace-pre text-accent select-none"
            style={{
              fontSize: `${cellSize.fontSize}px`,
              lineHeight: `${cellSize.lineHeight}px`,
              letterSpacing: 0,
            }}
          >
            {ascii}
          </pre>
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_1px,transparent_1px,transparent_3px)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_55%,rgba(0,0,0,0.6)_150%)]" />
          <span className="sr-only">{profile.name}</span>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-accent/10 to-transparent">
          <User className="h-20 w-20 text-accent/60" strokeWidth={1} />
        </div>
      )}
    </div>
  );
}
