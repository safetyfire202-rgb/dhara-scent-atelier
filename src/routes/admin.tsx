import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Staff CRM & Admin Hub — Dhara Scent Atelier" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRedirect,
});

function AdminRedirect() {
  useEffect(() => {
    window.location.replace("/admin.html");
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
      <h1 className="font-display text-2xl font-semibold tracking-wider text-primary">
        Entering Staff CRM & Commerce Hub
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Redirecting to secure admin portal...
      </p>
      <a
        href="/admin.html"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
      >
        Open Admin Hub Directly &rarr;
      </a>
    </div>
  );
}
