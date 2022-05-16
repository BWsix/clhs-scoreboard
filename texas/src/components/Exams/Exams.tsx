import { ExamMeta } from "@clhs-scoreboard/lappland/lib/router/exam/exam.types";
import { useEffect, useState } from "react";
import { DropDown } from "../Shared/DropDown";
import { LoaderCircle } from "../Shared/LoaderCircle";
import { ExamDetail } from "./ExamDetail/ExamDetail";
import { useExamMetaQuery } from "./hooks/useExamMetaQuery";

export const Exams: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<undefined | number>(undefined);
  const [selected, setSelected] = useState<undefined | ExamMeta>(undefined);
  const { data, error, isError } = useExamMetaQuery(() => {
    setSelectedIdx(0);
  });

  useEffect(() => {
    if (selectedIdx === undefined || !data) return;
    setSelected(data[selectedIdx]);
  }, [data, selectedIdx]);

  if (isError) return <>{error.message}</>;

  return !data ? (
    <LoaderCircle />
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <DropDown
          title="考試選單"
          itemTitles={data.map(({ displayName }) => displayName)}
          setSelectedIdx={setSelectedIdx}
        />
      </div>

      {selected && <ExamDetail examMeta={selected} />}
    </>
  );
};
