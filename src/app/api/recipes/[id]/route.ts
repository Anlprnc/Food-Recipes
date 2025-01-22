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
    const recipeId = parseInt(params.id);
    const body = await req.json();

    // Önce recipe'ın var olup olmadığını kontrol et
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    // Recipe'ı güncelle
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        title: body.title,
        time: body.time,
        servings: body.servings,
        calories: body.calories,
        image: body.image,
        category: body.category,
        difficulty: body.difficulty,
        cuisine: body.cuisine,
        rating: Number(body.rating),
        reviews: Number(body.reviews),
        steps: body.steps,
      },
    });

    return NextResponse.json(updatedRecipe);
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
