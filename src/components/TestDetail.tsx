import { Container, Loader, Table, Title } from "@mantine/core";
import { Test } from "src/utils/getTestList";

interface Props {
  test?: Test;
}

export const TestDetail: React.FC<Props> = ({ test }) => {
  if (!test) return <Loader />;

  const rows = test?.subjects?.map(({ name, score }) => (
    <tr key={name}>
      <td>{name}</td>
      <td>{score}</td>
    </tr>
  ));

  return (
    <Container m="sm">
      <Title order={3} pt="md">
        {test.fullName}
      </Title>

      <Table pt="md">
        <thead>
          <tr>
            <th>科目</th>
            <th>分數</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};
