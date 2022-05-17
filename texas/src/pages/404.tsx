import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { getPageLayout } from "src/layouts/PageLayout";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function NotFoundPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>你抵達了未知的領域</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        令人遺憾的是，這裡甚麼都沒有。你也許輸入了錯誤的網址，或是這個頁面已經被移往新的位置。
      </Text>
      <Group position="center">
        <Link href="/" passHref>
          <Button variant="subtle" size="md">
            回到首頁
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
NotFoundPage.getLayout = getPageLayout({
  title: "找不到頁面",
  onlyPageTitle: true,
});
