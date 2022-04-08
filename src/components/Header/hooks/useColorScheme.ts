import { ColorScheme } from "@mantine/core";
import {
  useColorScheme as useSystemColorScheme,
  useLocalStorage,
} from "@mantine/hooks";

export const useColorScheme = () => {
  const systemColorScheme = useSystemColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "sb-colorscheme",
    defaultValue: systemColorScheme,
  });

  const toggleColorScheme = (colorScheme?: ColorScheme) => {
    console.log(colorScheme);
    setColorScheme(
      (prev) => colorScheme || (prev === "dark" ? "light" : "dark")
    );
  };

  return {
    colorScheme,
    toggleColorScheme,
  };
};
