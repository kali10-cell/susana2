
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
    </article>
  );
}
