"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to Newscope</span>
    </Link>
  );
}