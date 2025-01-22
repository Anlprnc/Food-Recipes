import { Recipe as PrismaRecipe } from '@prisma/client';

export interface Recipe extends PrismaRecipe {
  id: number;
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
