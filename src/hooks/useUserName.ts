import { useLocalStorage } from "@mantine/hooks";

const key = "sb-username";

export const useUsername = () => {
  const [userName, updateUserName] = useLocalStorage({
    key,
    defaultValue: "(系統忘了你的名字)",
  });

  const deleteUserName = () => {
    localStorage.removeItem(key);
  };

  return { userName, updateUserName, deleteUserName };
};
