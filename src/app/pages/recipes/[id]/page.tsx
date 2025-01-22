import BackButton from '@/components/BackButton';
import RecipeDetailHeader from '@/components/RecipeDetailHeader';
import RecipeImage from '@/components/RecipeImage';
import Steps from '@/components/Steps';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

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
  steps: string[];
};

const getRecipe = async (id: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/recipes/${id}`, {
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

const RecipeDetail = async ({ params }: Props) => {
  try {
    const { id } = params;
    const recipe = await getRecipe(id);

    if (!recipe) {
      return <div>Recipe not found</div>;
    }

    return (
      <div className="bg-[url('/background.jpg')] bg-cover min-h-screen  overflow-hidden">
        <div className="backdrop-blur-sm bg-white/29 min-h-screen overflow-y-auto pb-10">
          <BackButton />
          <RecipeImage image={recipe.image} />
          <RecipeDetailHeader
            title={recipe.title}
            time={recipe.time}
            servings={recipe.servings.toString()}
            calories={recipe.calories.toString()}
            reviews={recipe.reviews.toString()}
            difficulty={recipe.difficulty}
            category={recipe.category}
            cuisine={recipe.cuisine}
            rating={recipe.rating.toString()}
          />
          <Steps steps={recipe.steps} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Recipe detail error:', error);
    return <div>Error loading recipe. Please try again later.</div>;
  }
};

export default RecipeDetail;
