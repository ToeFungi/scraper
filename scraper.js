const puppeteer = require('puppeteer')

const scraper = {
  scrape: async (url) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitFor(5000)

    const data = await page.evaluate(() => {
      const tweets = document.querySelectorAll('img')
      const urls = Array.from(tweets)
        .map(v => v.src)

      return {
        urls
      }
    })

    await browser.close()
    return data
  }
}

module.exports = scraper
