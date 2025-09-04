import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myImage4 from "../assets/pexels-valeriya-842545.jpg";
import api from "../services/api"; // axios instance

export default function FilterCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [filters, setFilters] = useState([]); // cuisines from backend
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch cuisines from backend
  useEffect(() => {
    async function fetchCuisines() {
      try {
        const res = await api.get("/cuisines"); // GET /api/cuisines
        setFilters(res.data); // should return [{_id, name}, ...]
      } catch (err) {
        console.error("Failed to fetch cuisines:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCuisines();
  }, []);

  // Check if it possible to scroll left/right
  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScrollPosition();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const scrollByAmount = 150;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-6">
      {/* Card with image + description */}
      <div className="rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 flex flex-row h-[420px]">
        <div className="w-7/12">
          <img
            src={myImage4}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-5/12 p-8 flex flex-col h-full justify-between">
          <small className="font-sans antialiased text-xs mb-3 font-bold uppercase text-stone-600">
            Global Cuisine
          </small>
          <h5 className="font-sans antialiased font-bold text-2xl md:text-3xl lg:text-4xl text-current mb-3">
            Discover and Share Authentic Dishes from Around the World
          </h5>
          <p className="font-sans antialiased text-base text-stone-600 leading-relaxed">
            Foodly connects sellers and food lovers globally, offering a diverse
            marketplace of authentic cuisines. Sellers from different countries
            register to share their unique dishes, while customers enjoy
            exploring and purchasing food from various cultures.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center w-full mt-10">
        {/* Left fade + button */}
        {canScrollLeft && (
          <>
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-16
                bg-gradient-to-r from-white via-white/60 to-transparent backdrop-blur-md rounded-r-md"
            />
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="absolute left-1 z-30 p-2 rounded-md
                bg-white bg-opacity-40 backdrop-blur-md hover:bg-opacity-60 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Filters container */}
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 py-2 scroll-smooth w-full"
          style={{ scrollbarWidth: "none" }}
        >
          {loading ? (
            <p className="text-gray-500">Loading cuisines...</p>
          ) : (
            filters.map((cuisine) => (
              <button
                key={cuisine._id}
                onClick={() => navigate(`/cuisines/${cuisine._id}`)}
                className="flex-shrink-0 bg-gray-200 rounded-lg px-6 py-2 whitespace-nowrap hover:bg-gray-300 transition font-sans antialiased text-sm font-bold uppercase text-stone-600 cursor-pointer"
              >
                {cuisine.name}
              </button>
            ))
          )}
        </div>

        {/* Right fade + button */}
        {canScrollRight && (
          <>
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-16
                bg-gradient-to-l from-white via-white/60 to-transparent backdrop-blur-md rounded-l-md"
            />
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="absolute right-1 z-30 p-2 rounded-md
                bg-white bg-opacity-40 backdrop-blur-md hover:bg-opacity-60 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// import { useRef, useState, useEffect } from "react";
// import myImage4 from "../assets/pexels-valeriya-842545.jpg";

// export default function FilterCarousel() {
//   const scrollRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);

//   const filters = [
//     "Italy",
//     "France",
//     "Japan",
//     "China",
//     "Mexico",
//     "India",
//     "Thailand",
//     "Greece",
//     "Spain",
//     "Turkey",
//     "Lebanon",
//     "Vietnam",
//     "Korea",
//     "Morocco",
//     "USA",
//     "Brazil",
//     "Argentina",
//     "Peru",
//     "Indonesia",
//     "Malaysia",
//     "Germany",
//     "Ethiopia",
//     "Russia",
//     "Portugal",
//     "Poland",
//     "Egypt",
//     "South Africa",
//     "Australia",
//   ];

//   // Check if it possible to scroll left/right
//   const checkScrollPosition = () => {
//     const el = scrollRef.current;
//     if (!el) return;

//     setCanScrollLeft(el.scrollLeft > 0);
//     setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
//   };

//   useEffect(() => {
//     checkScrollPosition();

//     const el = scrollRef.current;
//     if (!el) return;

//     el.addEventListener("scroll", checkScrollPosition);
//     window.addEventListener("resize", checkScrollPosition);

//     return () => {
//       el.removeEventListener("scroll", checkScrollPosition);
//       window.removeEventListener("resize", checkScrollPosition);
//     };
//   }, []);

//   const scrollByAmount = 150;

//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto my-6 px-6">
//       {/* Картка з фото і описом */}
//       <div className="rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 flex flex-row h-[420px]">
//         <div className="w-7/12">
//           <img
//             src={myImage4}
//             alt="card-image"
//             className="h-full w-full object-cover"
//           />
//         </div>
//         <div className="w-5/12 p-8 flex flex-col h-full justify-between">
//           <small className="font-sans antialiased text-xs mb-3 font-bold uppercase text-stone-600">
//             Global Cuisine
//           </small>
//           <h5 className="font-sans antialiased font-bold text-2xl md:text-3xl lg:text-4xl text-current mb-3">
//             Discover and Share Authentic Dishes from Around the World
//           </h5>
//           <p className="font-sans antialiased text-base text-stone-600 leading-relaxed">
//             Foodly connects sellers and food lovers globally, offering a diverse
//             marketplace of authentic cuisines. Sellers from different countries
//             register to share their unique dishes, while customers enjoy
//             exploring and purchasing food from various cultures.
//           </p>
//         </div>
//       </div>

//       {/* Карусель під карткою */}
//       <div className="relative flex items-center w-full mt-10">
//         {/* Ліва кнопка і розмиття */}
//         {canScrollLeft && (
//           <>
//             <div
//               className="pointer-events-none absolute left-0 top-0 h-full w-16
//                 bg-gradient-to-r from-white via-white/60 to-transparent backdrop-blur-md rounded-r-md"
//             />
//             <button
//               onClick={scrollLeft}
//               aria-label="Scroll left"
//               className="absolute left-1 z-30 p-2 rounded-md
//                 bg-white bg-opacity-40 backdrop-blur-md hover:bg-opacity-60 transition"
//             >
//               <svg
//                 className="w-6 h-6 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>
//           </>
//         )}

//         {/* Контейнер фільтрів */}
//         <div
//           ref={scrollRef}
//           className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 py-2 scroll-smooth w-full"
//           style={{ scrollbarWidth: "none" }}
//         >
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               className="flex-shrink-0 bg-gray-200 rounded-lg px-6 py-2 whitespace-nowrap hover:bg-gray-300 transition font-sans antialiased text-sm font-bold uppercase text-stone-600"
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Права кнопка і розмиття */}
//         {canScrollRight && (
//           <>
//             <div
//               className="pointer-events-none absolute right-0 top-0 h-full w-16
//                 bg-gradient-to-l from-white via-white/60 to-transparent backdrop-blur-md rounded-l-md"
//             />
//             <button
//               onClick={scrollRight}
//               aria-label="Scroll right"
//               className="absolute right-1 z-30 p-2 rounded-md
//                 bg-white bg-opacity-40 backdrop-blur-md hover:bg-opacity-60 transition"
//             >
//               <svg
//                 className="w-6 h-6 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
