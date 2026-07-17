import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/catalogue";
import { BUSINESS, whatsappLink as makeWhatsappLink } from "@/lib/business";
import { motion } from "framer-motion";
import { useEffect } from "react";

// Register model-viewer types for React
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean;
          "camera-controls"?: boolean;
          "shadow-intensity"?: string;
          "environment-image"?: string;
          exposure?: string;
          poster?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const Route = createFileRoute("/product/$id")({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw new Error("Product not found");
    return product;
  },
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const category = CATEGORIES.find((c) => c.id === product.category);

  useEffect(() => {
    // Dynamic import to avoid SSR issues if any with model-viewer
    import("@google/model-viewer");
  }, []);

  const whatsappLink = () => {
    const msg = `Hi! I'd like to order: ${product.name} (KES ${product.price.toLocaleString()})`;
    return makeWhatsappLink(msg);
  };

  // Using a generic 3D bottle placeholder since we don't have custom 3D models for each drink
  const bottleModelUrl =
    "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets/Models/WaterBottle/glTF/WaterBottle.gltf";

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-wine transition mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Catalogue
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 3D Product Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-3xl bg-cream/30 border border-wine/10 overflow-hidden shadow-inner flex items-center justify-center"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-wine/5 via-transparent to-transparent pointer-events-none" />
            <model-viewer
              src={bottleModelUrl}
              alt={`3D model of ${product.name}`}
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{ width: "100%", height: "100%" }}
              class="z-10 cursor-grab active:cursor-grabbing"
            ></model-viewer>
            <div className="absolute bottom-4 left-4 right-4 text-center z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] font-medium tracking-wider uppercase text-muted-foreground shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-wine/50 animate-pulse" />
                Drag to rotate 360°
              </span>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-wine/10 px-2.5 py-0.5 text-xs font-semibold text-wine">
                <span>{category?.emoji}</span> {category?.name}
              </span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                {product.origin}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-4 text-foreground">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-3xl font-bold text-wine tabular">
                KES {product.price.toLocaleString()}
              </span>
              {product.promo && (
                <span className="text-lg text-muted-foreground line-through tabular">
                  KES {product.promo.was.toLocaleString()}
                </span>
              )}
            </div>

            {product.promo && (
              <div className="mb-8 inline-block rounded-lg border border-wine/20 bg-wine/5 px-3 py-2 text-sm font-medium text-wine">
                🎉 Promo: {product.promo.label}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-border/60 mb-8">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Volume
                </p>
                <p className="font-medium">{product.size}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Tasting Notes
                </p>
                <p className="font-medium">{product.notes}</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              A premium selection from our {category?.name.toLowerCase()} collection. Perfect for
              any occasion and carefully sourced for quality. Note: 3D model is a generic
              placeholder representation.
            </p>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wine text-cream px-8 py-4 text-base font-semibold hover:bg-wine-deep transition-colors ring-focus shadow-xl shadow-wine/20"
            >
              <MessageCircle className="h-5 w-5" />
              Order on WhatsApp
            </a>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Available for immediate pickup or local delivery.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
