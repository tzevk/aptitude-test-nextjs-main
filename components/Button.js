// components/Button.js
import React from "react";
import { palette } from "../../ui/colors";

export default function Button({ children, variant = "primary", ...props }) {
  let bg, color;
  switch (variant) {
    case "secondary":
      bg = palette.secondary;
      color = palette.onSecondary;
      break;
    case "accent":
      bg = palette.accent;
      color = palette.onAccent;
      break;
    case "white":
      bg = palette.white;
      color = palette.onWhite;
      break;
    case "primary":
    default:
      bg = palette.primary;
      color = palette.onPrimary;
  }

  const style = {
    backgroundColor: bg,
    color,
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
  };

  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
}