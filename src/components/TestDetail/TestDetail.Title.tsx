import { Table } from "@mantine/core";

interface Props {
  data: {
    score: {
      sum: string;
      avg: string;
    };
    rank: {
      inClass: string;
      inSchool: string;
    };
  };
}

export const TestDetail_Title: React.FC<Props> = ({ data }) => {
  return (
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
  );
};
