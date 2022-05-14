import { AppShellContainerTitle } from "src/components/AppShell/AppShell.Title";
import { useQueryAuthErrorHandler } from "src/components/hooks/useQueryAuthErrorHandler";
import { LoaderCircle } from "src/components/Shared/LoaderCircle";
import { event } from "src/utils/gtag";
import { trpc } from "src/utils/trpc";
import { TimetableTable } from "./Timetable.table";

export const Timetable: React.FC = () => {
  const onError = useQueryAuthErrorHandler();
  const { data, error, isError } = trpc.useQuery(["timetable"], {
    onError,
    onSuccess: () => {
      event({ action: "scheduleQuery", category: "system" });
    },
  });

  if (isError) return <>{error.message}</>;
  if (!data) return <LoaderCircle />;

  return (
    <>
      <AppShellContainerTitle title="課表" />
      <TimetableTable data={data} />
    </>
  );
};
