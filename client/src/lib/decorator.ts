export type DecorationStyle =
  | "dark-vector"
  | "kaomoji"
  | "regal"
  | "chaos"
  | "minimal"
  | "custom";

export interface CustomDecoration {
  topBorder: string;
  bottomBorder: string;
  linePrefix: string;
  lineSuffix: string;
}

const PRESETS: Record<string, CustomDecoration> = {
  "dark-vector": {
    topBorder:    "╔══════════════════════════╗",
    bottomBorder: "╚══════════════════════════╝",
    linePrefix:   "║  ",
    lineSuffix:   "  ║",
  },
  kaomoji: {
    topBorder:    "꒰ ˘ ³˘ ꒱  ·  ·  ·",
    bottomBorder: "· · · ·  ꒰ᵕ̈꒱∗*゚",
    linePrefix:   "  ☆ ",
    lineSuffix:   "",
  },
  regal: {
    topBorder:    "⸻⸺  ✦  ⸺⸻",
    bottomBorder: "⸻⸺  ✦  ⸺⸻",
    linePrefix:   "    ",
    lineSuffix:   "",
  },
  chaos: {
    topBorder:    "▓▒░ !!!  ░▒▓",
    bottomBorder: "▓▒░ !!!  ░▒▓",
    linePrefix:   "⚡ ",
    lineSuffix:   " ⚡",
  },
  minimal: {
    topBorder:    "─────────────",
    bottomBorder: "─────────────",
    linePrefix:   "  ",
    lineSuffix:   "",
  },
};

export function decorate(
  text: string,
  style: DecorationStyle,
  custom?: CustomDecoration
): string {
  const preset = style === "custom" && custom ? custom : PRESETS[style] ?? PRESETS["minimal"];
  const lines = text.split("\n").map(line => `${preset.linePrefix}${line}${preset.lineSuffix}`);
  return [preset.topBorder, ...lines, preset.bottomBorder].join("\n");
}
