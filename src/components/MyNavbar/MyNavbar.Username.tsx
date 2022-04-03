import { useUsername } from "src/components/hooks";

export const Username = () => {
  const { userName } = useUsername();

  return <>{userName}</>;
};
