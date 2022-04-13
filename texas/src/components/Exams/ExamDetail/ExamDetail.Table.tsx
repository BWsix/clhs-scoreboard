import { Table } from "@mantine/core";
import { ExamDetail } from "src/handlers/examDetail/examDetail.getExamDetail";

interface Props {
  data: ExamDetail;
}

export const ExamDetailTable = ({ data }: Props) => {
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
    <Table striped>
      <thead>{head}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
