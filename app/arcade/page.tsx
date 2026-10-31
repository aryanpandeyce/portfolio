import type { Metadata } from "next";
import { ArcadeCabinetSection } from "@/components/arcade/arcade-cabinet-section";

export const metadata: Metadata = {
  title: "Arcade // Insert Coin | Aryan Pandey",
  description:
    "Play original retro 2D canvas games built from scratch: Bug Blaster and Packet Snake. Pure HTML5 Canvas, zero external game engines, 60 FPS performance.",
  alternates: {
    canonical: "/arcade/",
  },
  openGraph: {
    title: "Arcade // Insert Coin | Aryan Pandey",
    description:
      "Play original retro 2D canvas games: Bug Blaster and Packet Snake. Built with zero game engine dependencies.",
    url: "/arcade/",
  },
};

export default function ArcadePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aryanpandeyce.github.io/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Arcade",
        item: "https://aryanpandeyce.github.io/arcade/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="py-6">
        <ArcadeCabinetSection isStandalonePage={true} />
      </div>
    </>
  );
}
