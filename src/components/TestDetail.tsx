import { Container, Divider, Loader, Table, Title } from "@mantine/core";
import { TestMeta } from "src/handlers/testMetaList/getTestMetaList";
import { useTestDetailQuery } from "src/hooks/useTestDetailQuery";

interface Props {
  testMeta: TestMeta | undefined;
}

export const TestDetail: React.FC<Props> = ({ testMeta }) => {
  const { data, isLoading, isError, error } = useTestDetailQuery(testMeta?.url);

  if (isLoading || !testMeta) return <Loader mx="auto" />;
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
      <Title order={3} mb="sm">
        高{data.info.grade + data.info.semester} {data.info.name}
      </Title>

      <Table>
        <thead>
          <tr>
            <th>總分</th>
            <th>平均</th>
            <th>班排</th>
            <th>組排</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.score.sum || "(無)"}</td>
            <td>{data.score.avg || "(無)"}</td>
            <td>{data.rank.inClass || "(無)"}</td>
            <td>{data.rank.inSchool || "(無)"}</td>
          </tr>
        </tbody>
      </Table>

      <Divider size="sm" my="lg" />

      <Table striped>
        <thead>{head}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};
