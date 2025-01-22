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

const getRecipe = async (id: string) => {
  const response = await fetch(`/api/recipes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }
  return response.json();
};

const RecipeDetail = async ({ params }: Props) => {
  const { id } = params;
  const recipe = await getRecipe(id);

  return (
    <div className="bg-[url('/background.jpg')] bg-cover w-screen h-screen overflow-hidden">
      <div className="backdrop-blur-sm bg-white/29 h-screen">
        <BackButton />
        <RecipeImage image={recipe?.image || ''} />
        <RecipeDetailHeader
          title={recipe?.title || ''}
          time={recipe?.time || ''}
          servings={recipe?.servings?.toString() || ''}
          calories={recipe?.calories?.toString() || ''}
          reviews={recipe?.reviews?.toString() || ''}
          difficulty={recipe?.difficulty || 'Easy'}
          category={recipe?.category || ''}
          cuisine={recipe?.cuisine || ''}
          rating={recipe?.rating?.toString() || ''}
        />
        <Steps steps={recipe?.steps} />
      </div>
    </div>
  );
};

export default RecipeDetail;
