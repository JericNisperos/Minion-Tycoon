import { lookup } from "dns";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [coins, setCoins] = useState<number>(parseInt(localStorage.getItem("coins") ?? "0"));
  const [stoneLevel, setStoneLevel] = useState<number>(parseInt(localStorage.getItem("stoneLevel") ?? "1"));
  const [stoneCount, setStoneCount] = useState<number>(parseInt(localStorage.getItem("stoneCount") ?? "1"));

  const [stonePrestige, setStonePrestige] = useState<number>(parseInt(localStorage.getItem("stonePrestige") ?? "1"));

  const [minerLocked, setMinerLocked] = useState<boolean>(localStorage.getItem("minerLocked") === "true" || false);
  useEffect(() => {
    localStorage.setItem("stoneLevel", stoneLevel.toString());
    localStorage.setItem("stoneCount", stoneCount.toString());
    localStorage.setItem("coins", coins.toString());
    localStorage.setItem("minerLocked", JSON.stringify(minerLocked));
  }, [stoneLevel, stoneCount, minerLocked]);

  const stoneMultiplier = 50;
  const [clickPower, setClickPower] = useState(1);

  function LoopSpeed(value: any) {
    return 3 / (value / 2);
  }

  useEffect(() => {
    if (!minerLocked) {
      const stoneInterval = setInterval(() => {
        setStoneCount((prevStoneCount) => prevStoneCount + stoneLevel);
      }, LoopSpeed(stoneLevel) * 1000);

      return () => {
        clearInterval(stoneInterval);
      };
    }
  }, [stoneLevel]);

  function MinionUpgrade(item: any) {
    if (item === "stone") {
      if (stoneCount >= stoneLevel * stoneMultiplier) {
        setStoneCount((prev) => prev - stoneLevel * stoneMultiplier);
        setStoneLevel((prev) => prev + 1);
      }
    }
  }

  function resetButton() {
    localStorage.clear();
    setStoneCount(1);
    setStoneLevel(1);
    window.location.reload();
  }

  return (
    <main className="min-h-screen mx-8 md:mx-0">
      <div className="mx-auto justify-center max-w-[1400px] mt-24 border-yellow-400 border-4">
        <h5>Minion Tycoon</h5>
        <button onClick={resetButton}>Reset</button>
      </div>
      <div className="mx-auto justify-center max-w-[1400px] grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
        <section id="minions-container" className="border-yellow-400 border-4 col-span-4 ">
          <div className="mx-8 my-4">
            <h1>Your Minions {coins}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 mx-auto items-center justify-center">
            <div className="border-4 border-stone-400 w-full my-8 rounded-xl stone-bg col-auto">
              {minerLocked ? (
                <div>
                  <span className="items-center flex mx-auto justify-center min-h-[200px]">
                    <motion.button onClick={() => setMinerLocked(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-green-400 p-8 text-white rounded-xl">
                      Unlock the Miner Minion!
                    </motion.button>
                  </span>
                </div>
              ) : (
                <span className="items-center justify-center mx-auto">
                  <p className="mt-8 mx-4 text-xl">
                    Miner Minion <span className="text-green-300 text-sm">Lvl {stoneLevel}</span>
                  </p>
                  <span className="flex mx-auto justify-center items-center mt-8 ">
                    <AnimatePresence>
                      <motion.div
                        className="max-h-[150px] max-w-[150px] cursor-pointer"
                        key={stoneLevel}
                        initial={{ y: 0 }}
                        animate={{ y: [0, -30, 0] }}
                        transition={{
                          duration: LoopSpeed(stoneLevel),
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.0, transition: { duration: 0.2 } }}
                        whileTap={{
                          scale: 0.7,
                          transition: { duration: 0.1 },
                        }}
                        onClick={() => {
                          setStoneCount((prevStoneCount) => prevStoneCount + clickPower);
                        }}
                      >
                        <img src="https://visage.surgeplay.com/head/72371adf2e8d4c92a734a93c8279deb9" />
                      </motion.div>
                    </AnimatePresence>
                  </span>

                  <div id="button-container" className="gap-4 grid grid-cols-1 m-2 bg-stone-900/50 p-4 rounded-xl">
                    <span>
                      <span className="justify-between flex mx-auto">
                        <p>Blocks Mined: </p>
                        <p className="text-slate-500">{stoneCount}</p>
                      </span>
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        id={`${stoneLevel < stonePrestige * 10 ? "button-upgrades-unlocked" : "button-upgrades-locked"}`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          if (stoneLevel < stonePrestige * 10) MinionUpgrade("stone");
                        }}
                      >
                        <p className="justify-center mx-0 p-0 text-sm">Upgrade {stoneLevel * stoneMultiplier}</p>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          setCoins((prev) => prev + stoneCount);
                          setStoneCount(0);
                        }}
                        id="button-sell"
                      >
                        <p>Sell Blocks into Coins</p>
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      id={`${stoneLevel >= stonePrestige * 10 ? "button-prestige-unlocked" : "button-prestige-locked"}`}
                    >
                      <p>{stoneLevel >= 10 ? "Prestige!" : `Unlock at Level ${stonePrestige * 10}`}</p>
                    </motion.button>
                  </div>
                </span>
              )}
            </div>

            {/* <div className="border-4 border-lime-400 w-full my-8 min-h-[200px] rounded-xl">
              <span className="items-center flex mx-auto justify-center">
                <p className="mt-8 text-lime-200">Farmer Minion</p>
              </span>
              <p className="items-center flex mx-auto justify-center">Must unlock Prestige 3 in Miner Minion</p>
            </div> */}

            {/* <div className="border-4 border-red-400 w-full my-8 min-h-[200px] rounded-xl">
              <span className="items-center flex mx-auto justify-center">
                <p className="mt-8">Hunter Minion</p>
              </span>
            </div> */}
          </div>
        </section>
        <section id="info-container" className="border-red-400 border-4 rounded-tr-xl">
          <div>hello world</div>
        </section>
      </div>
    </main>
  );
}
