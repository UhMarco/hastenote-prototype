import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { data, error } = await supabase.from("notes").select("content").eq("slug", req.query.slug);
    if (error) return res.status(500).json(null);
    if (!data.length) return res.status(404).json(null);
    res.status(200).json(data[0]);
  } else {
    res.status(405).json({ message: "Method not allowed" });;
  }
};
