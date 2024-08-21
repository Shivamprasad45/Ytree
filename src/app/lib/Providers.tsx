"use client";
import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import { store } from "../Store/ConfigStore";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // Wrap the application with both Redux Provider and QueryClientProvider
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>{" "}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
