import { useRouter } from "next/router";
import { TabProps } from "src/components/MyAppShell";
import { useLastTab } from "src/hooks/uselastTab";

export const useNavigator = () => {
  const router = useRouter();
  const { setLastTab } = useLastTab();

  const navigate = ({ data, tab }: TabProps) => {
    setLastTab(tab);

    router.push(
      `/?tab=${tab}` +
        (Boolean(data) ? `&${new URLSearchParams(data as any)}` : ""),
      undefined,
      {
        shallow: true,
      }
    );
  };

  return navigate;
};
