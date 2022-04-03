import { Stack } from "@mantine/core";
import { AppShellContainerTitle } from "../Others/AppShellContainerTitle";

const URL_BASE = "https://calendar.google.com/calendar/embed";

export const Calendar = () => {
  const config = {
    wkst: "1",
    ctz: "Asia/Taipei",
    showTabs: "1",
    title: "",
    showTz: "0",
    showTitle: "0",
    showPrint: "0",
    showDate: "1",
    showNav: "1",
    showCalendars: "0",
    src: "document@clhs.tyc.edu.tw",
  };

  return (
    <Stack sx={{ height: "100%" }} spacing={0}>
      <AppShellContainerTitle title="行事曆" />

      <div style={{ height: "100%" }}>
        <iframe
          src={`${URL_BASE}?${new URLSearchParams(config).toString()}`}
          style={{ border: 0 }}
          width="100%"
          height="100%"
          scrolling="no"
        />
      </div>
    </Stack>
  );
};
