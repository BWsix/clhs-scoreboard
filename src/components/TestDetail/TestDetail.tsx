import { Anchor, Divider, Group, Table } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import { AppShellContainerTitle } from "src/components/Others/AppShellContainerTitle";
import { ErrorFallback, LoaderCircle } from "src/components/Shared";
import type { TestMetaType } from "src/schemas/testMeta.schema";
import { TestDetail_Title } from "./TestDetail.Title";
import { useTestDetailQuery } from "./useTestDetailQuery";

interface Props {
  testMeta: TestMetaType | undefined;
}

export const TestDetail: React.FC<Props> = ({ testMeta }) => {
  const { data, isLoading, isError, error, refetch, isFetching, isRefetching } =
    useTestDetailQuery(testMeta?.url);

  if (!testMeta) return <LoaderCircle />;
  if (!testMeta || isLoading || isFetching || isRefetching)
    return <LoaderCircle />;
  if (isError) return <>{error.message}</>;
  if (!data) return <LoaderCircle />;

  const head = (
    <tr>
      <th>科目</th>
      <th>分數</th>
      <th>班平均</th>
    </tr>
  );

  const rows = data.subjects?.map(({ average, name, score }) => {
    if (name.includes("-")) {
      const [a, b] = name.split("-");
      return (
        <tr key={name}>
          <td>
            {a}
            <br />
            {b}
          </td>
          <td>{score}</td>
          <td>{average}</td>
        </tr>
      );
    }

    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{score}</td>
        <td>{average}</td>
      </tr>
    );
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppShellContainerTitle
        title={`高${data.info.grade + data.info.semester} ${data.info.name}`}
      />

      <TestDetail_Title data={data} />

      <Divider size="sm" my="lg" />

      <Table striped>
        <thead>{head}</thead>
        <tbody>{rows}</tbody>
      </Table>

      <Group position="right">
        <Anchor
          component="button"
          align="right"
          mt="sm"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          重整資料
        </Anchor>
      </Group>
    </ErrorBoundary>
  );
};
