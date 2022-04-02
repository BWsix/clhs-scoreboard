import { News } from "@clhs-api/core";
import { Table } from "@mantine/core";
import React from "react";
import { ExternalLink } from "tabler-icons-react";

interface Props {
  news: News[];
  persistPinned: boolean;
  threshold: number;
}

const newsLink = (newsId: string) =>
  `https://www.clhs.tyc.edu.tw/ischool/public/news_view/show.php?nid=${newsId}`;

export const NewsTable: React.FC<Props> = ({
  news,
  persistPinned,
  threshold,
}) => {
  const rows = news
    .filter(({ clicks, top }) => {
      if (persistPinned && top) return true;
      return parseInt(clicks, 10) > threshold * 10;
    })
    .map(({ title, newsId, time }) => (
      <tr
        key={newsId}
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.open(newsLink(newsId), "_blank");
        }}
      >
        <td>
          {time}
          <br />
          {title}
        </td>
        <td>
          <ExternalLink color="gray" />
        </td>
      </tr>
    ));

  return (
    <Table highlightOnHover verticalSpacing="sm" mt="sm">
      <tbody>{rows}</tbody>
    </Table>
  );
};
