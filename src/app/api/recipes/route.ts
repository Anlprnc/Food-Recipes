import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

interface Recipe {
  title: string;
  time: string;
  servings: string;
  calories: string;
  image: string;
  category: string;
  difficulty: string;
  cuisine: string;
  rating: string;
  reviews: string;
  steps: string[];
}

export async function GET() {
  const recipes = await prisma.recipe.findMany();
  return Response.json(recipes);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Recipe;
  const newRecipe = await prisma.recipe.create({
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

  return Response.json(newRecipe);
}
