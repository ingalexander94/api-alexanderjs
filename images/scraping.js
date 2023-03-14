const puppeteer = require("puppeteer");

const getProfilePicture = async (
  socialNetwork = "twitter",
  username = "sinFoto"
) => {
  const isTwitter = socialNetwork === "twitter";
  const selector = isTwitter ? "img.css-9pa8cd" : ".avatar-user.width-full";
  const endpoint = `https://${socialNetwork}.com/${username}${
    isTwitter ? "/photo" : ""
  }`;
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(endpoint, {
    waitUntil: "networkidle2",
  });
  const src = await page.evaluate((selector) => {
    const $photo = document.querySelector(selector);
    const attr = $photo ? $photo.getAttribute("src") : null;
    return attr;
  }, selector);
  await browser.close();
  return src;
};

module.exports = {
  getProfilePicture,
};
