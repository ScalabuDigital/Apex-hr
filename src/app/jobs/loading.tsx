import { Container } from "@/components/layout/container";

export default function JobsLoading() {
  return (
    <main aria-busy="true" aria-label="Loading Job Board" className="bg-navy pb-20">
      <Container size="wide" className="pt-12">
        <div className="mt-16 h-4 w-36 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
        <div className="mt-6 h-14 max-w-3xl animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
        <div className="mt-3 h-14 max-w-xl animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
        <div className="mt-14 grid gap-3 md:grid-cols-[1.3fr_1fr_1fr] md:gap-6">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-12 animate-pulse rounded-md border border-white/15 bg-white/5 motion-reduce:animate-none" />
          ))}
        </div>
        <p role="status" className="mt-10 text-body text-white/70">Loading current vacancies…</p>
      </Container>
    </main>
  );
}
