import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <p className="font-mono text-sm text-graphite">404</p>
        <h1 className="mt-3 max-w-[18ch] text-4xl">No record of this page</h1>
        <p className="mt-5 max-w-[48ch] text-lg text-graphite">
          The link may be old, or the address mistyped. Either way, this page went unrecorded.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <ButtonLink href="/" size="lg">
            Go to the home page
          </ButtonLink>
          <Link href="/product" className="link font-medium">
            See how Shoirly works
          </Link>
        </div>
      </Container>
    </section>
  );
}
