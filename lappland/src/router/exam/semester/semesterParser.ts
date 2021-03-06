import { explode } from "explode.js";
import { serviceAvailableGuard } from "../../../utils/serviceUnavailable";

const getSubjects = (content: string) => {
  const MATCH_LINE = /<td(?:[\s\w\=\"]*)>([\u4e00-\u9fa5\w\.\;\&-]+|)<\/td>/g;

  let match;
  let subjects = [];

  while ((match = MATCH_LINE.exec(content))) {
    let subject = {
      name: "",
      score: "",
      first: { stat: "", credit: "", score: "" },
      second: { stat: "", credit: "", score: "" },
    };

    subject.name = match[1];

    subject.first.stat = match = MATCH_LINE.exec(content)![1];
    subject.first.credit = match = MATCH_LINE.exec(content)![1];
    subject.first.score = match = MATCH_LINE.exec(content)![1];

    subject.second.stat = match = MATCH_LINE.exec(content)![1];
    subject.second.credit = match = MATCH_LINE.exec(content)![1];
    subject.second.score = match = MATCH_LINE.exec(content)![1];

    subject.score = match = MATCH_LINE.exec(content)![1];

    subjects.push(subject);
  }

  return subjects;
};

const getMetaList = (content: string) => {
  const MATCH_LINE = /<td(?:[\s\w\=\"]*)>([\u4e00-\u9fa5\w\.\;\&-]+|)<\/td>/g;

  let match;
  let metaList = [];

  while ((match = MATCH_LINE.exec(content))) {
    let subject = {
      title: "",
      scores: { first: "", second: "", avg: "" },
    };

    subject.title = match[1];

    subject.scores.first = match = MATCH_LINE.exec(content)![1];
    subject.scores.second = match = MATCH_LINE.exec(content)![1];
    subject.scores.avg = match = MATCH_LINE.exec(content)![1];

    metaList.push(subject);
  }

  return metaList;
};

export const semesterParser = (content: string) => {
  serviceAvailableGuard(content);

  content = content.replace(/&nbsp;/g, "");
  content = explode(`text-align: center;">成績</td>`, content)[1];
  const [contentScores, contentMeta] = content.split(
    `<td colspan="10" style="padding: 0px; margin: 0px;">`
  );

  const subjects = getSubjects(contentScores);
  const metaList = getMetaList(contentMeta);

  return { subjects, metaList };
};
