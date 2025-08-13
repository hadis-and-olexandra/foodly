import React from "react";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-x-6 py-2 pb-8 text-center">
      <p className="font-sans antialiased text-xs font-bold uppercase text-stone-600 m-0">
        © 2025 Foodly
      </p>
      <a
        href="mailto:info@foodly.com"
        className="font-sans antialiased text-xs font-bold uppercase text-stone-600 hover:text-stone-500 transition m-0"
      >
        info@foodly.com
      </a>
    </footer>
  );
}
