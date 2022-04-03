import { Burger, Header, MediaQuery, Title } from "@mantine/core";
import { GithubIcon } from "./MyHeader.Github";

interface Props {
  noMenu?: boolean;
  opened: boolean;
  toggleSide: () => void;
}

export const MyHeader: React.FC<Props> = ({ opened, toggleSide, noMenu }) => {
  return (
    <Header height={70} p="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        {!noMenu && (
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger opened={opened} onClick={toggleSide} size="sm" mr="xl" />
          </MediaQuery>
        )}

        <Title order={3}>Scoreboard</Title>

        <GithubIcon />
      </div>
    </Header>
  );
};
