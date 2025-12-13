import React from "react";

export default function GoldenCard({ name, image, description }) {
  return (
    <div className="
      relative 
      bg-gradient-to-br from-yellow-900/40 to-black 
      border border-yellow-500 
      rounded-xl 
      p-3 
      shadow-[0_0_15px_rgba(255,215,0,0.4)]
      hover:shadow-[0_0_25px_rgba(255,215,0,0.8)]
      transition
      flex 
      flex-col
    ">

      <div className="
        text-center 
        text-yellow-300 
        font-bold 
        tracking-wide 
        mb-2
      ">
        {name}
      </div>

      <div className="
        aspect-[3/4] 
        w-full 
        bg-black/70 
        rounded-lg 
        overflow-hidden 
        border border-yellow-700
      ">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full text-gray-600 flex items-center justify-center">
            Sem imagem
          </div>
        )}
      </div>

      {description && (
        <p className="text-sm text-yellow-200 mt-2 text-center">
          {description}
        </p>
      )}
    </div>
  );
}
