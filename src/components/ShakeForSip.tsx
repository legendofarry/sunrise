import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { MYSTERY_POURS } from "@/lib/catalogue";
import { whatsappLink } from "@/lib/business";

// Draggable bottle: fling it side-to-side to reveal a mystery pour.
// Uses spring physics + velocity threshold. Every "shake" cycles a new pour.
export function ShakeForSip() {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [shakes, setShakes] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 14 });
  const rotate = useTransform(springX, [-160, 0, 160], [-24, 0, 24]);
  const glow = useTransform(springX, [-160, 0, 160], [0.9, 0.3, 0.9]);

  const pour = MYSTERY_POURS[idx % MYSTERY_POURS.length];

  const shuffle = () => {
    const next = Math.floor(Math.random() * MYSTERY_POURS.length);
    setIdx(next === idx ? (next + 1) % MYSTERY_POURS.length : next);
    setRevealed(true);
    setShakes((s) => s + 1);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-wine/10 bg-gradient-to-br from-wine-deep via-wine to-[oklch(0.28_0.11_20)] p-6 sm:p-10 text-cream">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[oklch(0.6_0.2_25)]/20 blur-3xl" />

      <div className="relative grid gap-8 sm:grid-cols-[1fr_1.1fr] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-gold-soft">
            <Sparkles className="h-3.5 w-3.5" /> House Ritual
          </div>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Shake the bottle.
            <br />
            <span className="text-gradient-gold">Meet your pour.</span>
          </h3>
          <p className="mt-3 text-sm text-cream/70 max-w-sm">
            Drag the bottle side-to-side and let it go. We'll suggest a drink for the mood —
            no menu required.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={shuffle}
              className="inline-flex items-center gap-2 rounded-full bg-cream text-wine px-5 py-2.5 text-sm font-semibold hover:bg-gold hover:text-wine-deep transition ring-focus"
            >
              <RefreshCw className="h-4 w-4" /> Give me another
            </button>
            {revealed && (
              <a
                href={whatsappLink(`Hi! I'd like to order ingredients for a "${pour.name}".`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold hover:bg-cream/10 transition ring-focus"
              >
                Order the ingredients →
              </a>
            )}
          </div>
          {shakes > 0 && (
            <p className="mt-4 text-xs text-cream/50">
              {shakes} shake{shakes === 1 ? "" : "s"} · you're in the mood tonight.
            </p>
          )}
        </div>

        <div className="relative flex items-center justify-center py-6">
          <div className="absolute inset-x-6 bottom-3 h-3 rounded-full bg-black/50 blur-md" />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full bg-gold/20 blur-3xl"
            style={{ opacity: glow }}
          />
          <motion.button
            aria-label="Shake the bottle for a drink suggestion"
            drag="x"
            dragConstraints={{ left: -140, right: 140 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (Math.abs(info.velocity.x) > 400 || Math.abs(info.offset.x) > 80) shuffle();
            }}
            whileTap={{ scale: 0.97 }}
            style={{ x: springX, rotate }}
            className="relative h-56 w-24 sm:h-64 sm:w-28 cursor-grab active:cursor-grabbing focus:outline-none"
          >
            {/* Bottle SVG */}
            <svg viewBox="0 0 100 240" className="h-full w-full drop-shadow-2xl">
              <defs>
                <linearGradient id="glass" x1="0" x2="1">
                  <stop offset="0" stopColor="oklch(0.2 0.05 25)" />
                  <stop offset="0.5" stopColor="oklch(0.35 0.12 20)" />
                  <stop offset="1" stopColor="oklch(0.15 0.04 25)" />
                </linearGradient>
                <linearGradient id="label" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="oklch(0.97 0.02 82)" />
                  <stop offset="1" stopColor="oklch(0.88 0.06 82)" />
                </linearGradient>
              </defs>
              <rect x="42" y="4" width="16" height="30" rx="3" fill="oklch(0.78 0.13 82)" />
              <path
                d="M40 34 h20 c2 12 12 20 12 40 v150 c0 8 -4 12 -12 12 h-20 c-8 0 -12 -4 -12 -12 v-150 c0 -20 10 -28 12 -40 z"
                fill="url(#glass)"
              />
              <rect x="30" y="110" width="40" height="70" rx="4" fill="url(#label)" />
              <text x="50" y="140" textAnchor="middle" fontSize="9" fontFamily="Outfit" fontWeight="700" fill="oklch(0.34 0.13 15)">
                SUNRISE
              </text>
              <text x="50" y="154" textAnchor="middle" fontSize="6.5" fontFamily="Outfit" fill="oklch(0.34 0.13 15)">
                NGUMBA · EST
              </text>
              <line x1="34" y1="162" x2="66" y2="162" stroke="oklch(0.78 0.13 82)" strokeWidth="1" />
              <text x="50" y="174" textAnchor="middle" fontSize="5.5" fontFamily="Figtree" fill="oklch(0.34 0.13 15)">
                HOUSE RESERVE
              </text>
              <ellipse cx="38" cy="60" rx="3" ry="18" fill="oklch(1 0 0 / 0.15)" />
            </svg>
          </motion.button>
        </div>
      </div>

      <motion.div
        key={pour.name + revealed}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative mt-6 rounded-2xl bg-cream/10 backdrop-blur border border-cream/10 p-5"
      >
        {revealed ? (
          <>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold-soft">Tonight's pour</p>
            <h4 className="mt-1 font-display text-2xl font-bold">{pour.name}</h4>
            <p className="mt-1 text-sm text-cream/70">{pour.spec}</p>
            <p className="mt-2 text-xs italic text-cream/50">— {pour.vibe}</p>
          </>
        ) : (
          <p className="text-sm text-cream/60">Give the bottle a good shake to reveal your pour…</p>
        )}
      </motion.div>
    </div>
  );
}