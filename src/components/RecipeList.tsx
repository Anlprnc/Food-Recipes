'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';

const RecipeList = ({ onEdit }: { onEdit: (recipe: Recipe) => void }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch('/api/recipes');
    const data = await response.json();
    setRecipes(data);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
      fetchRecipes();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recipes</h2>
      <div className="space-y-2">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex items-center justify-between p-4 border rounded">
            <span>{recipe.title}</span>
            <div className="space-x-2">
              <Link href={`/admin/edit?id=${recipe.id}`} className="px-3 py-1 bg-lime-500 text-white rounded inline-block">
                Edit
              </Link>
              <button onClick={() => handleDelete(recipe.id)} className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
