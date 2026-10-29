"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/** A screenshot that opens full size on click; Escape or a click closes it. */
export function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block max-w-full cursor-zoom-in"
        aria-label={`Open full size: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* Screenshots are captured at 2x: `2x` keeps their layout size and makes them sharp on retina. */}
        <img src={src} srcSet={`${src} 2x`} alt={alt} loading="lazy" className="block h-auto max-w-full" />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} srcSet={`${src} 2x`} alt={alt} className="max-h-full max-w-full rounded-lg shadow-2xl" />
        </div>
      )}
    </>
  );
}
