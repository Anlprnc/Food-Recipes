import React, { useEffect, useState } from "react";
import Card from "./Card";

type Recipe = {
  id: number;
  title: string;
  time: string;
  servings: string;
  calories: string;
  image: string;
  category: string;
  difficulty: string;
  cuisine: string;
  rating: number;
  reviews: number;
};

type RecipesCardsProps = {
  activeCategory: string;
};

const RecipesCards = ({ activeCategory }: RecipesCardsProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await import("../data/recipes.json");
        setRecipes(response.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    activeCategory === "All" ? true : recipe.category === activeCategory,
  );

  return (
    <>
      <div className="container mx-auto mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-x-8 gap-y-6 drop-shadow">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} {...recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipesCards;
