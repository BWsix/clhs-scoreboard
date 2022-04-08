import { CalendarAndThemingUpdate } from "./Updates.CalendarAndTheming";
import { ScheduleAndNewsUpdate } from "./Updates.ScheduleAndNews";
import { SecurityUpdate } from "./Updates.Security";

export const Updates = () => {
  return (
    <>
      <CalendarAndThemingUpdate />
      <ScheduleAndNewsUpdate />
      <SecurityUpdate />
    </>
  );
};
