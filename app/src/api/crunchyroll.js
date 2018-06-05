import { load } from "cheerio";
import { get } from "axios";

const baseURL = `http://www.crunchyroll.com/`;

import db from "../db/index";

const getCrunchy = async (page = 0) => {
  try {
    //load catalog
    const { data } = await get(
      `${baseURL}/videos/anime/popular/ajax_page?pg=${page}`
    );
    //create cheerio coursor
    const $ = load(data);
    const series = $("li.group-item")
      .map((index, el) => {
        const element = $(el);
        // get title & url
        const a = $("a", element);
        const title = a.attr("title");
        const link_id = a.attr("href");
        const url = `${baseURL}${link_id}`;
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
          source: "crunchyroll",
          link_id,
          title,
          url,
          image,
          count
        };
      })
      .get();
    await db.series.bulkDocs(series);
    return series;
  } catch (err) {
    console.error(err);
  }
};

export default getCrunchy;
