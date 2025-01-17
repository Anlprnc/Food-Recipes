import React from "react";

const Steps = ({ steps }: { steps?: string[] }) => {
  if (!steps || steps.length === 0) {
    return <p>No steps available.</p>;
  }

  return (
    <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto rounded-2xl border-2 border-black border-dashed mt-10">
      <div className="flex items-center justify-start py-5 px-7">
        <ul className="list-disc flex flex-col gap-5">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Steps;
