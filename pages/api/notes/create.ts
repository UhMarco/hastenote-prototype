import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/client";
import { generate } from "randomstring";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // I can increase the length of slugs if demand needs.
    // For now we have just under a billion combinations so I'd say we're covered for a while.
    let slug;
    while (true) {
      slug = generate(10);
      const { data, error } = await supabase.from("notes").select("slug").eq("slug", slug);
      if (error) return res.status(500);
      if (!data.length) break;
    }
    const { error } = await supabase.from("notes").insert({ content: req.body, slug: slug });
    if (error) return res.status(500);
    res.status(200).json({ slug: slug });
  } else {
    res.status(405).json({ message: "Method not allowed" });;
  }
};
