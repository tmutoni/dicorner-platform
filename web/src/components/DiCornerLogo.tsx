import Link from "next/link";

export default function DiCornerLogo() {
  return (
    <Link href="/landing-v3" className="text-xl font-bold text-gray-900">
      Di<span className="text-blue-600">Corner</span>
    </Link>
  );
}
