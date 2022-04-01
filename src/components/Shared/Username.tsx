import { useUsername } from "src/hooks/useUserName";

export const Username = () => {
  const { userName } = useUsername();

  return <>{userName}</>;
};
