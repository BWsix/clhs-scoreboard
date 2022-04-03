import { Affix, Button, Transition, useMantineTheme } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowUp } from "tabler-icons-react";

export const NewsScrollToTop: React.FC = () => {
  const theme = useMantineTheme();

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftIcon={<ArrowUp />}
            variant={theme.other.variant}
            radius="md"
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            回到頂端
          </Button>
        )}
      </Transition>
    </Affix>
  );
};
