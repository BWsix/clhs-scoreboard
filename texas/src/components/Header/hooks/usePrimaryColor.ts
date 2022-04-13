import { DefaultMantineColor } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export const COLORS: DefaultMantineColor[] = [
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "teal",
];

export const usePrimaryColor = () => {
  const [primaryColor, _setPrimaryColor] = useLocalStorage<DefaultMantineColor>(
    {
      key: "sb-primaryColor",
      defaultValue: "blue",
    }
  );

  const setPrimaryColor = (color: DefaultMantineColor) => {
    _setPrimaryColor(color);
  };

  return {
    primaryColor,
    setPrimaryColor,
  };
};
