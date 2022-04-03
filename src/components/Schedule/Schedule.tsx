import { ScrollArea, Table } from "@mantine/core";
import { useQueryAuthErrorHandler } from "src/components/hooks";
import { AppShellContainerTitle } from "src/components/Others/AppShellContainerTitle";
import { LoaderCircle } from "src/components/Shared";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";

export const Schedule: React.FC = () => {
  const onError = useQueryAuthErrorHandler();
  const { data, error, isError } = trpc.useQuery(["schedule"], {
    onError,
    onSuccess: () => {
      event({ action: "scheduleQuery", category: "system" });
    },
  });

  if (isError) {
    return <>{error.message}</>;
  }

  const head = (
    <tr>
      <th>週一</th>
      <th>週二</th>
      <th>週三</th>
      <th>週四</th>
      <th>週五</th>
    </tr>
  );

  if (!data) {
    return <LoaderCircle />;
  }

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
    <>
      <AppShellContainerTitle title="課表" />

      <div style={{ display: "flex" }}>
        <div style={{ display: "inline-block" }}>
          <LeftBar />
        </div>

        <ScrollArea
          offsetScrollbars
          type="always"
          scrollbarSize={8}
          style={{ display: "inline-block" }}
        >
          <Table striped verticalSpacing="sm">
            <thead>{head}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </div>
    </>
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
