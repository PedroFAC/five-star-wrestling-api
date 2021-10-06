const axios = require("axios");
const cheerio = require("cheerio");

async function getMatches() {
    const url = "http://www.profightdb.com/top-rated-matches.html";

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const matches = []
    $("table tbody tr").each((i, element) => {
        const rating = Number($(element)
            .find("td")
            .first()
            .text()
            .replace(/\n/gi, "")
            .replace(/\t/gi, "").replace('+', ''));
        const date = $(element)
            .find("td")
            .first()
            .next()
            .text()
            .replace(/\n/gi, "")
            .replace(/\t/gi, "");
        const company = $(element)
            .find("td")
            .first()
            .next()
            .next()
            .find("a")
            .first()
            .text()
            .replace(/\n/gi, "")
            .replace(/\t/gi, "");
        const event = $(element)
            .find("td")
            .first()
            .next()
            .next()
            .find("a")
            .last()
            .text()
            .replace(/\n/gi, "")
            .replace(/\t/gi, "");
        const year = date.slice(-4)
        const matchType = $(element).find("td").last().text()
            .replace(/\n/gi, "")
            .replace(/\t/gi, "");
        const winners = []
        const losers = []

        $(element).find("td").last().prev().prev().find("a").each((i, el) => winners.push($(el).text()))

        $(element).find("td").last().prev().find("a").each((i, el) => losers.push($(el).text()))
        const participants = winners.concat(losers)
        matches.push({ rating, date, company, event, year, matchType, winners, losers, participants });
    })
    return matches
}

exports.getMatches = async (req, res, next) => {
    const matches = await getMatches()
    res.json(matches)
}