import type { Metadata } from "next";
import { getAllProjects } from "@/lib/github";
import { ProjectsArchive } from "@/components/projects/projects-archive";
import { Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects & Repositories | Aryan Pandey",
  description:
    "Explore open source repositories, cloud-native microservices, payment platforms, and developer tooling built by Aryan Pandey.",
  alternates: {
    canonical: "/projects/",
  },
  openGraph: {
    title: "Projects & Repositories | Aryan Pandey",
    description:
      "Cloud-native microservices, event-driven payment systems, and open source architectures.",
    url: "/projects/",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono-code text-xs text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&lt; Back to Overview</span>
          </Link>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono-code text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>{"// DIRECTORY / REPOSITORIES"}</span>
            </div>
            <h1 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight">
              All Public Repositories &amp; Engineering Artifacts.
            </h1>
            <p className="text-base text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
              Browse through my open-source work across distributed systems, real-time event streaming,
              database internals, and developer tooling.
            </p>
          </div>
        </div>

        {/* Interactive Client Archive Grid */}
        <ProjectsArchive initialProjects={projects} />
      </div>
    </div>
  );
}
