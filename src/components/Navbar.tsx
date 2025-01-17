import Link from "next/link";
import React from "react";
import SigninButton from "./SignInButton";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-9 px-10">
      <h2 className="font-black text-[25px] cursor-pointer">Superfood!</h2>
      <ul className="flex items-center gap-6 text-sm sm:text-md md:text-base sm:gap-14 font-bold">
        <li className="cursor-pointer">
          <a>Home</a>
        </li>
        <li className="cursor-pointer">
          <Link href={"/pages/recipes"}>Recipes</Link>
        </li>
        <li className="cursor-pointer whitespace-nowrap">
          <Link href={"/pages/about-us"}>About Us</Link>
        </li>
        <li className="cursor-pointer">
          <Link href={"/pages/contact"}>Contact</Link>
        </li>
        <li className="text-white bg-black p-2 rounded-full cursor-pointer">
          <a>
            <SigninButton />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
