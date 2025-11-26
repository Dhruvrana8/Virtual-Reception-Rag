import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-center max-w-2xl">
        <div className="w-16 h-16 bg-lavender rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl font-bold text-lavender-dark">VR</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Virtual Reception
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          Your intelligent front-desk assistant. Seamlessly manage visitors and
          documents with AI.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-lavender hover:bg-lavender-dark text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
