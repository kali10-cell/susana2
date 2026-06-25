import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f6] px-6 text-[#2d2024]">
      <section className="w-full max-w-xl rounded-[28px] border border-[#ecd5d7] bg-white/90 p-8 shadow-xl shadow-[#e8bbc5]/30">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b08a2e]">
          Pago cancelado
        </p>
        <h1 className="mt-4 [font-family:var(--font-display)] text-5xl font-semibold">
          No se ha realizado ningun cargo
        </h1>
        <p className="mt-4 leading-7 text-zinc-600">
          Has salido de Stripe Checkout antes de completar el pago. Puedes
          intentarlo de nuevo cuando quieras.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[#b56a7f] px-6 text-sm font-semibold text-white transition hover:bg-[#9f5369]"
        >
          Intentar de nuevo
        </Link>
      </section>
    </main>
  );
}
