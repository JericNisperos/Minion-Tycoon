import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { LoopSpeed, MinionUpgrade } from "../controllers/MinionControllers";
import { MinerBlock } from "../controllers/MinerController";

function MinerMinion(props: GameProps) {
  const { coins, setCoins, clickPower, setClickPower } = props;

  const [minerLevel, setMinerLevel] = useState<number>(parseInt(localStorage.getItem("minerLevel") ?? "1"));
  const [minerCount, setMinerCount] = useState<number>(parseInt(localStorage.getItem("minerCount") ?? "1"));

  const [minerPromote, setMinerPromote] = useState<number>(parseInt(localStorage.getItem("minerPromote") ?? "2"));

  const [minerLocked, setMinerLocked] = useState<boolean>(localStorage.getItem("minerLocked") === "true" || false);

  const [baseCost, setBaseCost] = useState(10);
  const [exponent, setExponent] = useState(1.5);

  const [upgradeCost, setUpgradeCost] = useState(10);

  // console.log(`minerPromote ${minerPromote}`)
  useEffect(() => {
    localStorage.setItem("minerLevel", minerLevel.toString());
    localStorage.setItem("minerCount", minerCount.toString());
    localStorage.setItem("minerPromote", minerPromote.toString());
    localStorage.setItem("minerLocked", JSON.stringify(minerLocked));
    setUpgradeCost(Math.floor(baseCost * Math.pow(minerLevel, exponent)));
    //
  }, [minerLevel, minerCount, minerLocked]);
  useEffect(() => {
    if (!minerLocked) {
      const stoneInterval = setInterval(() => {
        setMinerCount((prev) => prev + clickPower);
      }, 2000);

      return () => {
        clearInterval(stoneInterval);
      };
    }
  }, [minerLevel, minerLocked]);

  const stoneMultiplier = 50;

  function resetButton() {
    localStorage.removeItem("minerLevel");
    localStorage.removeItem("minerCount");
    localStorage.removeItem("minerPromote");
    localStorage.removeItem("minerLocked");
    setMinerCount(1);
    setMinerLevel(1);
    setMinerPromote(1);
    setMinerLocked(true);
    window.location.reload();
  }
  return (
    <>
      <div className="border-4 border-stone-400 min-w-[300px] my-8 rounded-xl stone-bg col-span-1 row-span-3">
        {minerLocked ? (
          <div className="mx-auto flex items-center justify-center bg-stone-900/75 h-full">
            <span className="items-center flex mx-auto justify-center min-h-[200px]">
              <motion.button
                onClick={() => {
                  setMinerLocked(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={` rounded-xl p-8  bg-green-400  text-white`}
              >
                <p className="text-3xl text-green-800">Unlock</p>
                <p className="text-red-800">
                  Cost: <span className="text-green-600">FREE</span>
                </p>
              </motion.button>
            </span>
          </div>
        ) : (
          <span className="mx-auto items-center justify-center min-h-full">
            <p className="mt-8 mx-4 text-xl">
              Miner Minion <span className="text-green-300 text-sm">Lvl {minerLevel}</span>
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
                    setMinerCount((prev) => prev + clickPower);
                  }}
                >
                  <MinerBlock promote={minerLevel} />

                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${minerLevel >= 3 ? "hidden" : ""}`}>
                    <p className=" text-white bg-gray-800/50 px-4 py-2 rounded-xl text-lg">Click Me!</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </span>
            <span className="flex mx-auto items-center justify-center">
              <p className="text-5xl text-slate-300">
                {minerCount.toLocaleString("en-US")}
                <span className="text-lg"></span>
              </p>
            </span>
              <div id="button-container" className="gap-4 m-2 bg-stone-900/50 p-4 rounded-xl">
                {/* <span>
                <span className="justify-between flex mx-auto">
                  <p>Blocks Mined: </p>
                  <p className="text-slate-500">{stoneCount.toLocaleString("en-US")}</p>
                </span>
              </span> */}
                <div className="grid grid-cols-1 gap-4">
                  <motion.button
                    id={`${minerCount >= upgradeCost ? "button-upgrades-unlocked" : "button-upgrades-locked"}`}
                    whileHover={minerCount >= upgradeCost ? { scale: 1.1 } : {}}
                    onClick={() => {
                      MinionUpgrade({
                        count: minerCount,
                        level: minerLevel,
                        multiplier: stoneMultiplier,
                        setCount: setMinerCount,
                        setLevel: setMinerLevel,
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
                      setCoins((prev: any) => prev + minerCount);
                      setMinerCount(0);
                    }}
                    id="button-sell"
                  >
                    <p>Sell Blocks into Coins</p>
                  </motion.button>
                </div>

                {/* <motion.button whileHover={{ scale: 1.1 }} id={`${minerLevel >= minerPromote * 10 ? "button-prestige-unlocked" : "button-prestige-locked"}`}>
                <p>{minerLevel >= minerPromote * 10 ? "Convert" : `Unlock at Level ${minerPromote * 10}`}</p>
              </motion.button> */}
                {/* <button onClick={resetButton}>Reset</button>
              <button
                onClick={() => {
                  setMinerCount((prev) => prev + 10000);
                }}
              >
                Add 10000
              </button> */}
              </div>
          </span>
        )}
      </div>
    </>
  );
}

export default MinerMinion;
