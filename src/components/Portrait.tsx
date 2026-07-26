"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { profile, basePath } from "@/data/portfolio";

function parseColor(input: string, fallback: [number, number, number]): [number, number, number] {
  const hex = input.trim().replace("#", "");
  if (hex.length === 6 && /^[0-9a-fA-F]{6}$/.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  return fallback;
}

// A 2%-clip contrast stretch spreads out whatever tonal range the source
// photo actually has before the duotone mapping, so the final image doesn't
// look muddy under flat or uneven lighting.
function contrastStretch(histogram: number[], total: number): (v: number) => number {
  const clip = total * 0.02;
  let lo = 0;
  let hi = 255;
  let count = 0;
  for (let i = 0; i < 256; i++) {
    count += histogram[i];
    if (count > clip) {
      lo = i;
      break;
    }
  }
  count = 0;
  for (let i = 255; i >= 0; i--) {
    count += histogram[i];
    if (count > clip) {
      hi = i;
      break;
    }
  }
  if (hi <= lo) return (v) => v;
  return (v) => Math.min(255, Math.max(0, ((v - lo) / (hi - lo)) * 255));
}

export default function Portrait({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

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
      const canvas = canvasRef.current;
      const image = imageRef.current;
      if (!container || !canvas || !image) return;

      const rect = container.getBoundingClientRect();
      const containerW = rect.width || 320;
      const containerH = rect.height || 400;
      const targetAspect = containerW / containerH;

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

      const dpr = window.devicePixelRatio || 1;
      const pixelW = Math.round(containerW * dpr);
      const pixelH = Math.round(containerH * dpr);

      canvas.width = pixelW;
      canvas.height = pixelH;
      canvas.style.width = `${containerW}px`;
      canvas.style.height = `${containerH}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw at full target resolution — no coarse sampling grid — so every
      // bit of real photographic detail (the actual face) survives.
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, pixelW, pixelH);

      let imageData: ImageData;
      try {
        imageData = ctx.getImageData(0, 0, pixelW, pixelH);
      } catch {
        setFailed(true);
        return;
      }
      const data = imageData.data;
      const pixelCount = pixelW * pixelH;

      const luminance = new Float32Array(pixelCount);
      const histogram = new Array(256).fill(0);
      for (let p = 0; p < pixelCount; p++) {
        const i = p * 4;
        const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        luminance[p] = l;
        histogram[Math.min(255, Math.max(0, l | 0))]++;
      }
      const stretch = contrastStretch(histogram, pixelCount);

      const style = getComputedStyle(container);
      const [lr, lg, lb] = parseColor(style.getPropertyValue("--color-accent"), [244, 114, 182]);
      const [dr, dg, db] = parseColor(style.getPropertyValue("--color-bg"), [10, 10, 10]);

      for (let p = 0; p < pixelCount; p++) {
        const t = stretch(luminance[p]) / 255; // 0 (dark) -> 1 (light)
        const i = p * 4;
        data[i] = dr + (lr - dr) * t;
        data[i + 1] = dg + (lg - dg) * t;
        data[i + 2] = db + (lb - db) * t;
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
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
          <canvas ref={canvasRef} aria-hidden={!ready} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_3px)]" />
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
