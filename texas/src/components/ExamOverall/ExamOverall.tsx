import { Space, Table } from "@mantine/core";
import { useState } from "react";
import { AppShellContainerTitle } from "src/components/AppShell/AppShell.Title";
import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { LoaderCircle } from "src/components/Shared/LoaderCircle";
import { trpc } from "src/utils/trpc";
import { Picker } from "./Picker/Picker";

export const ExamOverall = () => {
  const [grade, setGrade] = useState(1);

  const onError = useQueryAuthErrorHandler();
  const { data, isError, error } = trpc.useQuery(["exam.semester", { grade }], {
    onError,
  });

  if (isError) return <>{error.message}</>;

  const headScore = (
    <tr>
      <th>科目</th>
      <th>上</th>
      <th>下</th>
      <th>平均</th>
    </tr>
  );
  const rowsScore = data?.subjects.map(
    ({ name, score, first, second }, idx) => (
      <tr key={idx}>
        <td>{name}</td>
        <td>{first.score}</td>
        <td>{second.score}</td>
        <td>{score}</td>
      </tr>
    )
  );

  const headMeta = (
    <tr>
      <th>項目</th>
      <th>上學期</th>
      <th>下學期</th>
      <th>學年</th>
    </tr>
  );
  const rowsMeta = data?.metaList.map(
    ({ title, scores: { first, second, avg } }, idx) => (
      <tr key={idx}>
        <td>{title}</td>
        <td>{first}</td>
        <td>{second}</td>
        <td>{avg}</td>
      </tr>
    )
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Picker setGrade={setGrade} />
      </div>

      <AppShellContainerTitle
        title={`${["一", "二", "三"][grade - 1]}年級總成績`}
      />
      {!data ? (
        <LoaderCircle />
      ) : (
        <Table striped horizontalSpacing="sm">
          <thead>{headMeta}</thead>
          <tbody>{rowsMeta}</tbody>
        </Table>
      )}

      <Space h="xl" />
      <AppShellContainerTitle title="各科成績" />

      {!data ? (
        <LoaderCircle />
      ) : (
        <Table striped horizontalSpacing="sm">
          <thead>{headScore}</thead>
          <tbody>{rowsScore}</tbody>
        </Table>
      )}
    </>
  );
};
