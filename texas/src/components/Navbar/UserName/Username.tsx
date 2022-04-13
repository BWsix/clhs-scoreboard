import { useUsername } from "src/components/hooks/useUserName";

export const Username = () => {
  const { userName } = useUsername();

  return <span>{userName}</span>;
};
