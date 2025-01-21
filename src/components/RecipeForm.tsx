"use client";
import { FormEvent, useState } from "react";

interface Recipe {
  id?: string;
  title: string;
  time: string;
  servings: string;
  calories: string;
  image: string;
  category: string;
  difficulty: string;
  cuisine: string;
  steps: string[];
}

interface RecipeFormProps {
  isEditing: boolean;
  recipe?: Recipe;
  onCancel: () => void;
}

const RecipeForm = ({ isEditing, recipe, onCancel }: RecipeFormProps) => {
  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    time: recipe?.time || "",
    servings: recipe?.servings || "",
    calories: recipe?.calories || "",
    image: recipe?.image || "",
    category: recipe?.category || "",
    difficulty: recipe?.difficulty || "",
    cuisine: recipe?.cuisine || "",
    steps: recipe?.steps || [],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url =
      isEditing && recipe ? `/api/recipes/${recipe.id}` : "/api/recipes";
    const method = isEditing ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onCancel();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Recipe Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? "Update Recipe" : "Add Recipe"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
