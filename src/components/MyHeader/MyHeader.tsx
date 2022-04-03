import { Burger, Group, Header, MediaQuery, Title } from "@mantine/core";
import { GithubIcon } from "./MyHeader.Github";

interface Props {
  noMenu?: boolean;
  opened: boolean;
  toggleSide: () => void;
}

export const MyHeader: React.FC<Props> = ({ opened, toggleSide, noMenu }) => {
  return (
    <Header height={70} p="md" sx={{ width: "100%" }}>
      <Group>
        <Group spacing="sm" sx={{ flex: 1 }}>
          {!noMenu && (
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger opened={opened} onClick={toggleSide} size="sm" />
            </MediaQuery>
          )}

          <Title order={3}>Scoreboard</Title>
        </Group>

        <GithubIcon />
      </Group>
    </Header>
  );
};
