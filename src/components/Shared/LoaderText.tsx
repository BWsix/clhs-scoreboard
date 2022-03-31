import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  tickInterval?: number;
}

export const LoaderText: React.FC<Props> = ({ text, tickInterval }) => {
  const [ticks, setTicks] = useState(0);
  const interval = useInterval(
    () => setTicks((s) => s + 1),
    tickInterval || 500
  );

  useEffect(() => {
    interval.start();

    return interval.stop;
  }, []);

  return <>{text + ".".repeat(ticks % 4)}</>;
};
