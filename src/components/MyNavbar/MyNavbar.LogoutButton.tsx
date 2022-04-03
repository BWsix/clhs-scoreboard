import { Button } from "@mantine/core";
import { useLogout } from "src/components/hooks";

export const LogoutButton = () => {
  const toggleLogout = useLogout();

  return (
    <Button color="gray" onClick={() => toggleLogout()}>
      登出
    </Button>
  );
};
