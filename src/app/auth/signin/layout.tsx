import { getLocaleFromCookie, pageMeta } from "@/lib/meta";

export async function generateMetadata() {
  const m = pageMeta[getLocaleFromCookie()].signin;
  return { title: m.title, description: m.description };
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
