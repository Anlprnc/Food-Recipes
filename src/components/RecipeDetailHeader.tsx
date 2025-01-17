import React from "react";
import { IoMdTime } from "react-icons/io";
import { IoStarHalf } from "react-icons/io5";
import { MdOutlineCategory, MdOutlineRoomService } from "react-icons/md";
import { PiBowlFood, PiSpeedometerBold } from "react-icons/pi";

type RecipeDetailHeaderProps = {
  title: string;
  time: string;
  servings: string;
  calories: string;
  category: string;
  difficulty: string;
  cuisine: string;
  rating: string;
  reviews: string;
};

const RecipeDetailHeader: React.FC<RecipeDetailHeaderProps> = ({
  title,
  time,
  servings,
  calories,
  category,
  difficulty,
  rating,
  reviews,
}) => {
  return (
    <div className="w-full md:w-[80%] lg:w-[60%] mx-auto my-5">
      <div className="flex flex-col items-center justify-center md:gap-6">
        <h2 className="text-center font-bold text-3xl md:text-4xl tracking-wide">
          {title}
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 place-content-center gap-x-2 md:gap-x-16 lg:gap-x-20 gap-y-6 whitespace-pre-line">
          <li className="flex items-center gap-3 font-medium">
            <span>
              <IoMdTime size={20} />
            </span>
            Time: {time}
          </li>
          <li className="flex items-center gap-3 font-medium">
            <span>
              <MdOutlineRoomService size={20} />
            </span>
            Servings: {servings}
          </li>
          <li className="flex items-center gap-3 font-medium">
            <span>
              <PiBowlFood size={20} />
            </span>
            Calories: {calories}
          </li>
          <li className="flex items-center gap-3 font-medium">
            <span>
              <MdOutlineCategory size={20} />
            </span>
            Category: {category}
          </li>
          <li className="flex items-center gap-3 font-medium">
            <span>
              <PiSpeedometerBold size={20} />
            </span>
            Difficulty: {difficulty}
          </li>
          <li className="flex items-center gap-3 font-medium">
            <span>
              <IoStarHalf size={20} />
            </span>
            Rating: {rating} ({reviews} reviews)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetailHeader;
