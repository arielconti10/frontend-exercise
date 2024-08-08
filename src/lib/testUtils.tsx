import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createQueryClientWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  QueryClientWrapper.displayName = "QueryClientWrapper";

  return QueryClientWrapper;
}
