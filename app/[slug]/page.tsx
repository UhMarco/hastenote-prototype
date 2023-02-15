import { notFound } from "next/navigation";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

async function getContent(slug: string) {
  const res = await fetch(`${process.env.BASE_FETCH_URL}/api/notes/get/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store"
  });
  const data = await res.json();
  return data?.content as string;
}

export default async function NotePage({ params }: any) {
  const content = await getContent(params.slug);

  if (!content) notFound();

  return (
    <MarkdownPreview content={content} />
  );
}
