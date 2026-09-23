"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface GlossyButtonProps extends ButtonProps {
  children: React.ReactNode;
  colorScheme?: "blue" | "pink" | "green";
}

export function GlossyButton({
  children,
  colorScheme = "blue",
  ...props
}: GlossyButtonProps) {
  const themes = {
    blue: {
      gradient: "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
      border: "blue.400",
      hoverGradient: "linear-gradient(to bottom, #2563eb, #1e40af)",
      activeGradient: "linear-gradient(to bottom, #1e40af, #1d4ed8)",
    },
    pink: {
      gradient: "linear-gradient(to bottom, #F165AE, #d93c8d)",
      border: "#BF2173",
      hoverGradient: "linear-gradient(to bottom, #ff7abf, #d93c8d)",
      activeGradient: "linear-gradient(to bottom, #d93c8d, #0a090a)",
    },
    green: {
      gradient: "linear-gradient(to bottom, #22c55e, #00AA13)",
      border: "#16a34a",
      hoverGradient: "linear-gradient(to bottom, #4dca7b, #00AA13)",
      activeGradient: "linear-gradient(to bottom, #166534, #14532d)",
    },
  };

  const currentTheme = themes[colorScheme] || themes.blue;

  return (
    <Button
      color="white"
      bgImage={currentTheme.gradient}
      border="1px solid"
      borderColor={currentTheme.border}
      boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)"
      _hover={{
        bgImage: currentTheme.hoverGradient,
      }}
      _active={{
        bgImage: currentTheme.activeGradient,
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
        ...props._active,
      }}
      transition="all 0.2s ease-in-out"
      {...props}
    >
      {children}
    </Button>
  );
}
