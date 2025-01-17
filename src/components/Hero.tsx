import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-8">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center">
        Cooking Recipes and the right <br /> Nutrition
      </h1>
      <h4 className="text-sm md:text-lg font-semibold tracking-wide">
        Browse Through Over 650,000 Tasty Recipes.
      </h4>
      <Link href={"/pages/recipes"}>
        <button className="text-sm font-bold text-white bg-lime-500 p-4 px-6 rounded-tl-3xl rounded-br-3xl tracking-wider">
          MORE RECIPES
        </button>
      </Link>
    </div>
  );
};

export default Hero;
