import { CheerioCrawler, RequestQueue } from "crawlee"

// First you create the request queue instance.
const requestQueue = await RequestQueue.open()
// And then you add one or more requests to it.
await requestQueue.addRequest({ url: "https://crawlee.dev" })

// Create the crawler and add the queue with our URL
// and a request handler to process the page.
const crawler = new CheerioCrawler({
  requestQueue,
  // The `$` argument is the Cheerio object
  // which contains parsed HTML of the website.
  async requestHandler({ $, request }) {
    // Extract <title> text with Cheerio.
    // See Cheerio documentation for API docs.
    const title = $("title").text()
    console.log(`The title of "${request.url}" is: ${title}.`)
  },
})

// Start the crawler and wait for it to finish
await crawler.run()
