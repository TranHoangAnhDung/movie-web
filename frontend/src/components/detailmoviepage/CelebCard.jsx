import React from "react";

const CelebCard = (data) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mb-10">
      <div className="w-40 h-40 rounded-full overflow-hidden">
        <img
          src={data.imageUrl}
          alt={data.name}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
        <h3 className="text-base font-semibold text-black mt-4">{data.name}</h3>
        <h4 className="text-sm font-normal text-gray-500">{data.role}</h4>
      </div>
    </div>
  );
};

export default CelebCard;
