import { ScrollArea, Table } from "@mantine/core";
import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { LoaderCircle } from "src/components/Shared/LoaderCircle";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const Timetable: React.FC = () => {
  const onError = useQueryAuthErrorHandler();
  const { data, error, isError } = trpc.useQuery(["timetable"], {
    onError,
    onSuccess: () => {
      event({ action: "timetable", category: "system" });
    },
  });

  if (isError) return <>{error.message}</>;
  if (!data) return <LoaderCircle />;

  const head = (
    <tr>
      <th>週一</th>
      <th>週二</th>
      <th>週三</th>
      <th>週四</th>
      <th>週五</th>
    </tr>
  );

  const rows = data!.map((lessons, idx) => (
    <tr key={idx}>
      {lessons.map((lesson, idx) => (
        <td key={idx} style={{ whiteSpace: "nowrap" }}>
          {lesson}
        </td>
      ))}
    </tr>
  ));

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "inline-block" }}>
        <LeftBar />
      </div>

      <ScrollArea
        offsetScrollbars
        type="always"
        scrollbarSize={8}
        style={{ display: "inline-block", width: "100%" }}
      >
        <Table striped verticalSpacing="sm">
          <thead>{head}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

const LeftBar = () => {
  return (
    <Table striped verticalSpacing="sm" style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th>　</th>
        </tr>
      </thead>

      <tbody>
        {Array.from(Array(8).keys()).map((idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
