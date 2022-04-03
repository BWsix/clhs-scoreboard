import type { NextPage } from "next";
import { ErrorBoundary } from "react-error-boundary";
import { MyAppShell } from "src/components/MyAppShell";
import { ErrorFallback } from "src/components/Shared";

const Home: NextPage = () => {
  if (typeof window !== "undefined") {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MyAppShell />
      </ErrorBoundary>
    );
  }

  return null;
};

export default Home;
