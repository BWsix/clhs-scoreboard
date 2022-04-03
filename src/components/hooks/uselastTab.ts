import { useLocalStorage } from "@mantine/hooks";
import type { TabProps } from "src/components/MyAppShell";

export const useLastTab = () => {
  const [lastTab, setLastTab] = useLocalStorage<TabProps["tab"]>({
    key: "sb-lastTag",
    defaultValue: "testDetail",
  });

  return { lastTab, setLastTab };
};
