"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Colors } from "@/styles/colors";
export type CartButtonT = {
  onClick(): void;
  amount: number;
};
const CartButton = ({ onClick, amount = 0 }: CartButtonT) => {
  const [isHovered, setIsHovered] = useState(false);

  // Event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex items-center border p-2 rounded-xl"
        style={{ backgroundColor: isHovered ? Colors.white : Colors.primary }}
      >
        <FaShoppingCart
          size={30}
          color={isHovered ? Colors.primary : Colors.white}
        />
        <h1
          className="font-bold ml-2"
          style={{ color: isHovered ? Colors.primary : Colors.white }}
        >{`$${amount}`}</h1>
      </div>
    </button>
  );
};

export default CartButton;
