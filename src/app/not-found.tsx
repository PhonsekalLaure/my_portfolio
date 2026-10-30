import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main-content" className="container not-found">
      <p className="eyebrow">
        <span />
        404 / A small detour
      </p>
      <h1>
        This page isn’t
        <br />
        <span className="muted-heading">part of the plan.</span>
      </h1>
      <p>The page you’re looking for doesn’t exist or hasn’t been published.</p>
      <Link href="/" className="button button-primary">
        Back to the portfolio
        <Icon name="arrow" size={18} />
      </Link>
    </main>
  );
}
