import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/resume-viewer";

export const metadata: Metadata = {
  title: "Curriculum Vitae & Resume | Alex Rivera",
  description:
    "Web version and downloadable PDF resume of Alex Rivera, Senior Full-Stack Engineer and Cloud Architect.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
