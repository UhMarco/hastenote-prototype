import { useState } from "react";

export const barModes = ["upload", "register", "signin"] as const;
export type BarMode = typeof barModes[number];

export default function SideBar({ mode }: { mode: BarMode; }) {
  const [open, setOpen] = useState(false);

  return (
    <div>SideBar</div>
  );
}
