const scraper = require('./scraper.js')

const url = 'https://twitter.com/pickeringacw'

const foo = async () => {
  const data = await scraper.scrape(url)
  console.log(data)
}

foo()
