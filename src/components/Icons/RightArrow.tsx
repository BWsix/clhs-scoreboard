import { ActionIcon } from "@mantine/core";
import { ChevronDown, ChevronRight } from "tabler-icons-react";

interface Props {
  down?: boolean;
}

export const RightArrow: React.FC<Props> = ({ down }) => {
  return (
    <ActionIcon
      variant="transparent"
      style={{ width: "100%", display: "flex", justifyContent: "right" }}
    >
      {down ? <ChevronDown /> : <ChevronRight />}
    </ActionIcon>
  );
};
