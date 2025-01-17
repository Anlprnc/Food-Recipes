import BackButton from "@/components/BackButton";
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-fixed w-screen h-screen overflow-hidden">
      <div className="backdrop-blur-sm bg-white/40 h-full">
        <BackButton />
        <div className="w-[80%] mx-auto flex flex-col items-start justify-center h-full gap-20">
          <h2 className="font-bold text-3xl">About Us</h2>
          <p className="font-medium text-lg">
            Welcome to <b>SuperFood</b>, where food lovers and home chefs come
            together to explore the art of cooking. Our mission is to inspire
            creativity in the kitchen and make every meal a delicious
            experience.
            <br />
            At <b>SuperFood</b>, we believe that food has the power to bring
            people closer and create unforgettable memories. Whether you’re a
            seasoned chef or just starting your culinary journey, our collection
            of recipes is crafted to suit every taste and skill level.
            <br />
            From comforting classics to innovative dishes, we focus on using
            fresh ingredients and simple techniques to help you create meals
            that you’ll be proud to share. We also celebrate the diversity of
            flavors from around the world, making it easy for you to discover
            new cuisines and expand your palate.
            <br />
            Join our community of passionate food enthusiasts and let’s cook up
            something amazing together. At <b>SuperFood</b>, the heart of the
            kitchen is where the magic happens.
            <br />
            <b>Happy Cooking!</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
