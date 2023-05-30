import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { LoopSpeed, MinionUpgrade, getLocalStorageItem, setLocalStorageItem } from "../controllers/MinionControllers";
import { MinerBlock } from "../controllers/MinerController";

function MinerMinion(props: GameProps) {
  const { coins, setCoins, clickPower, setClickPower } = props;

  const [farmerLevel, setFarmerLevel] = useState<number>(getLocalStorageItem("farmerLevel", 1));
  const [farmerCount, setFarmerCount] = useState<number>(getLocalStorageItem("farmerCount", 1));
  
  const [farmerPromote, setFarmerPromote] = useState<number>(getLocalStorageItem("farmerPromote", 2));
  
  const [farmerLocked, setFarmerLocked] = useState<boolean>(getLocalStorageItem("farmerLocked", true));
  
  const [baseCost, setBaseCost] = useState(10);
  const [exponent, setExponent] = useState(1.5);
  
  const [upgradeCost, setUpgradeCost] = useState(10);
  
  useEffect(() => {
    setLocalStorageItem("farmerLevel", farmerLevel);
    setLocalStorageItem("farmerCount", farmerCount);
    setLocalStorageItem("farmerPromote", farmerPromote);
    setLocalStorageItem("farmerLocked", farmerLocked);
    setUpgradeCost(Math.floor(baseCost * Math.pow(farmerLevel, exponent)));
  }, [farmerLevel, farmerCount, farmerLocked]);
  
  useEffect(() => {
    if (!farmerLocked) {
      const stoneInterval = setInterval(() => {

        setFarmerCount((prev) => prev + clickPower);
      }, 2000);

      return () => {
        clearInterval(stoneInterval);
      };
    }
  }, [farmerLevel, farmerLocked]);

  const stoneMultiplier = 50;

  function resetButton() {
    localStorage.removeItem("farmerLevel");
    localStorage.removeItem("farmerCount");
    localStorage.removeItem("farmerPromote");
    localStorage.removeItem("farmerLocked");
    setFarmerCount(1);
    setFarmerLevel(1);
    setFarmerPromote(1);
    setFarmerLocked(true);
    window.location.reload();
  }

  console.log(`${farmerLocked}`)
  return (
    <>
      <div className="border-4 border-stone-400 my-8 rounded-xl stone-bg col-span-1 row-span-3">
        {farmerLocked ? (
          <div className="mx-auto flex items-center justify-center bg-stone-900/75 min-h-full">
            <span className="items-center flex mx-auto justify-center min-h-[200px]">
              <motion.button
                onClick={() => {
                    if(coins >= 25000)
                  setFarmerLocked(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={` rounded-xl p-8  ${coins >= 25000 ? "bg-green-400" : "bg-gray-700 cursor-not-allowed"}`}
              >
                <p className="text-3xl text-green-800">Unlock</p>
                <p className="text-red-800">
                  Cost: <span className="text-green-600">25,000 Coins</span>
                </p>
              </motion.button>
            </span>
          </div>
        ) : (
          <span className="items-center justify-center mx-auto">
            <p className="mt-8 mx-4 text-xl">
              Miner Minion <span className="text-green-300 text-sm">Lvl {farmerLevel}</span>
            </p>
            <span className="flex mx-auto justify-center items-center mt-8 ">
              <AnimatePresence>
                <motion.div
                  className="max-h-[200px] max-w-[200px] cursor-pointer"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -30, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.0, transition: { duration: 0.2 } }}
                  whileTap={{
                    scale: 0.7,
                    transition: { duration: 0.1 },
                  }}
                  onClick={() => {
                    setFarmerCount((prev) => prev + clickPower);
                  }}
                >
                  <MinerBlock promote={farmerLevel} />

                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${farmerLevel >= 3 ? "hidden" : ""}`}>
                    <p className=" text-white bg-gray-800/50 px-4 py-2 rounded-xl text-lg">Click Me!</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </span>
            <span className="flex mx-auto items-center justify-center">
              <p className="text-5xl text-slate-300">
                {farmerCount.toLocaleString("en-US")}
                <span className="text-lg"></span>
              </p>
            </span>
            <div id="button-container" className="gap-4 grid grid-cols-1 m-2 bg-stone-900/50 p-4 rounded-xl">
              {/* <span>
                <span className="justify-between flex mx-auto">
                  <p>Blocks Mined: </p>
                  <p className="text-slate-500">{stoneCount.toLocaleString("en-US")}</p>
                </span>
              </span> */}
              <div className="grid grid-cols-1 gap-4">
                <motion.button
                  id={`${farmerCount >= upgradeCost ? "button-upgrades-unlocked" : "button-upgrades-locked"}`}
                  whileHover={farmerCount >= upgradeCost ? { scale: 1.1 } : {}}
                  onClick={() => {
                    MinionUpgrade({
                      count: farmerCount,
                      level: farmerLevel,
                      multiplier: stoneMultiplier,
                      setCount: setFarmerCount,
                      setLevel: setFarmerLevel,
                      upgradeCost: upgradeCost,
                    });
                  }}
                >
                  <p className="justify-center mx-0 p-0 text-lg">Upgrade </p>
                  <span className="text-sm">{upgradeCost} blocks</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setCoins((prev: any) => prev + farmerCount);
                    setFarmerCount(0);
                  }}
                  id="button-sell"
                >
                  <p>Sell Blocks into Coins</p>
                </motion.button>
              </div>

              {/* <motion.button whileHover={{ scale: 1.1 }} id={`${farmerLevel >= farmerPromote * 10 ? "button-prestige-unlocked" : "button-prestige-locked"}`}>
                <p>{farmerLevel >= farmerPromote * 10 ? "Convert" : `Unlock at Level ${farmerPromote * 10}`}</p>
              </motion.button> */}
              <button onClick={resetButton}>Reset</button>
              <button
                onClick={() => {
                  setFarmerCount((prev) => prev + 10000);
                }}
              >
                Add 10000
              </button>
            </div>
          </span>
        )}
      </div>
    </>
  );
}

export default MinerMinion;
