import twColors from "tailwindcss/colors";
import type {
  ResolvableTo,
  RecursiveKeyValuePair,
} from "tailwindcss/types/config";

export const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
  ...twColors,
  color: {
    primary: twColors.indigo[700],
    secondary: twColors.pink[600],
    info: twColors.sky[500],
    success: twColors.lime[600],
    warning: twColors.amber[500],
    danger: twColors.rose[700],
    light: twColors.slate[500],
    dark: twColors.slate[800],

    border: twColors.slate[200],
    "border-dark": twColors.slate[400],

    "checkbox-checked": twColors.lime[600],

    "text-primary": twColors.slate[500],
    "text-light": twColors.slate[100],
  },
};

export const container = {
  center: true,
};
