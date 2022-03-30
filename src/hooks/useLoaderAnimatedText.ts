import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const useLoaderAnimatedText = (text: string, tickInterval = 420) => {
  const [ticks, setTicks] = useState(0);
  const interval = useInterval(() => setTicks((s) => s + 1), tickInterval);

  useEffect(() => {
    interval.start();

    return interval.stop;
  }, []);

  return text + ".".repeat(1 + (ticks % 3));
};
