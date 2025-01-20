import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    const recipeId = parseInt(params.id);
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch recipe:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    const recipeId = parseInt(params.id);
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const { title, time, servings, calories, image, category, difficulty, cuisine, rating, reviews, steps } = body;

    if (!title || !time || !servings) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        title: String(title),
        time: String(time),
        servings: String(servings),
        calories: String(calories),
        image: String(image),
        category: String(category),
        difficulty: String(difficulty),
        cuisine: String(cuisine),
        rating: parseFloat(rating),
        reviews: parseInt(reviews),
        steps: Array.isArray(steps) ? steps.map(String) : [],
      },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error('Failed to update recipe:', error);
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const recipeId = await prisma.recipe.findUnique({
    where: { id: parseInt(params.id) },
  });

  await prisma.recipe.delete({
    where: { id: recipeId?.id },
  });

  return NextResponse.json({ message: 'Recipe deleted' }, { status: 200 });
}
