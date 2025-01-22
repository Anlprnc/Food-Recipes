import React from 'react';

const Steps = ({ steps }: { steps?: string[] }) => {
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return <div className="text-center mt-8 p-4 bg-white/50 rounded">No steps available for this recipe.</div>;
  }

  return (
    <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto rounded-2xl bg-white/50 border-2 border-black border-dashed mt-10 mb-10">
      <div className="flex flex-col gap-4 py-5 px-7">
        <h2 className="text-2xl font-bold mb-4">Recipe Steps</h2>
        <ul className="list-decimal ml-4 space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="text-lg">
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Steps;
