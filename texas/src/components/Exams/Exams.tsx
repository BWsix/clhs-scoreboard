import { ExamMetaType } from "@clhs-scoreboard/lappland/lib/schemas/examMeta.schema";
import { useState } from "react";
import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { trpc } from "src/utils/trpc";
import { AppShellContainerTitle } from "../AppShell/AppShell.Title";
import { ExamDetail } from "./ExamDetail/ExamDetail";
import { Picker } from "./Picker/Picker";

export const Exams: React.FC = () => {
  const [selected, setSelected] = useState<ExamMetaType | null>(null);
  const [title, setTitle] = useState("");

  const onError = useQueryAuthErrorHandler();
  const [data, setData] = useState<ExamMetaType[]>([]);

  const { error, isError } = trpc.useQuery(["examMetaList"], {
    onSuccess: (result) => {
      setData(result);
      setSelected(result[0]);
    },
    onError,
  });

  if (isError) return <>{error.message}</>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Picker data={data} setSelected={setSelected} />
      </div>

      <AppShellContainerTitle title={title} />

      <ExamDetail examMeta={selected} setTitle={setTitle} />
    </>
  );
};
