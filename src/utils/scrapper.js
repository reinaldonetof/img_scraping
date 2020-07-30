const puppeteer = require("puppeteer");
const manageUrl = require("./manage-url");

async function scrapeImg(uri) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(uri);

  const result = await page.evaluate(() => {
    const imgs = [];
    document.querySelectorAll("img").forEach((img) => {
      const url = document.URL;
      let src = img.getAttribute("src");
      const alt = img.getAttribute("alt");

      if (!!alt && !!src) {
        imgs.push({ url, src, alt });
      }
    });
    return imgs;
  });
  browser.close();
  return manageUrl(result);
}

module.exports = scrapeImg;
