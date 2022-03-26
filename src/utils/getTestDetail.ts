export interface Subject {
  name: string;
  score: string;
  average: string;
}

export interface TestDetail {
  info: {
    grade: string;
    className: string;
    year: string;
    semester: string;
    name: string;
  };
  score: {
    sum: string;
    avg: string;
  };
  rank: {
    inClass: string;
    inSchool: string;
  };
  subjects: Subject[];
}

export const getTestDetail = (content: string): TestDetail => {
  const MATCH_SUBJECT_NAME =
    /<td class="top" style="font-size: 15px;">([\u4e00-\u9fa5\-\s\d\w]+)<\/td>/g;
  const MATCH_GENERIC_SCORE =
    /<td class="top right" style="width: 70px; font-size: 15px;">\n*\s*(?:<span \w+="[\w\:\s\;]+">)?([\u4e00-\u9fa5\-\d\.]+|)(?:<\/span>)?\n*\s*<\/td>/g;
  const MATCH_STATUS = /<td class="score">([\d\.]*)<\/td>/g;
  const MATCH_INFO =
    /<span class="bluetext">【([\u4e00-\u9fa5])年 (\d\d) 班】\[(\d\d\d)([\u4e00-\u9fa5])\] ([\u4e00-\u9fa5\w\s\d\[\]]+)成績<\/span>/g;

  let test;
  let subjects: Subject[] = [];

  while ((test = MATCH_SUBJECT_NAME.exec(content))) {
    const name = test[1];

    test = MATCH_GENERIC_SCORE.exec(content);
    const score = test![1];

    test = MATCH_GENERIC_SCORE.exec(content);
    const average = test![1];

    subjects.push({ name, score, average });
  }

  const scoreSum = MATCH_STATUS.exec(content)![1];
  const scoreAvg = MATCH_STATUS.exec(content)![1];
  const rankClass = MATCH_STATUS.exec(content)![1];
  const rankSchool = MATCH_STATUS.exec(content)![1];

  const [_, grade, className, year, semester, name] = MATCH_INFO.exec(content)!;

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
