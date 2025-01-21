"use client";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";
import { Recipe as PrismaRecipe } from "@prisma/client";
import BackButton from "./BackButton";

interface Recipe extends PrismaRecipe {
  title: string;
  time: string;
  calories: string;
  servings: string;
  image: string;
  category: string;
  difficulty: string;
  cuisine: string;
  rating: number;
  reviews: number;
  steps: string[];
}

const AdminDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center gap-8 p-5">
      <RecipeForm
        isEditing={isEditing}
        recipe={
          selectedRecipe
            ? { ...selectedRecipe, id: String(selectedRecipe.id) }
            : undefined
        }
        onCancel={() => {
          setIsEditing(false);
          setSelectedRecipe(null);
        }}
      />
      <RecipeList
        onEdit={(recipe: Recipe) => {
          setSelectedRecipe(recipe);
          setIsEditing(true);
        }}
      />
    </div>
  );
};

export default AdminDashboard;
