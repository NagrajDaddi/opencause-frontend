// HowItWorks.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CreateCampaignCard from "./CreateCampaignCard";
import ShareWithDonorsCard from "./ShareWithDonorsCard";
import TrackOnBlockchainCard from "./TrackOnBlockchainCard";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const cards = track.querySelectorAll(".how-card");
    const cardsCount = cards.length;
    if (!container || !track || cardsCount === 0) return;

    // refresh function to compute values after resize
    const refreshValues = () => {
      const viewportW = window.innerWidth;
      const totalScroll = viewportW * (cardsCount - 1);
      return { viewportW, totalScroll };
    };

    const { viewportW, totalScroll } = refreshValues();

    // ensure track has correct width (fallback if not set by CSS)
    track.style.width = `${cardsCount * 100}vw`;

    // set initial card styles
    gsap.set(cards, { opacity: 0.4, scale: 0.94 });
    gsap.set(cards[0], { opacity: 1, scale: 1 });

    const tween = gsap.to(track, {
      x: () => `-${totalScroll}px`,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => "+=" + totalScroll,
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: 1 / (cardsCount - 1),
        onUpdate: (self) => {
          const progress = self.progress; // 0..1
          const segments = cardsCount - 1;
          // update each card's focus based on distance to its segment center
          cards.forEach((card, i) => {
            const center = i / segments;
            const dist = Math.abs(progress - center);
            const opacity = gsap.utils.clamp(0.35, 1, 1 - dist * 1.6);
            const scale = gsap.utils.clamp(0.9, 1, 1 - dist * 0.18);
            const z = Math.round((1 - dist) * 100);
            gsap.to(card, { opacity, scale, duration: 0.25, overwrite: true });
            card.style.zIndex = 100 + z;
          });
        },
      },
    });

    // refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50"
    >
      {/* heading */}
      <div className="absolute top-8 left-0 right-0 z-30 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">🚀 How It Works</h2>
        <p className="mt-2 text-gray-600">A simple 3-step journey to launch and fund your cause.</p>
      </div>

      {/* horizontal track */}
      <div ref={trackRef} className="how-track absolute inset-0 flex items-center">
        <CreateCampaignCard />
        <ShareWithDonorsCard />
        <TrackOnBlockchainCard />
      </div>
    </section>
  );
}
