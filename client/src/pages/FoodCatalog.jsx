// import React from "react";

// export default function FoodCatalog() {
//   return <div>FoodCatalog</div>;
// }

import React, { useEffect, useState } from "react";
import { getFoods } from "../services/foodService";

export default function FoodCatalog() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div>
      <h2>Foods</h2>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    </div>
  );
}
