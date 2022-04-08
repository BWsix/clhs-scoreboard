import { Affix } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons";
import { MyActionIcon } from "src/components/Shared/ActionIcon";
import { zIndexTable } from "src/components/zIndexTable";

export const NewsScrollToTop: React.FC = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix
      position={{ bottom: 20, right: 20 }}
      zIndex={zIndexTable.scrollToTop}
    >
      <MyActionIcon onClick={() => scrollTo({ y: 0 })}>
        <IconArrowUp />
      </MyActionIcon>
    </Affix>
  );
};
