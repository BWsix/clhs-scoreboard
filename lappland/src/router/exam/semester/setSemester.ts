import axios from "axios";
import { decodeBig5 } from "../../../utils/decodeBig5";
import { semesterParser } from "./semesterParser";

const getUrl = (grade: number) => {
  const big5Mapper = ["%A4%40", "%A4G", "%A4T"];

  return `https://eschool.clhs.tyc.edu.tw/online/selection_student/year_accomplishment.asp?action=selection_underside_year&year_class=${
    big5Mapper[grade - 1]
  }&number=${grade}`;
};

export const getSemester = async (sessionCookie: string, grade: number) => {
  const getResult = await axios.get(getUrl(grade), {
    headers: { cookie: sessionCookie },
    responseType: "arraybuffer",
  });
  const decodedBody = decodeBig5(getResult.data);
  const data = semesterParser(decodedBody);

  return data;
};
