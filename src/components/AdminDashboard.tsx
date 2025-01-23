'use client';
import { Recipe } from '@/types/recipe';
import { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleRecipeSubmit = async (formData: Recipe) => {
    try {
      if (selectedRecipe) {
        const response = await fetch(`/api/recipes/${selectedRecipe.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Update failed');
      }

      await fetchRecipes();
      setShowForm(false);
      setSelectedRecipe(undefined);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipe Management</h1>
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Recipe
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <RecipeForm
              isEditing={!!selectedRecipe}
              recipe={selectedRecipe}
              onSubmit={handleRecipeSubmit}
              onCancel={() => {
                setShowForm(false);
                setSelectedRecipe(undefined);
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(recipe)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(recipe.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
