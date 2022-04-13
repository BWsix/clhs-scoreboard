import axios from "axios";
import { decodeBig5 } from "../utils/decodeBig5";
import { isSessionExpired } from "../utils/isSessionExpired";
import { API } from "../constants";
import { getExamOverall } from "./getExamOverall";

const getUrl = (grade: number) => {
  const big5Mapper = ["%A4%40", "%A4G", "%A4T"];

  return (
    API.BASE +
    `/selection_student/year_accomplishment.asp?action=selection_underside_year&year_class=${
      big5Mapper[grade - 1]
    }&number=${grade}`
  );
};

export const examOverall = async (sessionCookie: string, grade: number) => {
  const examOverallResult = await axios.get(getUrl(grade), {
    headers: { cookie: sessionCookie },
    responseType: "arraybuffer",
  });

  const decodedOverallResult = decodeBig5(examOverallResult.data);
  isSessionExpired(decodedOverallResult);

  const data = getExamOverall(decodedOverallResult);

  return data;
};
