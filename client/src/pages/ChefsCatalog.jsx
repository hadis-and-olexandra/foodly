// all chefs with filters

import React, { useState } from "react";

const tabs = [
  {
    id: "tab1",
    label: "Italy",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3",
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0",
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0",
      "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
      "https://images.unsplash.com/photo-1620064916958-605375619af8",
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
      "https://images.unsplash.com/photo-1432462770865-65b70566d673",
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
    ],
  },
  {
    id: "tab2",
    label: "France",
    images: [
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
      "https://images.unsplash.com/photo-1432462770865-65b70566d673",
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3",
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0",
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0",
      "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
      "https://images.unsplash.com/photo-1620064916958-605375619af8",
    ],
  },
  {
    id: "tab3",
    label: "Japan",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0",
      "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0",
      "https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg",
      "https://images.unsplash.com/photo-1620064916958-605375619af8",
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
      "https://images.unsplash.com/photo-1432462770865-65b70566d673",
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
    ],
  },
];

export default function ChefsCatalog() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6">
      {/* Форма по центру зверху */}
      <form
        action="#"
        className="flex w-full max-w-sm mx-auto items-center justify-center gap-2"
      >
        <div className="relative w-full">
          <input
            placeholder="Search sellers by name..."
            type="text"
            className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
        >
          Search
        </button>
      </form>

      {/* Таби з картинками */}
      <div className="flex gap-6">
        {/* Ліва панель навігації */}
        <div className="flex flex-col bg-stone-100 rounded-lg p-2 w-48 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 mb-1 rounded-md text-left transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white shadow font-semibold"
                  : "hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Контент праворуч */}
        <div className="flex-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${
                activeTab === tab.id ? "grid" : "hidden"
              } grid-cols-3 gap-4`}
            >
              {tab.images.slice(0, 9).map((src, i) => (
                <div key={i} className="relative group">
                  <img
                    className="h-40 w-full rounded-lg object-cover object-center"
                    src={src}
                    alt="image"
                  />
                  {/* Твой шаблон заголовка */}
                  <div className="max-w-sm bg-black/20 backdrop-blur-sm border border-white/50 rounded-lg shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-4 text-white absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative z-10">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0 text-center">
                          <h4 className="text-sm font-medium mb-1">
                            Organization Name
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
