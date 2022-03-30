import { Button } from "@mantine/core";
import React from "react";
import { useLogout } from "src/hooks/useLogout";

export const LogoutButton = () => {
  const toggleLogout = useLogout();

  return (
    <Button color="gray" onClick={() => toggleLogout()}>
      登出
    </Button>
  );
};
