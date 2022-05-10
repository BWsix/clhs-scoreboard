import type { Protocol } from "puppeteer";
import puppeteer from "puppeteer";

const API = "https://eschool.clhs.tyc.edu.tw/online/";

interface Props {
  cookies: Protocol.Network.CookieParam[];
}

export const loginSecondStep = async ({ cookies: _cookies }: Props) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setCookie(..._cookies);

  let requestLimiter = 0;
  page.setRequestInterception(true);
  page.on("request", (req) => {
    if (++requestLimiter > 3) return req.abort();
    req.continue();
  });

  try {
    await page.goto(API, { waitUntil: "load" });
    const cookies = await page.cookies();
    const cookie = cookies.find((cookie) =>
      cookie.name.startsWith("ASPSESSIONID")
    );

    if (!cookie) throw new Error("");

    return `${cookie.name}=${cookie.value}`;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  } finally {
    browser.close();
  }
};
