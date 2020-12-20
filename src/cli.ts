
import { parse } from "./parse";
// var parseArgs = require("minimist");
import fs from "fs";

async function asyncWrapper() {
  // var args = parseArgs(process.argv.slice(2), {
  //   string: ["category"]
  // });

  
  // const category = args.category;
  // console.log(category)


  try {
   
    //@ts-ignore
    const items = await parse();

    fs.writeFile("AH-items.json",
    JSON.stringify({items}, null, 2),
    err => {
      if (err) {
        console.error(err);
      }
    })

    const gold = 50000

    const wb = items['herbalism_items']['Shadowlands Herbs']['Widowbloom']
    const ns = items['herbalism_items']['Shadowlands Herbs']["Vigil's Torch"]
    const mr = items['herbalism_items']['Shadowlands Herbs']['Marrowroot']
    const rg = items['herbalism_items']['Shadowlands Herbs']['Rising Glory']
    const db = items['herbalism_items']['Shadowlands Herbs']['Death Blossom']

    const power_elixir = items['alchemy_items']['Flasks']['Spectral Flask of Power']

    // console.log(wb,ns,mr,rg,db,power_elixir)

    const power_elixir_price_mats = (wb.currentPrice + mr.currentPrice + rg.currentPrice + db.currentPrice) * 4 + ns.currentPrice * 3 

    const power_elixir_profit = power_elixir.currentPrice - power_elixir_price_mats

    console.log("*********************************")

    console.log(`Power Elixir profit: ${power_elixir_profit.toFixed()} gold`)
    let amount_common
    let amount_uncommon
    if(power_elixir_profit < 200) {
      console.log("Not profitable yet")
    }
    else {
      console.log("Profitable!!! Go for it!!!")
      for(let i=0;i<10000000;i++) {
        const cost = (wb.currentPrice + mr.currentPrice + rg.currentPrice + db.currentPrice) * 4 * i + ns.currentPrice * i
        if(cost > gold) {
          amount_common = (i - 1) * 4
          amount_uncommon = (i -1 ) * 3
          break;
        }
      }
      console.log(`Your character has ${gold/1000}k gold`)
      console.log(`You need ${amount_common} common mats and ${amount_uncommon} uncommon mats!`)
    }



    

    console.log("*********************************")

  } catch (error) {
    console.error(error);
  }
}

asyncWrapper();
