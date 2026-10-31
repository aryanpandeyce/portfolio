import React from "react";

export function Hero3DFallback() {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[340px] aspect-square rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-[8px_8px_0px_var(--retro-shadow-color)] flex flex-col justify-between overflow-hidden">
        {/* Terminal Header */}
        <div className="window-titlebar -mx-6 -mt-6 mb-4">
          <div className="window-dots">
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <span className="font-mono-code text-[11px] text-[var(--foreground-muted)]">
            RETRO_STATION.SYS
          </span>
          <div className="w-3" />
        </div>

        {/* Isometric Retro PC Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-[var(--accent)]/15 to-transparent blur-xl pointer-events-none" />

          {/* CRT Monitor Block */}
          <div className="relative z-10 w-44 h-36 bg-[var(--surface-muted)] border-2 border-[var(--border-retro)] rounded-xl shadow-[4px_4px_0px_var(--retro-shadow-color)] p-2.5 flex flex-col items-center justify-center">
            {/* Inner Screen */}
            <div className="w-full h-full bg-[#1A1917] rounded-lg border border-[var(--border)] p-2 flex flex-col justify-between relative overflow-hidden">
              <div className="font-mono-code text-[10px] text-[#55EB7C] space-y-0.5">
                <div>&gt; INIT SYSTEM</div>
                <div>&gt; RIVERA v2.6</div>
                <div className="text-[var(--accent)] font-bold animate-pulse">&gt; READY _</div>
              </div>
              <div className="text-[9px] font-mono-code text-[#55EB7C]/60 flex justify-between">
                <span>60 FPS</span>
                <span>RETRO-MODE</span>
              </div>
              {/* Scanlines inside screen */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 50%)",
                  backgroundSize: "100% 4px",
                }}
              />
            </div>
            {/* Monitor Stand */}
            <div className="w-12 h-2.5 bg-[var(--border)] border-x-2 border-b-2 border-[var(--border-retro)] -mb-4 mt-2 rounded-b" />
          </div>

          {/* Keyboard Base */}
          <div className="relative z-10 mt-6 w-52 h-10 bg-[var(--surface-muted)] border-2 border-[var(--border-retro)] rounded-lg shadow-[3px_3px_0px_var(--retro-shadow-color)] flex items-center justify-center gap-1.5 px-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Footer Meta Badge */}
        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono-code text-[10px] text-[var(--foreground-muted)]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
            STANDALONE FALLBACK
          </span>
          <span className="text-[var(--accent)]">LOW_GPU SAFE</span>
        </div>
      </div>
    </div>
  );
}
