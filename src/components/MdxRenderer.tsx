import { MDXRemote } from "next-mdx-remote/rsc";

export function MdxRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} />;
}
