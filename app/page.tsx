"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Factory,
  FlaskConical,
  Globe,
  Leaf,
  MapPin,
  Microscope,
  Printer,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Section = {
  title: string;
  icon: React.ReactNode;
  points: string[];
};

const sections: Section[] = [
  {
    title: "Bio-tech Solutions & Applications",
    icon: <FlaskConical className="size-5 text-yellow-300" />,
    points: [
      "Enzyme-based biotechnology solutions",
      "Probiotics for animal nutrition",
      "Food & beverage processing enzymes",
      "Eco-friendly industrial biotechnology",
    ],
  },
  {
    title: "Industrial Application",
    icon: <Factory className="size-5 text-yellow-300" />,
    points: [
      "Agriculture",
      "Animal Nutrition",
      "Food & Beverage Industry",
      "Industrial Biotechnology",
      "Environmental Solutions",
    ],
  },
  {
    title: "Impact & Contribution",
    icon: <Leaf className="size-5 text-yellow-300" />,
    points: [
      "Improving agricultural efficiency naturally",
      "Enhancing animal health and productivity",
      "Reducing chemical dependency in industries",
    ],
  },
  {
    title: "Core Biotech Products",
    icon: <Microscope className="size-5 text-yellow-300" />,
    points: [
      "Industrial Enzymes",
      "Feed Additives & Probiotics",
      "Agricultural Bio-Solutions",
      "Food Processing Enzymes",
      "Fermentation Solutions",
      "Sustainability-focused biotech products",
    ],
  },
  {
    title: "Research & Development",
    icon: <ShieldCheck className="size-5 text-yellow-300" />,
    points: [
      "Advanced enzymology research",
      "Continuous innovation in biotechnology",
      "Product optimization for industries",
      "Global quality standards compliance",
    ],
  },
];

const relatedImages = [
  {
    src: "/images/biotech-crops.svg",
    alt: "Agricultural biotechnology crops and nutrition visuals",
    caption: "Agriculture, feed and nutrition innovation",
  },
  {
    src: "/images/biotech-lab.svg",
    alt: "Biotechnology lab illustration",
    caption: "Research-driven enzyme and probiotic development",
  },
  {
    src: "/images/biotech-fermentation.svg",
    alt: "Fermentation and industrial biotech process visual",
    caption: "Fermentation and scalable industrial applications",
  },
];

function TiltCard({ title, icon, points }: Section) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 140, damping: 16, mass: 0.4 });
  const rotateY = useSpring(x, { stiffness: 140, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2;
    const dy = e.clientY - r.top - r.height / 2;
    x.set((dx / r.width) * 14);
    y.set((-dy / r.height) * 14);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group [perspective:1000px]"
    >
      <motion.div style={{ rotateX, rotateY }} className="h-full [transform-style:preserve-3d]">
        <Card className="h-full border-yellow-300/30 bg-zinc-900/55 transition duration-300 group-hover:border-yellow-300/65">
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2.5">
              {icon}
              <h3 className="poster-display text-lg font-semibold uppercase text-yellow-300">{title}</h3>
            </div>
            <ul className="space-y-2 text-sm leading-relaxed text-zinc-200">
              {points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-yellow-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ImageHighlight({ src, alt, caption }: (typeof relatedImages)[number]) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }}>
      <Card className="overflow-hidden border-yellow-300/30 bg-zinc-900/45">
        <div className="relative aspect-[4/3] w-full">
          <Image src={src} alt={alt} fill className="object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <CardContent className="py-3">
          <p className="text-sm text-zinc-200">{caption}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Home() {
  const posterRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 28 });

  const glow = useMemo(
    () => ({
      background: `radial-gradient(420px circle at ${cursor.x}% ${cursor.y}%, rgba(250, 204, 21, 0.19), transparent 55%)`,
    }),
    [cursor],
  );

  return (
    <main className="relative min-h-screen overflow-x-clip px-3 py-10 md:px-6">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={glow}
        transition={{ duration: 0.28 }}
      />

      <div className="no-print mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-yellow-300/30 bg-zinc-950/70 p-4 backdrop-blur-xl">
        <p className="text-sm text-zinc-200">Interactive Poster • Optimized for browser Print to PDF</p>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 size-4" />
          Print / Save as PDF
        </Button>
      </div>

      <section
        ref={posterRef}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursor({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
        className="print-poster relative mx-auto w-full max-w-5xl rounded-[2rem] border border-yellow-300/35 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-6 shadow-[0_28px_70px_-30px_rgba(250,204,21,0.5)] md:p-10"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_15%_15%,rgba(250,204,21,0.16),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(250,204,21,0.10),transparent_45%),linear-gradient(120deg,transparent,rgba(255,255,255,0.03),transparent)]" />

        <header className="relative z-10 flex flex-col gap-4 border-b border-yellow-300/25 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="poster-display rounded-full border border-yellow-300/50 px-5 py-2 text-sm tracking-[0.22em] text-yellow-300">
            ZYTEX
          </div>
          <div className="flex items-start gap-2 text-sm text-zinc-200 md:max-w-[320px]">
            <MapPin className="mt-0.5 size-4 text-yellow-300" />
            <p>
              Zytex Biotech Pvt. Ltd. 702/B Polaris, Off Marol Maroshi Road,
              Marol, Andheri (East), Mumbai - 400059, India.
            </p>
          </div>
        </header>

        <div className="relative z-10 mt-8 space-y-6">
          <div>
            <h1 className="poster-display text-2xl font-extrabold uppercase leading-tight text-yellow-300 md:text-4xl">
              Innovating Biotechnology for a Sustainable Future
            </h1>
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-zinc-100 md:text-xl/relaxed">
              Zytex is a biotechnology-driven company focused on developing enzyme
              technologies, probiotics, and bio-based solutions that enhance
              productivity across agriculture, animal nutrition, food processing,
              and industrial applications.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {sections.slice(0, 3).map((section) => (
              <TiltCard key={section.title} {...section} />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {relatedImages.map((image) => (
              <ImageHighlight key={image.src} {...image} />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <TiltCard {...sections[3]} />
            <TiltCard {...sections[4]} />
          </div>

          <Card className="border-yellow-300/30 bg-black/45">
            <CardContent className="space-y-4 py-5">
              <h2 className="poster-display text-lg font-semibold uppercase text-yellow-300">Contact</h2>
              <div className="grid gap-2 text-sm text-zinc-100 md:grid-cols-3">
                <p className="flex items-center gap-2">
                  <Globe className="size-4 text-yellow-300" /> www.zytex.com
                </p>
                <p>info@zytex.com</p>
                <p>+91-22-6772 3000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
