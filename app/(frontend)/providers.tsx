"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client/react";
import { getApolloClient } from "@/lib/client/apollo-client";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const client = React.useMemo(() => getApolloClient(), []);

  return (
    <ApolloProvider client={client}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </ApolloProvider>
  );
}
