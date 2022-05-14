import { ExamDetail, ExamSubject } from "../exam.types";

export const detailParser = (content: string): ExamDetail => {
  const MATCH_SUBJECT_NAME =
    /<td class="top" style="font-size: 15px;">([\u4e00-\u9fa5\-\s\d\w]+)<\/td>/g;
  const MATCH_GENERIC_SCORE =
    /<td class="top right" style="width: 70px; font-size: 15px;">\n*\s*(?:<span \w+="[\w\:\s\;]+">)?([\u4e00-\u9fa5\-\d\.]+|)(?:<\/span>)?\n*\s*<\/td>/g;
  const MATCH_STATUS =
    /<td class="score">\n?\s*(?:<span class="\w+">|)([\d\.]*)(?:<\/span>|)\n?\s*<\/td>/g;
  const MATCH_INFO =
    /<span class="bluetext">【([\u4e00-\u9fa5])年 (\d+)\s*班】\[(\d\d\d)([\u4e00-\u9fa5])\] ([\u4e00-\u9fa5\w\s\d\[\]]+)成績<\/span>/g;

  let exam;
  let error = null;
  let subjects: ExamSubject[] = [];

  while ((exam = MATCH_SUBJECT_NAME.exec(content))) {
    const name = exam[1];

    exam = MATCH_GENERIC_SCORE.exec(content);
    const score = exam![1];

    exam = MATCH_GENERIC_SCORE.exec(content);
    const average = exam![1];

    subjects.push({ name, score, average });
  }

  let scoreSum = "(error)";
  let scoreAvg = "(error)";
  let rankClass = "(error)";
  let rankSchool = "(error)";
  try {
    scoreSum = MATCH_STATUS.exec(content)![1];
    scoreAvg = MATCH_STATUS.exec(content)![1];
    rankClass = MATCH_STATUS.exec(content)![1];
    rankSchool = MATCH_STATUS.exec(content)![1];
  } catch (e) {
    error = e;
  }

  let grade = "(error)";
  let className = "(error)";
  let year = "(error)";
  let semester = "(error)";
  let name = "(error)";
  try {
    const result = MATCH_INFO.exec(content)!;

    grade = result[1];
    className = result[2];
    year = result[3];
    semester = result[4];
    name = result[5];
  } catch (e) {
    error = e;
  }

  return {
    info: {
      className,
      grade,
      name,
      semester,
      year,
    },
    rank: {
      inClass: rankClass,
      inSchool: rankSchool,
    },
    score: {
      avg: scoreAvg,
      sum: scoreSum,
    },
    subjects,
  };
};
