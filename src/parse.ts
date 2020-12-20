import chromium from "chrome-aws-lambda";
import url from "url";
import {get_items} from "./dev";



export const parse = async (
  // category: string,
) => {

  // const categories = ['herbalism']

  // if (!categories.includes(category)) {
  //   throw "Category not valid";
  // }


  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: null,
      executablePath: await chromium.executablePath,
      headless: true
    });

    let urlParse = url.parse(`https://theunderminejournal.com/#eu/twisting-nether/category/herbalism`);

    let page = await browser.newPage();

    await page.goto(urlParse.href, {
      waitUntil: "networkidle2",
      timeout: 20000
    });


    const herbalism_items = await page.evaluate(get_items);

    page = await browser.newPage()

    urlParse = url.parse(`https://theunderminejournal.com/#eu/twisting-nether/category/alchemy`);

    await page.goto(urlParse.href, {
      waitUntil: "networkidle2",
      timeout: 20000
    });

    const alchemy_items = await page.evaluate(get_items);


    const items = {
      herbalism_items,
      alchemy_items
    }

    

    return items;
  } catch (error) {
    console.error(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

