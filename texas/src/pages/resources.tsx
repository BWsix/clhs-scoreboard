import { Grid, Group, Text } from "@mantine/core";
import got from "got";
import { GetStaticProps } from "next";
import Link from "next/link";
import {
  ImageCardProps,
  ResourceImageCard,
} from "src/components/Resource/Resource";
import { getPageLayout } from "src/layouts/PageLayout";

export const getStaticProps: GetStaticProps = async () => {
  const DIVIDER = "B===D-3";
  const url = "https://api.github.com/repos/bwsix/clhs-scoreboard/issues";
  const searchParams = new URLSearchParams([
    ["labels", "community-resource"],
    ["per_page", "100"],
    ["state", "closed"],
  ]);
  const result = await got.get(url, { searchParams });
  const resources = JSON.parse(result.body).map(
    ({ body }: { body: string }) => {
      const [
        _title,
        title,
        _author,
        author,
        _description,
        description,
        _link,
        link,
        _imageUrl,
        imageUrl,
      ] = body.replace(/((?:\r\n)|\n)/g, DIVIDER).split(`${DIVIDER}${DIVIDER}`);

      return { title, author, description, link, imageUrl };
    }
  );

  return {
    props: { resources },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

export default function ResourcesPage({
  resources,
}: {
  resources: ImageCardProps[];
}) {
  const resourceList = resources.map(
    ({ description, link, title, imageUrl, author }) => (
      <ResourceCard
        description={description}
        link={link}
        title={title}
        author={author}
        imageUrl={imageUrl}
        key={link}
      />
    )
  );
  return (
    <>
      <Group>
        <Link
          href="https://github.com/BWsix/clhs-scoreboard/issues?q=is%3Aissue+is%3Aclosed+label%3Acommunity-resource"
          target="_blank"
        >
          <Text style={{ textDecoration: "underline", cursor: "pointer" }}>
            在github上查看社群資源清單
          </Text>
        </Link>
        <Link
          href="https://github.com/BWsix/clhs-scoreboard/issues/new?assignees=BWsix&labels=application-request&template=application-request.yml"
          target="_blank"
        >
          <Text style={{ textDecoration: "underline", cursor: "pointer" }}>
            提交申請
          </Text>
        </Link>
      </Group>
      <Grid>{resourceList}</Grid>
    </>
  );
}
ResourcesPage.getLayout = getPageLayout({
  title: "社群資源",
});

const ResourceCard: React.FC<ImageCardProps> = ({
  description,
  link,
  title,
  imageUrl,
  author,
}) => {
  return (
    <Grid.Col xs={6}>
      <ResourceImageCard
        author={author}
        description={description}
        link={link}
        title={title}
        imageUrl={imageUrl}
      />
    </Grid.Col>
  );
};
