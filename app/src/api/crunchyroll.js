const cheerio = require("cheerio");
const axios = require("axios");

const baseURL = `http://www.crunchyroll.com/`;

// skontaaaj

const getCrunchy = async (page = 0) => {
  try {
    //load catalog
    const { data } = await axios.get(
      `${baseURL}/videos/anime/popular/ajax_page?pg=${page}`
    );
    //create cheerio coursor
    const $ = cheerio.load(data);
    const series = $("li.group-item")
      .map((index, el) => {
        const element = $(el);
        // get title & url
        const a = $("a", element);
        const title = a.attr("title");
        const url = `${baseURL}${a.attr("href")}`;
        // get image
        const img = $("img", element);
        const image = img.attr("src");
        // get videos count
        const seriesData = $(".series-data", element);
        const count = parseInt(
          seriesData
            .text()
            .trim()
            .replace("Videos", "")
            .trim(),
          10
        );
        // return series data
        return {
          title,
          url,
          image,
          count
        };
      })
      .get();

    console.log(series);
  } catch (err) {
    console.error(err);
  }
};

getCrunchy();
console.log("hello?");
