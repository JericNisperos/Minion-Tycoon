import { useState } from "react";

export function LoopSpeed(value: any) {
  return 3 / (value / 2);
}

export function MinionUpgrade(props: MinionProps) {
    const { count, level, multiplier, setCount, setLevel, upgradeCost } = props;
  
    if (count >= upgradeCost) {
      setCount((prev: any) => prev - upgradeCost);
      setLevel((prev: any) => prev + 1);
    }
  }

export default function GameController() {


//   function AddCoins(value: any) {
//     setCoins((prev) => prev + value);
//   }
}

