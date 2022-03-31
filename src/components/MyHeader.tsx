import { Burger, Header, MediaQuery, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { IconSet } from "./Icons/IconSet";

interface Props {
  opened: boolean;
  toggleSideOpened: () => void;
}

export const MyHeader: React.FC<Props> = ({ opened, toggleSideOpened }) => {
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
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={toggleSideOpened}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Title order={3}>Scoreboard</Title>

        <IconSet />
      </div>
    </Header>
  );
};
