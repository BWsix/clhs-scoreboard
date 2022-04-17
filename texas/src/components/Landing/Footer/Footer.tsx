import { ActionIcon, Container, Group } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";
import { useStyles } from "./Footer.style";

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
            href="https://github.com/BWsix/clhs-scoreboard"
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
