-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "servings" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "steps" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);
