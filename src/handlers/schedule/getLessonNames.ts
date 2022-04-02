import * as cheer from "cheerio";

const MATCH_CLASS = /class="[\d\w\s\;\:\-\u4e00-\u9fa5]+"/g;
const MATCH_STYLE = /style="[\d\w\s\;\:\-\u4e00-\u9fa5]+"/g;
const MATCH_ROOM =
  /<br><span [\d\w\s\;\:\-\u4e00-\u9fa5\n\"\<\>\=]+<\/span><br>/g;
const MATCH_NAME = /<br>[\u4e00-\u9fa5]+/g;

type WEEK = [mon: string, tue: string, wed: string, thu: string, fri: string];

export const getLessonNames = (decodedScheduleHtml: string) => {
  const $ = cheer.load(decodedScheduleHtml);

  const body = $("body")
    .find("table")
    .slice(1)
    .find("td")
    .nextAll()
    .find("tbody")
    .find("tr")
    .slice(2, -1)
    .toString();

  const parsed = body
    ?.replace(MATCH_CLASS, "")
    .replace(MATCH_STYLE, "")
    .replace(MATCH_NAME, "")
    .replace(MATCH_ROOM, "")
    .replace(/<br>/g, "");

  const MATCH_LESSON = /<td >([\u4e00-\u9fa5\w︴\<\>\:\-\s\n ]+)<\/td>\n/g;

  let lessonList: WEEK[] = [];

  for (let i = 0; i < 8; i++) {
    MATCH_LESSON.exec(parsed);
    MATCH_LESSON.exec(parsed);

    let lessonList_oneDay = [];
    for (let j = 0; j < 5; j++) {
      const lesson = MATCH_LESSON.exec(parsed)![1];
      lessonList_oneDay.push(lesson);
    }

    lessonList.push(lessonList_oneDay as WEEK);
  }

  return lessonList;
};
