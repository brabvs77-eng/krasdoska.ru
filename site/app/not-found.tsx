import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-neutral-600">Страница не найдена</p>
      <Link href="/" className="btn-primary mt-8 inline-flex">
        На главную
      </Link>
    </div>
  );
}
