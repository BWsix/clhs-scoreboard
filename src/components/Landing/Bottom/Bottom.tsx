import { Button, Center, createStyles, Space, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { Section } from "../Shared/Section";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
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
}));

export function Bottom() {
  const { classes } = useStyles();

  const router = useRouter();

  return (
    <Section>
      <Center>
        <h1 className={classes.title}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            讓查詢成績更方便
          </Text>
        </h1>
      </Center>

      <Space h="lg" />

      <Center>
        <Button
          size="xl"
          className={classes.control}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          onClick={() => router.push("/exams")}
        >
          開始使用
        </Button>
      </Center>
    </Section>
  );
}
