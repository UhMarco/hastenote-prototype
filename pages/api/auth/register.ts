import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
      options: {
        data: {
          username: req.body.username,
          pro: false
        }
      }
    });
    if (error) console.log(error);
    if (error) return res.status(500).json(error);
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });;
  }
};
