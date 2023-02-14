import MarkdownPreview from "@/components/markdown/MarkdownPreview";

async function getContent(slug: string): Promise<string> {
  const response = await fetch(`${process.env.BASE_FETCH_URL}/api/notes/get/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  switch (response.status) {
    case 200:
      const data = await response.json();
      return data.content;
    case 404:
      // Redirect to 404
      return "";
  }
  // Redirect to something went wrong
  return "# Something went wrong!";
}

export default async function NotePage({ params }: any) {
  const content = await getContent(params.slug);

  return (
    <MarkdownPreview content={content || "# Something went wrong..."} />
  );
}
