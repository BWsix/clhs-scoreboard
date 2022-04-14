import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Username = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("sb-username") || "");
  }, [router.pathname]);

  return <span>{userName}</span>;
};
