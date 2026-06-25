
"use client";

import { useState } from "react";

export default function RoomCard({ sala }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: sala.nombre }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "No se pudo abrir Stripe.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError.message);
      setLoading(false);
    }
  }

  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold">{sala.nombre}</h2>
        <span className="rounded bg-amber-400 px-2 py-1 text-sm font-bold text-zinc-950">
          {sala.hora}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-300">
        {sala.descripcion}
      </p>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="mt-5 w-full rounded bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Abriendo Stripe..." : "Reservar"}
      </button>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
    </article>
  );
}
