import { ColorScheme, DefaultMantineColor } from "@mantine/core";
import {
  useColorScheme as _useColorScheme,
  useLocalStorage,
} from "@mantine/hooks";

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

export const useColorScheme = () => {
  const systemColorScheme = _useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "sb-colorscheme",
    defaultValue: systemColorScheme,
  });

  const [primaryColor, setPrimaryColor] = useLocalStorage<DefaultMantineColor>({
    key: "sb-primaryColor",
    defaultValue: "blue",
  });

  const setColorSchemeAndPrimaryColor = (
    colorScheme?: ColorScheme,
    primaryColor?: DefaultMantineColor
  ) => {
    if (!primaryColor) {
      setColorScheme(
        (prev) => colorScheme || (prev === "dark" ? "light" : "dark")
      );
      return;
    }

    setPrimaryColor(primaryColor);
  };

  return {
    colorScheme,
    setColorSchemeAndPrimaryColor,
    primaryColor,
    setPrimaryColor,
  };
};
