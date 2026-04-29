import { redirect } from "next/navigation";

// The story generation happens directly on the home page via streaming.
// This route exists for backwards-compat deep links.
export default function GeneratePage() {
  redirect("/");
}
