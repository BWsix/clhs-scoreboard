import {
  ActionIcon,
  Button,
  Center,
  Checkbox,
  Collapse,
  Group,
  InputWrapper,
  Slider,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { AppShellContainerTitle } from "src/components/Others/AppShellContainerTitle";
import { LoaderCircle } from "src/components/Shared";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { Filter } from "tabler-icons-react";
import { NewsScrollToTop } from "./News.ScrollToTop";
import { NewsTable } from "./News.Table";
import { useSettings } from "./useSettings";

export const News = () => {
  const theme = useMantineTheme();

  const { persistPinned, setPersistPinned, setThreshold, threshold } =
    useSettings();
  const [opened, toggleOpened] = useToggle(false, [false, true]);

  const newsQuery = trpc.useInfiniteQuery(["news", {}], {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    onSuccess: () => {
      event({ action: "newsListQuery", category: "system" });
    },
  });

  if (newsQuery.isError) {
    return <>{newsQuery.error.message}</>;
  }

  if (!newsQuery.data) {
    return <LoaderCircle />;
  }

  const news = newsQuery.data.pages
    .map(({ newsList }) => newsList)
    .reduce((prev, next) => prev.concat(next));

  return (
    <>
      <Group style={{ display: "flex", justifyContent: "space-between" }}>
        <AppShellContainerTitle title="官網公告" />
        <ActionIcon onClick={() => toggleOpened()}>
          <Filter />
        </ActionIcon>
      </Group>

      <Collapse in={opened}>
        <InputWrapper
          mt="sm"
          label={`只顯示點閱超過 ${threshold * 10} 次的公告`}
          sx={{ flex: 1 }}
        >
          <Slider
            sx={{ flex: 1 }}
            label={threshold * 10}
            defaultValue={threshold}
            onChange={setThreshold}
          />
        </InputWrapper>

        <Checkbox
          mx="auto"
          mt="sm"
          label="不隱藏被釘選的公告"
          checked={persistPinned}
          onChange={(event) => setPersistPinned(event.currentTarget.checked)}
        />
      </Collapse>

      <NewsTable
        news={news}
        persistPinned={persistPinned}
        threshold={threshold}
      />

      <Center>
        <Button
          variant={theme.other.variant}
          mt="md"
          onClick={() => newsQuery.fetchNextPage()}
          loading={newsQuery.isFetchingNextPage}
        >
          載入更多
        </Button>
      </Center>

      <NewsScrollToTop />
    </>
  );
};
