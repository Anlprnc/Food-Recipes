"use client";
import RecipesCards from "@/components/RecipesCards";
import RecipesNavbar from "@/components/RecipesNavbar";
import React, { useState } from "react";

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-fixed bg-center min-h-screen">
      <RecipesNavbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="pt-[72px]">
        <RecipesCards activeCategory={activeCategory} />
      </div>
    </div>
  );
}
