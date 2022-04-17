/// <reference lib="DOM" />

import { SVG } from "@svgdotjs/svg.js";

export interface IMakeLinesSVGOptions {
  lineWidth: number;
}

export const makeLinesSVG = (n: number, width: number, lineHeight: number, options?: IMakeLinesSVGOptions): SVGElement => {
  const lineWidth = options?.lineWidth || 1;
  const totalHeight = n * lineHeight + n * lineWidth - n;

  const draw = SVG().size(width, totalHeight);

  for (let i = 0; i < n; i++) {
    const y = lineHeight + i * lineHeight - 1;
    draw.line(0, y, width, y).stroke({ width: lineWidth, color: "#000" });
  }

  return draw.node;
}

export const toPixel = (s: string): number => {
  const [, num, units] = /^(\d+(?:\.\d+)?)(.{2})$/.exec(s) || [];

  switch (units) {
    case "px":
    default:
      return parseFloat(num);
  }
}

export const formatMoney = (cents, formatString = "${{amount}}") => {
  if (isNaN(cents)) return "NaN";
  if (typeof cents == "string") {
    cents = cents.replace(".", "");
  }
  let value = "";
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

  const defaultOption = (opt, def) => {
    return typeof opt == "undefined" ? def : opt;
  };

  const formatWithDelimiters = (
    number: number,
    precision: number,
    thousands?: string,
    decimal?: string
  ): string => {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");

    if (isNaN(number) || number == null) {
      return "0";
    }

    const numStr = (number / 100.0).toFixed(precision);

    const parts = numStr.split(".");
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1" + thousands
    );
    const cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  };

  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }

  return formatString.replace(placeholderRegex, value);
};