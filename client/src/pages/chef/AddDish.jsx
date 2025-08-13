import React, { useEffect, useState } from "react";
import axios from "axios";

function AddDish() {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    countryName: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => {
        const sorted = response.data.map((c) => c.name.common).sort();
        setCountries(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      price: Number(formData.price),
    };

    axios
      .post("/api/foods", payload)
      .then((response) => {
        console.log("Dish added:", response.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />

        <select
          name="countryName"
          value={formData.countryName}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price (in euros €)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">Add Dish</button>
      </form>
    </div>
  );
}

export default AddDish;
