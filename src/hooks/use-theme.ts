"use client";

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return {
      theme: undefined,
      setTheme,
      systemTheme,
      mounted: false,
    };
  }

  return {
    theme,
    setTheme,
    systemTheme,
    mounted: true,
    isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
    isLight: theme === 'light' || (theme === 'system' && systemTheme === 'light'),
  };
} 