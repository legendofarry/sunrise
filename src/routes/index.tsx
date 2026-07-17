import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Search,
  MapPin,
  Clock,
  Star,
  Sparkles,
  ArrowRight,
  X,
  Wine as WineIcon,
  ChevronDown,
} from "lucide-react";

import { AgeGate } from "@/components/AgeGate";
import { ShakeForSip } from "@/components/ShakeForSip";
import { BUSINESS, telLink, whatsappLink } from "@/lib/business";
import { CATEGORIES, FAQS, PRODUCTS, PROMOS, REVIEWS } from "@/lib/catalogue";

import heroImg from "@/assets/hero.jpg";
import storeImg from "@/assets/store-interior.jpg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import gal4 from "@/assets/gallery-4.jpg";
import gal5 from "@/assets/gallery-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never,
    ],
    meta: [
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <AgeGate />
      <div className="min-h-screen bg-background text-foreground bg-noise">
        <Header />
        <main id="main">
          <Hero />
          <Categories />
          <Featured />
          <Promos />
          <ShakeSection />
          <Visit />
          <Reviews />
          <Gallery />
          <FAQ />
          <ResponsibleNotice />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  );
}

/* ---------- Header ---------- */

function Header() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(247,242,232,0)", "rgba(247,242,232,0.85)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(0,0,0,0.06)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-lg border-b transition"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-wine text-cream">
            <WineIcon className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-background" />
          </span>
          <span className="font-display font-bold tracking-tight leading-none">
            <span className="block text-sm sm:text-base">Sunrise Wines</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Ngumba Estate
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
          {[
            ["Shop", "#categories"],
            ["Promos", "#promos"],
            ["Visit", "#visit"],
            ["Reviews", "#reviews"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="text-foreground/70 hover:text-wine transition ring-focus">
              {label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-wine text-cream px-3.5 py-2 text-xs sm:text-sm font-semibold hover:bg-wine-deep transition ring-focus"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </motion.header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.08]);

  return (
    <section id="top" className="relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-24">
      {/* Backdrop image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={1200}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-wine/15 bg-cream/60 backdrop-blur px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
            <span className="text-foreground/80">Open now · Walk-ins welcome</span>
          </div>

          <h1 className="mt-5 font-display font-black leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl">
            The corner of{" "}
            <span className="italic text-wine">Ngumba</span>
            <br />
            that pours <span className="text-gradient-gold">just right</span>.
          </h1>

          <p className="mt-5 max-w-lg text-base sm:text-lg text-muted-foreground">
            Hand-picked wines, honest whisky, cold beers and a warm hello. We're the neighborhood
            shop that remembers your usual — and always finds you something new to try.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-wine text-cream px-5 py-3 text-sm font-semibold hover:bg-wine-deep transition ring-focus"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 rounded-full border border-wine/20 bg-cream/60 backdrop-blur px-5 py-3 text-sm font-semibold hover:bg-cream transition ring-focus"
            >
              <MapPin className="h-4 w-4" /> Find the shop
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 max-w-md gap-4 text-sm">
            <Stat n="12+" label="years in Ngumba" />
            <Stat n="500+" label="bottles in stock" />
            <Stat n="4.9★" label="neighbour rating" />
          </div>
        </motion.div>

        <ScrollHint />
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl sm:text-3xl font-bold text-wine">{n}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      className="mt-14 hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ChevronDown className="h-4 w-4" /> Scroll to browse
    </motion.div>
  );
}

/* ---------- Categories + Search ---------- */

function Categories() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !activeCat) return [];
    return PRODUCTS.filter((p) => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q);
      const matchesC = !activeCat || p.category === activeCat;
      return matchesQ && matchesC;
    }).slice(0, 12);
  }, [query, activeCat]);

  const showing = query.trim() || activeCat;

  return (
    <section id="categories" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <SectionHead
        eyebrow="The shelves"
        title="Browse the categories"
        blurb="Not sure what you want? Tell us the vibe on WhatsApp — we'll pack a bag."
      />

      {/* Search */}
      <div className="mt-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search wines, whisky, gin, cocktails…"
          className="w-full rounded-full border border-wine/15 bg-cream/60 backdrop-blur pl-11 pr-11 py-3 text-sm outline-none focus:border-wine transition ring-focus"
          aria-label="Search the catalogue"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-wine/10"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip active={activeCat === null} onClick={() => setActiveCat(null)}>
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
            <span className="mr-1">{c.emoji}</span>
            {c.name}
          </Chip>
        ))}
      </div>

      {/* Results OR category grid */}
      {showing ? (
        <div className="mt-8">
          {results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26, delay: i * 0.03 }}
                  >
                    <ProductCard p={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              No match yet — ask us on WhatsApp, we probably have something close.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.accent} p-5 text-left text-cream aspect-[3/4] flex flex-col justify-between ring-focus`}
            >
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <p className="font-display text-xl font-bold">{c.name}</p>
                <p className="mt-1 text-[11px] text-cream/70 line-clamp-2">{c.blurb}</p>
              </div>
              <ArrowRight className="absolute top-4 right-4 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm border transition ring-focus ${
        active
          ? "bg-wine text-cream border-wine"
          : "bg-cream/60 text-foreground/70 border-wine/15 hover:border-wine/40"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  const cat = CATEGORIES.find((c) => c.id === p.category);
  return (
    <div className="group relative rounded-2xl border border-wine/10 bg-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {cat?.emoji} {cat?.name} · {p.origin}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold leading-tight">{p.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{p.size} · {p.notes}</p>
        </div>
        {p.promo && (
          <span className="shrink-0 rounded-full bg-wine/10 text-wine text-[10px] font-semibold px-2 py-1 uppercase tracking-wide">
            {p.promo.label}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          {p.promo && (
            <p className="text-xs text-muted-foreground line-through">
              KES {p.promo.was.toLocaleString()}
            </p>
          )}
          <p className="font-display text-xl font-bold text-wine">
            KES {p.price.toLocaleString()}
          </p>
        </div>
        <a
          href={whatsappLink(`Hi! Is the ${p.name} (${p.size}) in stock?`)}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-wine hover:text-wine-deep inline-flex items-center gap-1 ring-focus"
        >
          Ask on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Featured ---------- */

function Featured() {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <SectionHead
        eyebrow="Featured"
        title="This week's picks"
        blurb="What we're loving on the shelves right now."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.05 }}
          >
            <ProductCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Promos ---------- */

function Promos() {
  return (
    <section id="promos" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Weekly promotions"
          title="Small perks, every week"
          blurb="Locals only. No app, no card — just walk in or WhatsApp us."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PROMOS.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 24 }}
              className="relative overflow-hidden rounded-3xl border border-wine/10 bg-card p-6"
            >
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
              <span className="inline-block rounded-full bg-wine text-cream text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 font-semibold">
                {promo.tag}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">{promo.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{promo.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Shake for a Sip ---------- */

function ShakeSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <ShakeForSip />
    </section>
  );
}

/* ---------- Visit (map + hours) ---------- */

function Visit() {
  return (
    <section id="visit" className="py-16 sm:py-24 bg-wine text-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">Visit</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Come say <span className="italic text-gradient-gold">hello</span>.
          </h2>
          <p className="mt-4 text-cream/70 max-w-md">
            You'll find us tucked into the estate, warm lights on, cold beers waiting.
            Walk in, or send a message and we'll have it ready.
          </p>

          <div className="mt-6 space-y-4">
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Address" value={BUSINESS.address} />
            <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={<a className="hover:text-gold" href={telLink}>{BUSINESS.phoneDisplay}</a>} />
            <InfoRow icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" value={<a className="hover:text-gold" href={whatsappLink()} target="_blank" rel="noreferrer">Message us — usually reply within 10 minutes</a>} />
          </div>

          <div className="mt-8 rounded-2xl bg-cream/10 border border-cream/10 p-5">
            <div className="flex items-center gap-2 text-gold-soft">
              <Clock className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.25em]">Business hours</p>
            </div>
            <ul className="mt-3 divide-y divide-cream/10">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="flex justify-between py-2 text-sm">
                  <span className="text-cream/80">{h.day}</span>
                  <span className="font-medium">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden ring-1 ring-cream/10 min-h-[380px] bg-cream/5">
          <iframe
            title="Sunrise Wines Ngumba Estate location"
            src={`https://www.google.com/maps?q=${BUSINESS.mapsQuery}&z=15&output=embed`}
            className="w-full h-full min-h-[380px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-cream/10 text-gold-soft shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.2em] text-cream/60">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}

/* ---------- Reviews ---------- */

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <SectionHead
        eyebrow="Neighbours' words"
        title="What locals say"
        blurb="Real reviews from our regulars around Ngumba."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <motion.figure
            key={r.name + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.06, type: "spring", stiffness: 220, damping: 22 }}
            className="rounded-3xl border border-wine/10 bg-card p-6"
          >
            <div className="flex items-center gap-1 text-gold" aria-label={`${r.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className={`h-4 w-4 ${k < r.rating ? "fill-current" : "opacity-30"}`} />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{r.name}</span>
              <span>{r.date}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

function Gallery() {
  const items = [
    { src: gal1, alt: "Red wine being poured", span: "row-span-2" },
    { src: gal2, alt: "Premium whisky bottles on shelf", span: "" },
    { src: storeImg, alt: "Interior of Sunrise Wines Ngumba", span: "" },
    { src: gal5, alt: "Champagne bottle popping", span: "row-span-2" },
    { src: gal4, alt: "Cocktails at a bar counter", span: "" },
    { src: gal3, alt: "Craft beers in an ice bucket", span: "" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <SectionHead
        eyebrow="Inside the shop"
        title="A look around"
        blurb="Because a good bottle deserves the right room."
      />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className={`overflow-hidden rounded-2xl bg-muted ${it.span}`}
          >
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              className="h-full w-full object-cover hover:scale-105 transition duration-700"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
      <SectionHead
        eyebrow="Answers"
        title="Frequently asked"
        blurb="Anything else? Just ping us on WhatsApp."
      />
      <div className="mt-8 divide-y divide-wine/10 border-y border-wine/10">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left ring-focus"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg font-semibold">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="grid h-8 w-8 place-items-center rounded-full bg-wine/10 text-wine shrink-0"
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-10 text-sm text-muted-foreground">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Responsible ---------- */

function ResponsibleNotice() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
      <div className="rounded-3xl border border-wine/15 bg-cream/60 backdrop-blur p-6 sm:p-8 flex items-start gap-4">
        <span className="mt-1 grid h-10 w-10 place-items-center rounded-full bg-wine text-cream shrink-0">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold">Drink responsibly.</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Sunrise Wines is committed to responsible enjoyment. We do not sell alcohol to persons under 18.
            Please never drink and drive — call a cab, catch a boda, or stay with friends.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-wine/10 bg-cream/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-wine text-cream">
              <WineIcon className="h-4 w-4" />
            </span>
            <p className="font-display font-bold">Sunrise Wines Ngumba Estate</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            The neighborhood shop for wine, spirits and beer in Ngumba, Nairobi.
          </p>
        </div>
        <div className="sm:text-right text-sm text-muted-foreground space-y-1">
          <p>{BUSINESS.address}</p>
          <p>
            <a href={telLink} className="hover:text-wine">{BUSINESS.phoneDisplay}</a>
          </p>
          <p>© {new Date().getFullYear()} Sunrise Wines. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating actions ---------- */

function FloatingActions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex flex-col gap-2"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.55_0.16_150)] text-white px-4 py-3 text-sm font-semibold shadow-lg hover:brightness-110 ring-focus"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full bg-wine text-cream px-4 py-3 text-sm font-semibold shadow-lg hover:bg-wine-deep ring-focus"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-wine text-cream shadow-xl ring-4 ring-cream/40 ring-focus"
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
      >
        <svg viewBox="0 0 16 16" className="h-5 w-5">
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.button>
    </div>
  );
}

/* ---------- Shared bits ---------- */

function SectionHead({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.3em] text-wine font-semibold">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        {title}
      </h2>
      {blurb && <p className="mt-3 text-muted-foreground">{blurb}</p>}
    </div>
  );
}