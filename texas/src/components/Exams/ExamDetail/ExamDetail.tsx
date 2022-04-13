import type { ExamMetaType } from "@clhs-scoreboard/lappland/lib/schemas/examMeta.schema";
import { Anchor, Divider, Group } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "src/components/Shared/ErrorFallback";
import { LoaderCircle } from "src/components/Shared/LoaderCircle";
import { useExamDetailQuery } from "../hooks/useExamDetailQuery";
import { Meta } from "./ExamDetail.Meta";
import { ExamDetailTable } from "./ExamDetail.Table";

interface Props {
  examMeta: ExamMetaType | null;
  setTitle: Dispatch<SetStateAction<string>>;
}

export const ExamDetail: React.FC<Props> = ({ examMeta, setTitle }) => {
  const { data, isLoading, isError, error, refetch, isFetching, isRefetching } =
    useExamDetailQuery(examMeta?.url);

  if (!data || !examMeta || isLoading || isFetching || isRefetching) {
    setTitle("Loading...");
    return <LoaderCircle />;
  }
  if (isError) return <>{error.message}</>;

  setTitle(`高${data.info.grade + data.info.semester} ${data.info.name}`);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Meta data={data} />

      <Divider size="sm" my="lg" />

      <ExamDetailTable data={data} />

      <Group position="right">
        <Anchor
          component="button"
          align="right"
          mt="sm"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          重整資料
        </Anchor>
      </Group>
    </ErrorBoundary>
  );
};
