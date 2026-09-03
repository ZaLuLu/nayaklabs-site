import { useRef, useEffect } from "react";
import gsap from "gsap";

/**
 * HeroBackground
 * Fluid, GSAP-driven gradient blob field + faint anchoring grid.
 * Pair with a .grain-overlay element for the site-wide grain layer.
 */
export default function HeroBackground() {
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { motionOK } = context.conditions as { motionOK: boolean };
        if (!motionOK) return;

        gsap.to(blob1.current, {
          x: "+=120",
          y: "+=60",
          scale: 1.15,
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(blob2.current, {
          x: "-=100",
          y: "+=90",
          scale: 0.9,
          duration: 18,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
        gsap.to(blob3.current, {
          x: "+=80",
          y: "-=70",
          scale: 1.1,
          duration: 16,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.8,
        });

        return () => {
          gsap.killTweensOf([blob1.current, blob2.current, blob3.current]);
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-blob-field" aria-hidden="true">
        <div ref={blob1} className="hero-blob hero-blob--primary" />
        <div ref={blob2} className="hero-blob hero-blob--emerald" />
        <div ref={blob3} className="hero-blob hero-blob--cyan" />
      </div>
    </>
  );
}
