import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 22,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  githubControl: {
    borderWidth: 2,
    borderColor:
      theme.colorScheme === "dark" ? "transparent" : theme.colors.dark[9],
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : "transparent",

    "&:hover": {
      backgroundColor: `${
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
      } !important`,
    },
  },
}));

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
            href="https://github.com/BWsix/clhs_scoreboard"
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
