import { Button, Container, Group, Text, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useStyles } from "./HeroTitle.style";

export function HeroTitle() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          一個
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            為使用者打造
          </Text>
          <br />
          的成績查詢網站
        </h1>

        <Text className={classes.description} color="dimmed">
          再也不需要到處按按鈕、跳轉好幾個頁面，壢中 Scoreboard
          讓你一登入便能立刻看到成績
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => router.push("/exams")}
          >
            開始使用
          </Button>

          <Button
            component="a"
            target="_blank"
            href="https://github.com/BWsix/clhs-scoreboard"
            size="xl"
            variant="outline"
            className={cx(classes.control, classes.githubControl)}
            color={theme.colorScheme === "dark" ? "gray" : "dark"}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
