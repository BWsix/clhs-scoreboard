import { Table, Text } from "@mantine/core";
import { RightArrow } from "src/components/Icons/RightArrow";
import { useLastTab } from "src/hooks/uselastTab";
import { useNavigator } from "src/hooks/useNavigator";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { LoaderCircle } from "../Shared/LoaderCircle";
import { useQueryAuthErrorHandler } from "../useQueryAuthErrorHandler";

interface Props {
  closeSide: () => void;
}

export const MyNavbar_TestList: React.FC<Props> = ({ closeSide }) => {
  const navigate = useNavigator();
  const { lastTab } = useLastTab();
  const onError = useQueryAuthErrorHandler();
  const { data, error, isError } = trpc.useQuery(["testMetaList"], {
    onSuccess: (data) => {
      event({ action: "testListQuery", category: "system" });

      if (!data.length) return;
      if (lastTab === "testDetail") {
        navigate({ tab: "testDetail", data: data[0] });
      }
    },
    onError,
  });

  if (isError) {
    return (
      <Text color="red" align="center" mt="md">
        {error.message}
      </Text>
    );
  }

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
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
