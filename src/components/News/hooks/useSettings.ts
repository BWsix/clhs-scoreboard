import {
  useDebouncedValue,
  useLocalStorage,
  useShallowEffect,
} from "@mantine/hooks";
import { useState } from "react";

export const useSettings = () => {
  const [
    { persistPinned: _persistPinned, threshold: _threshold },
    updateSettings,
  ] = useLocalStorage({
    key: "sb-newsSettings",
    defaultValue: {
      threshold: 15,
      persistPinned: true,
    },
  });

  const [threshold, setThreshold] = useState(_threshold);
  const [persistPinned, setPersistPinned] = useState(_persistPinned);

  const [debouncedThreshold] = useDebouncedValue(threshold, 500);
  const [debouncedPersistPinned] = useDebouncedValue(persistPinned, 500);

  useShallowEffect(() => {
    updateSettings({
      persistPinned: debouncedPersistPinned,
      threshold: debouncedThreshold,
    });
  }, [debouncedPersistPinned, debouncedThreshold]);

  return {
    threshold,
    persistPinned,
    setThreshold,
    setPersistPinned,
  };
};
