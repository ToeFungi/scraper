const fs = require('fs')
const puppeteer = require('puppeteer')

const BASE_URL = 'https://twitter.com'

/**
 * Twitter specific adapter for scraper
 * @type {{scrape: (function(*, *, *=): string[]), writeToFile: (function(*=, *=): void)}}
 */
const twitterAdapter = {
  /**
   * Scrape all twitter posts which contain the specified keywords
   * @param username String - The username of the profile's feed to be scraped
   * @param keywords String[] - The keywords that should exist in the tweet
   * @param count Number - The number of times to scroll down the page. i.e. load more tweets
   * @returns {Promise<string[]>}
   */
  scrape: async (username, keywords, count = 10) => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(`${BASE_URL}/${username}`)
    await page.waitForSelector('[data-testid="tweet"]')

    let tweets = []

    for (let i = 0; i < count; i++) {
      await page.waitForSelector('[data-testid="tweet"]')
      await page.waitFor(1000)

      const data = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-testid="tweet"]')
        return Array.from(cards)
          .map(item => item.innerText)
      })

      tweets = [ ...tweets, ...data ]

      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    }

    await browser.close()

    const distinctSet = Array.from(new Set(tweets))
    const loweredData = distinctSet.map(item => item.toLowerCase())
    const loweredKeywords = keywords.map(keyword => keyword.toLowerCase())

    return loweredData.filter(item => {
      for (let i = 0; i < loweredKeywords.length; i++) {
        if (item.includes(loweredKeywords[i])) {
          return true
        }
      }

      return false
    })
  },

  /**
   *
   * @param tweets String[] - The raw response from the scraped twitter data
   * @param fileName String - The name of the file to store the scraped tweets in
   */
  writeToFile: (tweets, fileName = 'tweets') => {
    return fs.writeFile(`./${fileName}.json`, JSON.stringify(tweets), (err) => {
      if (!err) return
      console.error(err.message)
    })
  }
}

module.exports = twitterAdapter
