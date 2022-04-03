import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowUp } from "tabler-icons-react";

export const NewsScrollToTop: React.FC = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftIcon={<ArrowUp />}
            variant="outline"
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
