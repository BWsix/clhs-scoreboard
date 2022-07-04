import { serviceAvailableGuard } from "../../../utils/serviceUnavailable";
import { ExamMeta } from "../exam.types";

const getWeight = (exam: ExamMeta, weight = 0) => {
  weight += 100 * parseInt(exam.year, 10);
  weight += 10 * (exam.semester === "下" ? 1 : 0);
  weight += 1 * ["第1次期中考", "第2次期中考", "期末考"].indexOf(exam.name);

  return weight;
};

const examNameMapper = {
  第1次期中考: "%B2%C41%A6%B8%B4%C1%A4%A4%A6%D2",
  第2次期中考: "%B2%C42%A6%B8%B4%C1%A4%A4%A6%D2",
  期末考: "%B4%C1%A5%BD%A6%D2",
};

export const metaParser = (body: string) => {
  serviceAvailableGuard(body);

  const MATCHER =
    /number=(\d+)&[\d\w\%\=\;]+">\[(\d\d\d)([\u4e00-\u9fa5])\] ([\u4e00-\u9fa5\d]+)</g;

  let exam;
  let result: ExamMeta[] = [];

  while ((exam = MATCHER.exec(body))) {
    const [_, number, year, semester, name] = exam;
    const url = `https://eschool.clhs.tyc.edu.tw/online/selection_student/student_subjects_number.asp?action=%A6U%A6%A1%A6%A8%C1Z&thisyear=${year}&thisterm=${
      semester === "上" ? 1 : 2
      //@ts-ignore
    }&number=${number}&exam%5Fname=${examNameMapper[name]}`;

    result.push({
      name,
      number,
      semester,
      url,
      year,
      displayName: `${year} ${semester} ${name}`,
    });
  }

  result
    .sort((x, y) => {
      return getWeight(x) - getWeight(y);
    })
    .reverse();

  return result;
};
