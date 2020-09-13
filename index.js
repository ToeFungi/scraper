const scraper = require('./scraper.js')

const url = 'https://twitter.com/pickeringacw'
const keywords = [
  'potential'
]

// const url = 'https://masks4you.herokuapp.com/'
// const keywords = ['R1000', 'customised']

const foo = async () => {
  const data = await scraper.scrape(url, keywords)
  console.log(data)
}

foo()
