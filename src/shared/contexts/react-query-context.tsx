"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "../lib/react-query";

interface ReactQueryContextProviderProps {
  children?: React.ReactNode;
}
const ReactQueryContext = ({ children }: ReactQueryContextProviderProps) => {
  // Create a client
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ReactQueryContext;
