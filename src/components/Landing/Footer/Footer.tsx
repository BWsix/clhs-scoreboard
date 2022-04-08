import { ActionIcon, Container, createStyles, Group } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        CLHS Scoreboard
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon
            size="lg"
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://twitter.com/not_clhs"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://github.com/BWsix/clhs_scoreboard"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
