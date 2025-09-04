import React, { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";

function AddDish() {
  const [cuisines, setCuisines] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    country: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Countries API
        const countriesRes = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const countries = countriesRes.data.map((c) => c.name.common).sort();

        // MealDB API
        const cuisinesRes = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const apiCuisines = cuisinesRes.data.meals.map((m) => m.strArea);

        // Merge
        const fullList = countries.map((country) => {
          const match = apiCuisines.find(
            (cuisine) =>
              cuisine.toLowerCase() === country.toLowerCase() ||
              cuisine.toLowerCase() === `${country} cuisine`.toLowerCase()
          );
          return match ? match : `${country} cuisine`;
        });

        setCuisines(fullList);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("countryName", formData.country);
    data.append("price", formData.price);
    data.append("createdBy", userId);

    const ingredientsArray = formData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    data.append("ingredients", JSON.stringify(ingredientsArray));

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await api.post("/foods", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Dish added:", res.data);
      alert("✅ New dish was added!");

      setFormData({
        name: "",
        description: "",
        ingredients: "",
        country: "",
        price: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error("Error adding dish:", err);
      alert("❌ Failed to add dish, please try again.");
    }
  };

  return (
    <div className="max-w-xs w-full rounded-lg shadow-sm overflow-hidden bg-white shadow-stone-950/5 mx-auto mt-6">
      <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-16 place-items-center shadow-none">
        <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">
          Add New Dish
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full h-max rounded px-3.5 py-2.5"
      >
        {/* Name */}
        <div className="mb-4 mt-2 space-y-1.5">
          <label className="font-sans antialiased text-sm text-black font-semibold">
            Name
          </label>
          <input
            name="name"
            placeholder="Dish name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
          />
        </div>

        {/* Description */}
        <div className="mb-4 space-y-1.5">
          <label className="font-sans antialiased text-sm text-black font-semibold">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Short description"
            value={formData.description}
            onChange={handleChange}
            className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4 space-y-1.5">
          <label className="font-sans antialiased text-sm text-black font-semibold">
            Ingredients
          </label>
          <input
            name="ingredients"
            placeholder="Comma separated ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
          />
        </div>

        {/* Cuisine */}
        <div className="mb-4 space-y-1.5">
          <label className="font-sans antialiased text-sm text-black font-semibold">
            Cuisine
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full outline-none text-stone-800 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
          >
            <option value="">Select Cuisine</option>
            {cuisines.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-4 space-y-1.5">
          <label className="font-sans antialiased text-sm text-black font-semibold">
            Price (€)
          </label>
          <input
            name="price"
            type="number"
            placeholder="Price in euros"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
          />
        </div>

        {/* Image upload */}
        <div className="mb-4 space-y-1.5 relative">
          <label className="font-sans antialiased text-sm text-black font-semibold">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer w-full outline-none text-stone-800 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400 flex justify-between items-center"
          >
            {imageFile ? imageFile.name : "Choose file"}{" "}
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            cursor-pointer
            hidden lg:ml-auto lg:inline-flex
            items-center justify-center select-none
            font-sans font-medium text-sm text-stone-50
            px-4 py-2 rounded-lg
            border border-stone-900
            bg-stone-800
            shadow-sm
            transition-colors duration-200
            hover:bg-stone-700
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none
          "
        >
          Add Dish
        </button>
      </form>
    </div>
  );
}

export default AddDish;

// import React, { useEffect, useState } from "react";
// import api from "../../services/api";
// import axios from "axios";

// function AddDish() {
//   const [cuisines, setCuisines] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     ingredients: "",
//     country: "",
//     price: "",
//   });
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Countries API
//         const countriesRes = await axios.get(
//           "https://restcountries.com/v3.1/all?fields=name"
//         );
//         const countries = countriesRes.data.map((c) => c.name.common).sort();

//         // MealDB API
//         const cuisinesRes = await axios.get(
//           "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
//         );
//         const apiCuisines = cuisinesRes.data.meals.map((m) => m.strArea);

//         // Merge
//         const fullList = countries.map((country) => {
//           const match = apiCuisines.find(
//             (cuisine) =>
//               cuisine.toLowerCase() === country.toLowerCase() ||
//               cuisine.toLowerCase() === `${country} cuisine`.toLowerCase()
//           );
//           return match ? match : `${country} cuisine`;
//         });

//         setCuisines(fullList);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userId = localStorage.getItem("userId");

//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("countryName", formData.country);
//     data.append("price", formData.price);
//     data.append("createdBy", userId);

//     const ingredientsArray = formData.ingredients
//       .split(",")
//       .map((i) => i.trim())
//       .filter(Boolean);
//     data.append("ingredients", JSON.stringify(ingredientsArray));

//     if (imageFile) {
//       data.append("image", imageFile);
//     }

//     try {
//       const res = await api.post("/foods", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Dish added:", res.data);
//       alert("✅ New dish was added!");

//       setFormData({
//         name: "",
//         description: "",
//         ingredients: "",
//         country: "",
//         price: "",
//       });
//       setImageFile(null);
//     } catch (err) {
//       console.error("Error adding dish:", err);
//       alert("❌ Failed to add dish, please try again.");
//     }
//   };

//   return (
//     <div className="max-w-xs w-full rounded-lg shadow-sm overflow-hidden bg-white shadow-stone-950/5 mx-auto mt-6">
//       <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-16 place-items-center shadow-none">
//         <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">
//           Add New Dish
//         </span>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full h-max rounded px-3.5 py-2.5"
//       >
//         {/* Name */}
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label className="font-sans antialiased text-sm text-black font-semibold">
//             Name
//           </label>
//           <input
//             name="name"
//             placeholder="Dish name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4 space-y-1.5">
//           <label className="font-sans antialiased text-sm text-black font-semibold">
//             Description
//           </label>
//           <textarea
//             name="description"
//             placeholder="Short description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
//           />
//         </div>

//         {/* Ingredients */}
//         <div className="mb-4 space-y-1.5">
//           <label className="font-sans antialiased text-sm text-black font-semibold">
//             Ingredients
//           </label>
//           <input
//             name="ingredients"
//             placeholder="Comma separated ingredients"
//             value={formData.ingredients}
//             onChange={handleChange}
//             required
//             className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
//           />
//         </div>

//         {/* Cuisine */}
//         <div className="mb-4 space-y-1.5">
//           <label className="font-sans antialiased text-sm text-black font-semibold">
//             Cuisine
//           </label>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             required
//             className="w-full outline-none text-stone-800 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
//           >
//             <option value="">Select Cuisine</option>
//             {cuisines.map((name) => (
//               <option key={name} value={name}>
//                 {name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Price */}
//         <div className="mb-4 space-y-1.5">
//           <label className="font-sans antialiased text-sm text-black font-semibold">
//             Price (€)
//           </label>
//           <input
//             name="price"
//             type="number"
//             placeholder="Price in euros"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             min="1"
//             step="0.01"
//             className="w-full outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400"
//           />
//         </div>

//         {/* Image upload */}
//         <div className="mb-4 space-y-1.5 relative">
//           <label className="font-sans antialiased text-sm text-black font-semibold">
//             Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             id="fileInput"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <label
//             htmlFor="fileInput"
//             className="cursor-pointer w-full outline-none text-stone-800 border border-stone-200 transition-all text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg hover:border-stone-300 focus:border-stone-400 flex justify-between items-center"
//           >
//             {imageFile ? imageFile.name : "Choose file"}{" "}
//           </label>
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           className="
//             cursor-pointer
//             hidden lg:ml-auto lg:inline-flex
//             items-center justify-center select-none
//             font-sans font-medium text-sm text-stone-50
//             px-4 py-2 rounded-lg
//             border border-stone-900
//             bg-stone-800
//             shadow-sm
//             transition-colors duration-200
//             hover:bg-stone-700
//             disabled:opacity-50 disabled:cursor-not-allowed
//             focus:outline-none
//           "
//         >
//           Add Dish
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddDish;
