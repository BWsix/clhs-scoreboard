import { TRPCError } from "@trpc/server";

export const serviceAvailableGuard = (decodedBody: string) => {
  if (decodedBody.includes("成績處理中，暫無法查詢資料")) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "學校目前已關閉成績查詢",
    });
  }
};
