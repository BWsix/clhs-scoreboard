import {
  Anchor,
  Container,
  Divider,
  Loader,
  Table,
  Title,
} from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import { TestMeta } from "src/handlers/testMetaList/getTestMetaList";
import { useTestDetailQuery } from "src/hooks/useTestDetailQuery";
import { ErrorFallback } from "../Shared/ErrorFallback";
import { TestDetail_Title } from "./TestDetail.Title";

interface Props {
  testMeta: TestMeta | undefined;
}

export const TestDetail_Main: React.FC<Props> = ({ testMeta }) => {
  const { data, isLoading, isError, error, refetch, dataUpdatedAt } =
    useTestDetailQuery(testMeta?.url);

  const updatedAt = new Date(dataUpdatedAt).toLocaleTimeString();

  if (isLoading || !testMeta) return <Loader />;
  if (isError) return <>{error.message}</>;
  if (!data) return <>no data</>;

  const head = (
    <tr>
      <th>科目</th>
      <th>分數</th>
      <th>班平均</th>
    </tr>
  );

  const rows = data.subjects?.map(({ average, name, score }) => (
    <tr key={name}>
      <td>{name}</td>
      <td>{score}</td>
      <td>{average}</td>
    </tr>
  ));

  return (
    <Container m="sm">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Title order={3} mb="sm">
          高{data.info.grade + data.info.semester} {data.info.name}
        </Title>

        <TestDetail_Title data={data} />

        <Divider size="sm" my="lg" />

        <Table striped>
          <thead>{head}</thead>
          <tbody>{rows}</tbody>
        </Table>

        <Anchor
          component="button"
          color="gray"
          align="right"
          mt="sm"
          sx={{ width: "100%" }}
          onClick={() => refetch()}
          disabled={isLoading}
        >
          重整資料 (最後更新於{updatedAt})
        </Anchor>
      </ErrorBoundary>
    </Container>
  );
};
