import Image from "next/image";
import React from "react";

type RecipeImageProp = {
  image: string;
};

const RecipeImage: React.FC<RecipeImageProp> = ({ image }) => {
  return (
    <div className="flex items-center justify-center p-5">
      <Image
        src={image}
        alt="food"
        width={250}
        height={200}
        className="drop-shadow-lg"
      />
    </div>
  );
};

export default RecipeImage;
