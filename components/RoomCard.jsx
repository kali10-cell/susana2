const planes = [
  {
    id: "standard",
    nombre: "Standard",
    precio: "9 EUR",
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: "19 EUR",
  },
];

export default function RoomCard({ sala }) {
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

      <div className="mt-5 space-y-3">
        {planes.map((plan) => (
          <form key={plan.id} action="/api/checkout" method="post">
            <input type="hidden" name="sala" value={sala.nombre} />
            <input type="hidden" name="plan" value={plan.id} />
            <button
              type="submit"
              className="flex w-full items-center justify-between rounded bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
            >
              <span>{plan.nombre}</span>
              <span>{plan.precio}</span>
            </button>
          </form>
        ))}
      </div>
    </article>
  );
}
