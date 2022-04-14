import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Username = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("尚未登入");

  useEffect(() => {
    setUserName(localStorage.getItem("sb-username") || "尚未登入");
  }, [router.pathname]);

  return <span>{userName}</span>;
};
