import { Text } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import { usePreviousPage } from "src/components/hooks/usePreviousPage";

const GoToPrev: NextPage = () => {
  const { goToPrev } = usePreviousPage();

  useEffect(() => {
    goToPrev();
  }, []);

  return <Text align="center">Redirecting...</Text>;
};

export default GoToPrev;
