import type { ExamMeta } from "@clhs-scoreboard/lappland/lib/router/exam/exam.types";
import { Anchor, Divider, Group } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";
import { AppShellContainerTitle } from "src/components/AppShell/AppShell.Title";
import { ErrorFallback } from "src/components/Shared/ErrorFallback";
import { LoaderCircle } from "src/components/Shared/LoaderCircle";
import { useExamDetailQuery } from "../hooks/useExamDetailQuery";
import { Meta } from "./ExamDetail.Meta";
import { ExamDetailTable } from "./ExamDetail.Table";

interface Props {
  examMeta: ExamMeta;
}

export const ExamDetail: React.FC<Props> = ({ examMeta }) => {
  const { data, error, refetch, isError, isLoading } = useExamDetailQuery(
    examMeta.url
  );

  if (isError) return <>{error.message === "URI malformed" ? "學校伺服器目前已關閉成績查詢功能" : `錯誤：${error.message}`}</>;
  if (!data) return <LoaderCircle />;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppShellContainerTitle
        title={`高${data.info.grade + data.info.semester} ${data.info.name}`}
      />

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
