interface Props {
  error: Error;
  resetErrorBoundary: () => any | undefined;
}

export const ErrorFallback: React.FC<Props> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h2>error</h2>

      {JSON.stringify({
        message: error.message,
        name: error.name,
        cause: error.cause,
        stack: error.stack,
      })}

      <br />

      {resetErrorBoundary && (
        <button onClick={resetErrorBoundary}>retry</button>
      )}
    </div>
  );
};
