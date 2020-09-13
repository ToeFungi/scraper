const scraper = require('./twitterAdapter.js')

const username = 'pickeringacw'
const keywords = [
  'certified',
  'practices'
]

const foo = async () => {
  const data = await scraper.scrape(username, keywords)
  scraper.writeToFile(data)
}

foo()
