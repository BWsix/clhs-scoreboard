import { Container, Divider, Loader, Table, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TestMeta } from "src/handlers/testMetaList/getTestMetaList";
import { trpc } from "src/utils/trpc";

interface Props {
  testMeta?: TestMeta;
}

export const TestDetail: React.FC<Props> = ({ testMeta }) => {
  const router = useRouter();
  const testDetailMutation = trpc.useMutation("testDetail", {
    onError: (error: any) => {
      if (error?.message === "sessionError") {
        router.push("/login");
        return;
      }
    },
  });

  useEffect(() => {
    if (!testMeta) return;

    testDetailMutation.mutate({ url: testMeta.url });
  }, [testMeta]);

  if (testDetailMutation.isLoading || !testMeta) return <Loader mx="auto" />;
  if (testDetailMutation.isError)
    return <>{testDetailMutation.error.message}</>;
  if (!testDetailMutation.data) return <>no data</>;

  const { info, rank, score, subjects } = testDetailMutation.data;

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

      <Table striped>
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
