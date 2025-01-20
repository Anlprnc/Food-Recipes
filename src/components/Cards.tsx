'use client';
import { useEffect, useState } from 'react';
import Card from './Card';

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

const Cards = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-x-8 gap-y-6 drop-shadow">
        {recipes.slice(0, 6).map((recipe) => (
          <Card key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
