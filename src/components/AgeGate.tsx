import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS } from "@/lib/business";

const KEY = "sunrise-age-ok";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "1") setOpen(true);
    } catch (e) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || denied ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, denied]);

  const confirm = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {
      // ignore
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.16_0.02_30)]/95 backdrop-blur-lg px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
        >
          <motion.div
            className="relative max-w-md w-full rounded-3xl bg-cream text-ink p-8 shadow-2xl"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <motion.div
              className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-wine to-wine-deep grid place-items-center text-3xl"
              initial={{ rotate: -30, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
            >
              <span aria-hidden>🍷</span>
            </motion.div>
            <p className="text-center text-xs uppercase tracking-[0.3em] text-wine font-semibold">
              {BUSINESS.short}
            </p>
            <h1 id="age-title" className="mt-2 text-center font-display text-3xl font-bold">
              Are you 18 or older?
            </h1>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              You must be of legal drinking age in Kenya to enter this site. Please drink
              responsibly.
            </p>

            {denied ? (
              <div className="mt-6 rounded-2xl bg-wine/10 p-5 text-center">
                <p className="font-display text-lg font-semibold text-wine">
                  Sorry — you must be 18+.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Come back and see us when you're of age.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDenied(true)}
                  className="rounded-xl border border-wine/20 py-3 text-sm font-semibold text-ink hover:bg-wine/5 transition ring-focus"
                >
                  I'm under 18
                </button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={confirm}
                  className="rounded-xl bg-wine py-3 text-sm font-semibold text-cream hover:bg-wine-deep transition ring-focus"
                >
                  Yes, enter
                </motion.button>
              </div>
            )}

            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              By entering you agree to our commitment to responsible drinking.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
