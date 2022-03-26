export interface Subject {
  name: string;
  score: string;
}

export interface Test {
  fullName: string;
  name: string;
  part: string;
  ranking: string;
  scoreAvg: string;
  scoreSum: string;
  subjects: Subject[];
  year: string;
}

const getWeight = (test: Test, weight = 0) => {
  weight += 100 * parseInt(test.year, 10);
  weight += 10 * (test.part === "下" ? 1 : 0);
  weight += 1 * ["第1次期中考", "第2次期中考", "期末考"].indexOf(test.name);

  return weight;
};

export const getTestList = (content: string) => {
  const MATCH_TEST_BEGIN = /<td class="td_17" >考試名稱＼科目名稱<\/td>/g;
  const MATCH_SUBJECT = /<td class="td_17">([\u4e00-\u9fa5\w\-]+|)<\/td>/g;
  const MATCH_TEST_META =
    /<td rowspan="1" class="td_08" style="vertical-align: top;">\[(\d\d\d)([\u4e00-\u9fa5])\] ([\u4e00-\u9fa5\d]+)<\/td>/g;
  const MATCH_SCORE = /<td class="td_08\s?[\w]*">([\d\-\.]+|)<\/td>/g;

  let test;
  let result: Test[] = [];

  while (MATCH_TEST_BEGIN.exec(content)) {
    let names: string[] = [];
    let scores: string[] = [];
    let _subjects: Subject[] = [];

    for (let i = 0; i < 23; i++) {
      test = MATCH_SUBJECT.exec(content);
      names.push(test![1]);
    }
    for (let i = 0; i < 23; i++) {
      test = MATCH_SCORE.exec(content);
      scores.push(test![1]);
    }
    for (let i = 0; i < 23; i++) {
      if (names[i]) {
        _subjects.push({ name: names[i], score: scores[i] });
      }
    }

    const subjects = _subjects.slice(0, -3);
    const scoreSum = _subjects[-3]?.score || "";
    const scoreAvg = _subjects[-2]?.score || "";
    const ranking = _subjects[-1]?.score || "";

    test = MATCH_TEST_META.exec(content);
    const [_, year, part, name] = test!;

    result.push({
      fullName: `${year} ${part} ${name}`,
      name,
      part,
      ranking,
      scoreAvg,
      scoreSum,
      subjects,
      year,
    });
  }

  result
    .sort((x, y) => {
      return getWeight(x) - getWeight(y);
    })
    .reverse();

  return result;
};
