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

export function getLocalStorageItem(key: any, defaultValue: any) {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  }
  return defaultValue;
}

export function setLocalStorageItem(key: any, value: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default function GameController() {
  //   function AddCoins(value: any) {
  //     setCoins((prev) => prev + value);
  //   }
}
