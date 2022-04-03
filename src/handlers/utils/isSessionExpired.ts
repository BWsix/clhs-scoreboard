import { TRPCError } from "@trpc/server";

const expiredIndicator = "您尚未登入系統，或者工作階段逾時，請重新登入";

export const isSessionExpired = (decodedHTML: string) => {
  const isExpired = decodedHTML.includes(expiredIndicator);

  if (isExpired) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session expired, please re-login.",
    });
  }

  return false;
};
