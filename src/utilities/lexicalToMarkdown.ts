import { Product } from "@/payload-types";

type Node = {
  type: string;
  children?: Node[];
  [key: string]: any;
};

function nodeToMarkdown(node: Node): string {
  switch (node.type) {
    case "heading":
      const level = node.tag === "h1" ? 1 : 2;
      return `${"#".repeat(level)} ${node.children
        ?.map(nodeToMarkdown)
        .join("")}\n`;
    case "list":
      return node.children?.map(nodeToMarkdown).join("") || "";
    case "listitem":
      return `- ${node.children?.map(nodeToMarkdown).join("")}\n`;
    case "paragraph":
      return `${node.children?.map(nodeToMarkdown).join("")}\n`;
    case "text":
      let text = node.text;
      if (node.bold) {
        text = `**${text}**`;
      }
      if (node.italic) {
        text = `*${text}*`;
      }
      return text;
    case "link":
      return `[${node.children
        ?.map(nodeToMarkdown)
        .join("")}](${node.fields.url})`;
    default:
      return node.children?.map(nodeToMarkdown).join("") || "";
  }
}

export function lexicalToMarkdown(
  customMdx: Product["customMdx"]
): string {
  if (!customMdx || !customMdx.root || !customMdx.root.children) {
    return "";
  }
  return customMdx.root.children.map(nodeToMarkdown).join("\n");
}
