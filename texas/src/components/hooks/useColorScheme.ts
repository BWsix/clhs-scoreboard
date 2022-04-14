import { ColorScheme } from "@mantine/core";
import {
  useColorScheme as _useColorScheme,
  useLocalStorage,
} from "@mantine/hooks";

export const useColorScheme = () => {
  const preferredColorScheme = _useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "sb-colorscheme",
    defaultValue: preferredColorScheme,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return {
    colorScheme,
    toggleColorScheme,
  };
};
