import { Burger, Header, MediaQuery, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { IconSet } from "./Icons/IconSet";

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const MyHeader: React.FC<Props> = ({ opened, setOpened }) => {
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
            onClick={() => setOpened((o) => !o)}
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
