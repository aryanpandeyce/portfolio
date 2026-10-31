"use client";

import dynamic from "next/dynamic";
import { Hero3DFallback } from "./hero-3d-fallback";

export const Hero3DWrapper = dynamic(
  () => import("./hero-3d-scene").then((mod) => mod.Hero3DScene),
  {
    ssr: false,
    loading: () => <Hero3DFallback />,
  }
);
