export const logBodyTrimmer = (text: string) => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
};
