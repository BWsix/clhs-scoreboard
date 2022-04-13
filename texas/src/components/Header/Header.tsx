import {
  Burger,
  Container,
  createStyles,
  DefaultMantineColor,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { ColorControl } from "./ColorControl/ColorControl";
import { ColorSchemeToggle } from "./ColorSchemeToggle/ColorSchemeToggle";
import { GithubLink } from "./GithubLink/GithubLink";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

interface Props {
  opened: boolean;
  toggleSide: () => void;
  setPrimaryColor: (color: DefaultMantineColor) => void;
  noMenu?: boolean;
}

export function MyHeader({
  opened,
  toggleSide,
  setPrimaryColor,
  noMenu,
}: Props) {
  const { classes } = useStyles();

  return (
    <Header height={56} sx={{ width: "100%" }} fixed>
      <Container className={classes.inner} fluid>
        {!noMenu && (
          <Burger
            opened={opened}
            onClick={toggleSide}
            size="sm"
            className={classes.burger}
          />
        )}

        <Title order={3}>Scoreboard</Title>

        <Group spacing="xs" className={classes.social} position="right" noWrap>
          {!noMenu && <ColorControl onChange={setPrimaryColor} />}
          <ColorSchemeToggle />
          <GithubLink />
        </Group>
      </Container>
    </Header>
  );
}
