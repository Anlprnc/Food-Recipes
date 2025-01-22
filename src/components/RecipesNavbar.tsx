import Link from 'next/link';
import React from 'react';

type NavbarProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const RecipesNavbar = ({ activeCategory, setActiveCategory }: NavbarProps) => {
  const categories = ['All', 'Pastas', 'Lunch', 'Dinner', 'Breakfast', 'Desert'];

  return (
    <div className="fixed top-0 right-0 left-0 z-50">
      <div className="py-4">
        <Link href={'/'}>
          <h2 className="font-black text-[30px] text-center">Superfood!</h2>
        </Link>
      </div>
      <div className="flex justify-center px-1 md:px-4">
        <div className="w-full max-w-[600px] p-3 bg-gray-100 rounded-3xl border-2 border-black bg-opacity-10 backdrop-blur-lg mb-4">
          <ul className="flex justify-center items-center gap-2 sm:gap-8 md:gap-14 font-medium overflow-x-auto">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer whitespace-nowrap transition-colors ${activeCategory === category ? 'text-blue-600 font-bold' : 'hover:text-blue-400'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipesNavbar;
