import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { ResumeViewer } from "@/components/resume/resume-viewer";

export const metadata: Metadata = {
  title: "Curriculum Vitae & Resume | Aryan Pandey",
  description:
    "Verified CV and technical profile of Aryan Pandey, Backend & Cloud-Native Engineer specializing in Go, Java 21, Kubernetes, and Distributed Systems.",
  alternates: {
    canonical: "/resume/",
  },
  openGraph: {
    title: "Curriculum Vitae & Resume | Aryan Pandey",
    description:
      "Engineering career timeline, core technical loadout, academic merits, and production system achievements.",
    url: "/resume/",
  },
};

export default function ResumePage() {
  const resumePdfPath = path.join(process.cwd(), "public", "resume.pdf");
  const hasPdf = fs.existsSync(resumePdfPath);

  return <ResumeViewer hasPdf={hasPdf} />;
}
