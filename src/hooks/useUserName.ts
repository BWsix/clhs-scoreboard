import { useLocalStorage } from "@mantine/hooks";

const key = "sb-username";

export const useUsername = () => {
  const [userName, updateUserName] = useLocalStorage({
    key,
    defaultValue: "",
  });

  const deleteUserName = () => {
    localStorage.removeItem(key);
  };

  return { userName, updateUserName, deleteUserName };
};
