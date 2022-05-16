import { useEffect } from "react";
import { getPageLayout } from "src/layouts/PageLayout";
import { event } from "src/utils/gtag";

const API = "https://calendar.google.com/calendar/embed";
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

export default function CalendarPage() {
  useEffect(() => {
    event({ action: "calendarPage", category: "system" });
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={`${API}?${new URLSearchParams(config).toString()}`}
        style={{ border: 0 }}
        width="100%"
        height="100%"
        scrolling="no"
      />
    </div>
  );
}
CalendarPage.getLayout = getPageLayout({
  title: "行事曆",
  onlyPageTitle: true,
});
