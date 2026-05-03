import { getLocaleFromCookie, pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const m = pageMeta[getLocaleFromCookie()].verify;
  return { title: m.title, description: m.description };
}

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
