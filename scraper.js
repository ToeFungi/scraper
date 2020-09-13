const puppeteer = require('puppeteer')

const scraper = {
  scrape: async (url, keywords) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)

    await page.waitForSelector('[data-testid="tweet"]')

    const eval = () => {
      const cards = document.querySelectorAll('[data-testid="tweet"]')
      return Array.from(cards)
        .map(item => item.innerText)
    }

    const data = await page.evaluate(eval)

    const specificData = []
    keywords.forEach(word => {
      specificData.push(data.filter(item => item.toLowerCase()
        .includes(word.toLowerCase())))
    })

    await browser.close()

    console.log(specificData, 'data')
    return specificData
  }
}

module.exports = scraper
