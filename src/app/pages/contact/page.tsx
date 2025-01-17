import BackButton from "@/components/BackButton";
import React from "react";

const Contact = () => {
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-fixed w-screen h-screen overflow-hidden">
      <div className="backdrop-blur-sm bg-white/40 h-full">
        <BackButton />
        <div className="w-[80%] mx-auto flex flex-col items-start justify-center h-full gap-6 divide-y divide-dashed divide-black">
          <h2 className="font-bold text-4xl py-5">Contact</h2>
          <p className="font-medium text-lg py-7">
            Thank you for joining us on this delicious journey! Feel free to
            reach out to us with any questions, suggestions, or collaboration
            inquiries. We take pride in being part of a growing community of
            food enthusiasts, and your feedback is invaluable to us.
          </p>
          <ul className="list-item py-7">
            <li className="font-medium text-lg">
              <b>Email:</b> info@superfood.com
            </li>
            <li className="font-medium text-lg">
              <b>Phone:</b> +1 555-123-4567
            </li>
            <li className="font-medium text-lg">
              <b>Address:</b> New York, USA
            </li>
          </ul>
          <ul className="list-item py-7">
            <li className="font-medium text-lg">
              <b>Instagram:</b> @superfood
            </li>
            <li className="font-medium text-lg">
              <b>Facebook:</b> @superfood
            </li>
            <li className="font-medium text-lg">
              <b>Twitter:</b> @superfood
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
