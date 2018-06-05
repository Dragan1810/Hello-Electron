import { load } from "cheerio";
import { get } from "axios";

const baseURL = `http://www.crunchyroll.com/`;

import db from "../db/index";

export const getCrunchySeries = async (page = 0) => {
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

export const getCrunchyEpisode = async url => {
  try {
    console.log("gettin episodes for:", series);
    // load episodes
    const { data } = await axios.get(series.url);
    console.log(data);
    // create cheerio cursor
    const $ = cheerio.load(data);
    const episodesContainer = $(".list-of-seasons ul.portrait-grid");
    const episodes = $(".group-item", episodesContainer)
      .map((index, el) => {
        const element = $(el);
        const id = $("a.episode", element).attr("href");
        const url = `${baseURL}${id}`;
        const img = $("img", element);
        console.log(img.parent().html());
        const image = img.attr("src") || img.attr("data-thumbnailurl");
        console.log(img.attr("srt"), img.attr("data-thumbnailurl"), image);
        const title = $(".series-title", element)
          .text()
          .trim();
        const description = $(".short-desc", element)
          .text()
          .trim();
        return {
          id,
          url,
          image,
          title,
          description
        };
      })
      .get();

    // store in the db
    await db.episodes.bulkDocs(episodes);

    return episodes;
  } catch (err) {
    console.error(err);
  }
};
