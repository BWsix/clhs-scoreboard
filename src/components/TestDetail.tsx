import { Container, Divider, Loader, Table, Title } from "@mantine/core";
import { useEffect } from "react";
import { TestMeta } from "src/utils/getTestMetaList";
import { trpc } from "src/utils/trpc";

interface Props {
  session: string;
  testMeta?: TestMeta;
}

export const TestDetail: React.FC<Props> = ({ testMeta, session }) => {
  const testDetail = trpc.useMutation("testDetail");

  useEffect(() => {
    if (!testMeta) return;

    testDetail.mutate({ session, url: testMeta.url });
  }, [testMeta]);

  if (testDetail.isLoading || !testMeta) return <Loader mx="auto" />;

  const detail = testDetail.data;

  if (detail?.error) return <>{detail.message}</>;
  if (!detail?.testDetail) return <>no data</>;

  const { info, rank, score, subjects } = detail.testDetail;

  const rows = subjects?.map(({ average, name, score }) => (
    <tr key={name}>
      <td>{name}</td>
      <td>{score}</td>
      <td>{average}</td>
    </tr>
  ));

  return (
    <Container m="sm">
      <Title order={3} mb="sm">
        高{info.grade + info.semester} {info.name}
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
            <td>{score.sum || "(無)"}</td>
            <td>{score.avg || "(無)"}</td>
            <td>{rank.inClass || "(無)"}</td>
            <td>{rank.inSchool || "(無)"}</td>
          </tr>
        </tbody>
      </Table>

      <Divider size="sm" my="lg" />

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>科目</th>
            <th>分數</th>
            <th>班平均</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};
