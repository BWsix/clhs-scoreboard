import { News } from "@clhs-api/core";
import { ActionIcon, Table, Text } from "@mantine/core";
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
    .filter((news) => {
      if (persistPinned && news.top) return true;
      return parseInt(news.clicks, 10) > threshold * 10;
    })
    .map((news) => (
      <tr key={news.newsId}>
        <td>
          <div style={{ color: "gray" }}>
            {news.time}．{news.unit_name}．{news.clicks}點閱
          </div>
          <Text mt="xs">{news.title}</Text>
        </td>

        <td>
          <ActionIcon
            size="xl"
            component="a"
            href={newsLink(news.newsId)}
            variant="transparent"
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLink color="gray" />
          </ActionIcon>
        </td>
      </tr>
    ));

  return (
    <Table verticalSpacing="sm" mt="sm">
      <tbody>{rows}</tbody>
    </Table>
  );
};
