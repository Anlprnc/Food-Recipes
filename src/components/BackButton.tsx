import Link from "next/link";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";

const BackButton = () => {
  return (
    <div className="relative top-4 left-4">
      <Link href={"/"}>
        <MdKeyboardBackspace size={30} />
      </Link>
    </div>
  );
};

export default BackButton;
