const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const contest = process.argv.slice(2);
const contestLink = "https://codeforces.com/contest/" + contest;

function getCasesFromProblem(dir, html, problem) {
  const contestDir = process.env.PROBLEM_DIR;
  const CFDir = process.env.ROOT_DIR;
  fs.copyFileSync(`${CFDir}/template.cc`, `${dir}/${problem}.cc`);
  const $ = cheerio.load(html);

  //extracting input
  $("div.input pre").each((i, elem) => {
    let input = $(elem).text();
    console.log(`in${i}.txt\n ${input}`);
    fs.writeFile(`${dir}/in${i}.txt`, input, function (err) {
      if (err) {
        return console.log(error);
      }
    });
  });
  console.log("\n");
  //extracting output
  $("div.output pre").each((i, elem) => {
    let output = $(elem).text();
    // console.log(output);
    console.log(`out${i}.txt\n ${output}`);

    fs.writeFile(`${dir}/out${i}.txt`, output, function (err) {
      if (err) {
        return console.log(error);
      }
    });
  });
}

function getTestCase(url) {
  let problem_extract = url.split("/");
  const contestDir =
    process.env.PROBLEM_DIR + `/${problem_extract[problem_extract.length - 1]}`;
  // console.log(contestDir);
  if (!fs.existsSync(contestDir)) {
    fs.mkdirSync(contestDir);
  }

  axios
    .get(url)
    .then((response) => {
      // console.log(reponse.data);
      console.log(
        `${problem_extract[problem_extract.length - 1]} directory created`
      );
      getCasesFromProblem(
        contestDir,
        response.data,
        problem_extract[problem_extract.length - 1]
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

function getProblemList(html) {
  const $ = cheerio.load(html);
  let problemNumber = $(".problems tr").length - 1;
  console.log(`There are ${problemNumber} problems in this contest\n`);
  const contestDir = process.env.PROBLEM_DIR;

  //removing exisitng files
  fs.rmdirSync(contestDir, { recursive: true }, () => {});
  if (!fs.existsSync(contestDir)) {
    fs.mkdirSync(contestDir);
  }
  // fs.readdir(contestDir, (err, files) => {
  //   if (err) throw err;

  //   for (const file of files) {
  //     fs.unlink(path.join(contestDir, file), (err) => {
  //       if (err) throw err;
  //     });
  //   }
  // });
  //making files of template for each problem
  $(".problems td.id a").each((i, elem) => {
    let problemUrl = "https://codeforces.com/" + $(elem).attr("href");
    // console.log(problemUrl);
    getTestCase(problemUrl);
  });
}

axios
  .get(contestLink)
  .then((response) => {
    // console.log(response.data);
    getProblemList(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
