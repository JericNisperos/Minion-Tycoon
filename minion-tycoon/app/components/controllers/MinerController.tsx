import { useState } from "react";

export function MinerBlock(promote: any) {
    const blockImageUrl = "https://visage.surgeplay.com/head/";

    interface PromotionRange {
      start: number;
      end: number;
      image: string;
    }

    let stone = "72371adf2e8d4c92a734a93c8279deb9";
    let iron_ore = "6ddc9b520c5a44ff8d71bb27ee467f02";
    let gold_ore = "503be62316e047d1b696ed41f7517ee4";
    let diamond_ore = "f26167c269f847b5b033e582eef475c9";
    let emerald_ore = "3b0e2b0abe5d40e18f242fbe65970ea1";
    let deepslate = "f3a8e9582fc744ea9aca41b2d6bb6f0f";
    
    const promoteImages: { [key: string]: PromotionRange } = {
      range0: { start: 1, end: 9, image: stone },
      range1: { start: 10, end: 29, image: iron_ore },
      range2: { start: 30, end: 49, image: gold_ore },
      range3: { start: 50, end: 69, image: diamond_ore },
      range4: { start: 70, end: 100, image: emerald_ore },
      rangeinfinite: { start: 101, end: 9999, image: deepslate},
    };
    
    let imageUrl = promoteImages.range1.image; // Default image for unknown ranges
    
    for (const key in promoteImages) {
      if (Object.prototype.hasOwnProperty.call(promoteImages, key)) {
        const { start, end, image } = promoteImages[key];
        if (promote.promote >= start && promote.promote <= end) {
          imageUrl = `${blockImageUrl}${image}`;
          break;
        }
      }
    }
    
    return <img src={imageUrl} alt="Avatar" />;
}