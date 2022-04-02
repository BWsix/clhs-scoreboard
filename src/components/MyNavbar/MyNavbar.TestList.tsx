import { Table, Text } from "@mantine/core";
import { RightArrow } from "src/components/Icons/RightArrow";
import { useLastTab } from "src/hooks/uselastTab";
import { useLogout } from "src/hooks/useLogout";
import { useNavigator } from "src/hooks/useNavigator";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { LoaderCircle } from "../Shared/LoaderCircle";

interface Props {
  closeSide: () => void;
}

export const MyNavbar_TestList: React.FC<Props> = ({ closeSide }) => {
  const toggleLogout = useLogout();
  const navigate = useNavigator();
  const { lastTab } = useLastTab();
  const { data, error, isError } = trpc.useQuery(["testMetaList"], {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      event({ action: "testListQuery", category: "system" });

      if (!data.length) return;
      if (lastTab === "testDetail") {
        navigate({ tab: "testDetail", data: data[0] });
      }
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        return toggleLogout();
      }
    },
  });

  if (isError) {
    return (
      <Text color="red" align="center" mt="md">
        {error.message}
      </Text>
    );
  }

  const head = (
    <tr>
      <th>學年</th>
      <th>學期</th>
      <th>考試</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((testMeta) => (
    <tr
      key={testMeta.year + testMeta.semester + testMeta.name}
      style={{ cursor: "pointer" }}
      onClick={() => {
        closeSide();

        navigate({ tab: "testDetail", data: testMeta });
      }}
    >
      <td>{testMeta.year}</td>
      <td>{testMeta.semester}</td>
      <td>{testMeta.name}</td>
      <td>
        <RightArrow />
      </td>
    </tr>
  ));

  if (!data) return <LoaderCircle />;

  return (
    <>
      <Table highlightOnHover>
        <thead>{head}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
