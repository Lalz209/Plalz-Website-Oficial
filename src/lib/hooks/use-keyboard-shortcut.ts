"use client";

import { useEffect } from 'react';

interface UseKeyboardShortcutProps {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcut({
  key,
  metaKey = false,
  ctrlKey = false,
  shiftKey = false,
  altKey = false,
  callback,
  enabled = true
}: UseKeyboardShortcutProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key matches
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      // Check modifiers
      if (metaKey && !event.metaKey) return;
      if (ctrlKey && !event.ctrlKey) return;
      if (shiftKey && !event.shiftKey) return;
      if (altKey && !event.altKey) return;

      // Check if we're in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      event.preventDefault();
      callback();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, metaKey, ctrlKey, shiftKey, altKey, callback, enabled]);
}

// Convenience hook for search shortcut (Cmd+K or Ctrl+K)
export function useSearchShortcut(callback: () => void, enabled = true) {
  useKeyboardShortcut({
    key: 'k',
    metaKey: true,
    callback,
    enabled
  });

  useKeyboardShortcut({
    key: 'k',
    ctrlKey: true,
    callback,
    enabled
  });
} 