import { lookup } from "dns";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MinerMinion from "../components/views/MinerMinion";
import FarmerMinion from "../components/views/FarmerMinion";

export default function Home() {
  const [coins, setCoins] = useState<number>(parseInt(localStorage.getItem("coins") ?? "0"));
  const [clickPower, setClickPower] = useState<number>(parseInt(localStorage.getItem("clickPower") ?? "1"));
  //   function resetButton() {
  //     localStorage.clear();
  //     setStoneCount(1);
  //     setStoneLevel(1);
  //     window.location.reload();
  //   }

  useEffect(() => {
    localStorage.setItem("coins", coins.toString());
    localStorage.setItem("clickPower", clickPower.toString());
    
  }, [coins, clickPower]);

  return (
    <main className="min-h-screen mx-8 md:mx-0">
      <div className="mx-auto justify-center max-w-[1400px] mt-24 flex items-center">
        <h5 className="text-6xl justify-center text-center">Minion Tycoon</h5>
      </div>

      <div className="mx-auto justify-center max-w-[1400px] gap-8 mt-8">
        <section id="minions-container" className="">
          {/* <div className="flex mx-auto justify-center items-center ">
            <div className="max-w-[1400px] items-center flex">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mx-8 my-4 text-4xl bg-yellow-400 px-8 py-4 pb-6 rounded-xl text-black"
                onClick={() => {
                  setCoins((prev) => prev + 1);
                }}
              >
                Coin Clicker{" "}
              </motion.button>
            </div>
            <h5 className="text-6xl justify-center text-center pb-2">
              {coins} <span className="text-4xl">Coins</span>
            </h5>
            <h5 className="text-6xl justify-center text-center pb-2">
              {clickPower.toFixed(0)} <span className="text-4xl">Click</span>
            </h5>
            <button onClick={() => {setClickPower(prev => prev * 2)}}>CLick upgrade</button>
          </div> */}
            <div className="flex overflow-x-auto">

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 px-8 mx-auto items-center justify-center bg-stone-800 rounded-xl shadow-xl">

            <MinerMinion coins={coins} setCoins={setCoins} clickPower={clickPower} setClickPower={setClickPower} />
            <FarmerMinion coins={coins} setCoins={setCoins} clickPower={clickPower} setClickPower={setClickPower} />
            <FarmerMinion coins={coins} setCoins={setCoins} clickPower={clickPower} setClickPower={setClickPower} />
            <FarmerMinion coins={coins} setCoins={setCoins} clickPower={clickPower} setClickPower={setClickPower} />
            {/* <FarmerMinion coins={coins} setCoins={setCoins} clickPower={clickPower} setClickPower={setClickPower} /> */}
            {/* <FarmerMinion coins={coins} setCoins={setCoins} clickPower={clickPower} setClickPower={setClickPower} /> */}
                      {/* <div className="my-4 mx-auto flex justify-center items-center">
            <h1 className="text-3xl">Your Minions</h1>
          </div> */}
            {/* <p>hello</p> */}
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
          </div>
        </section>
        {/* <section id="info-container" className="bg-gray-800 rounded-xl">
          <div className="p-8">
            <p className="text-4xl">Coins: {coins}</p>
            <div className="text-2xl">Click Power: {clickPower}</div>
          </div>
        </section> */}
      </div>
    </main>
  );
}
