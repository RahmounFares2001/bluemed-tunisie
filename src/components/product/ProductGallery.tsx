import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <button
          aria-label="تكبير الصورة"
          onClick={() => setLightbox(true)}
          className="block aspect-square w-full"
        >
          <img src={images[active]} alt={name} className="h-full w-full object-cover" />
          <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-foreground shadow-md backdrop-blur">
            <ZoomIn size={18} />
          </div>
        </button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`عرض الصورة ${i + 1}`}
            className={`overflow-hidden rounded-lg border-2 transition-all ${
              active === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(false)}
              className="absolute inset-0 bg-navy/90 backdrop-blur"
            />
            <motion.img
              src={images[active]}
              alt={name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
            <button
              aria-label="إغلاق"
              onClick={() => setLightbox(false)}
              className="absolute left-6 top-6 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <X size={22} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
