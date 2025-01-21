import React from "react";
import { LuAlarmClock } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  id: number;
  title: string;
  time: string;
  servings: string;
  calories: string;
  image: string;
  category: string;
  difficulty: string;
  cuisine: string;
  rating: number;
  reviews: number;
};

const Card = ({
  id,
  title,
  time,
  servings,
  calories,
  image,
  category,
  difficulty,
  cuisine,
  rating,
  reviews,
}: CardProps) => {
  const queryParams = new URLSearchParams({
    title,
    time,
    servings,
    calories,
    category,
    difficulty,
    cuisine,
    rating: rating.toString(),
    reviews: reviews.toString(),
  }).toString();

  return (
    <div className="relative w-[250px]">
      <div className="h-[162px] bg-gradient-to-b from-orange-50 from-50% to-orange-100 p-5 rounded-xl">
        <div className="flex w-[150px]">
          <div className="flex flex-col items-start justify-center gap-4">
            <span className="font-bold text-sm">{title}</span>
            <div className="flex items-center justify-start gap-2">
              <LuAlarmClock className="text-red-500" strokeWidth={2.5} />
              <span className="font-black text-[10px] tracking-tight">
                {time} minutes
              </span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <FaBowlFood className="text-red-500" strokeWidth={2.5} />
              <span className="font-black text-[10px] tracking-tight">
                {servings} servings
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="font-bold text-xs">{calories} calories</span>
              <Link href={`/pages/recipes/${id}?${queryParams}`}>
                <MdArrowOutward className="text-white bg-lime-500 rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-20 top-0">
        <Image
          alt="foods"
          src={image}
          width={160}
          height={160}
          className="drop-shadow-lg"
          priority={true}
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export default Card;
