import { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "sb-scheme", // new name!
    defaultValue: "light",
  });

  const toggleColorScheme = (colorScheme?: ColorScheme) => {
    setColorScheme(
      (prev) => colorScheme || (prev === "dark" ? "light" : "dark")
    );
  };

  return {
    colorScheme,
    toggleColorScheme,
  };
};
