const salas = [
  {
    nombre: "El sotano maldito",
    descripcion:
      "Una habitacion cerrada, una cuenta atras y pistas escondidas por todas partes.",
    hora: "18:00",
  },
  {
    nombre: "Laboratorio secreto",
    descripcion:
      "Descubre que experimento salio mal antes de que se bloquee la salida.",
    hora: "20:00",
  },
  {
    nombre: "Hotel abandonado",
    descripcion:
      "Investiga la desaparicion del ultimo huesped y encuentra la llave final.",
    hora: "22:00",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Escape Room</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Elige una sala, revisa la descripcion y reserva la hora que mejor te
          encaje.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {salas.map((sala) => (
            <article
              key={sala.nombre}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold">{sala.nombre}</h2>
                <span className="rounded bg-amber-400 px-2 py-1 text-sm font-bold text-zinc-950">
                  {sala.hora}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                {sala.descripcion}
              </p>
              <form action="/api/checkout" method="post">
                <input type="hidden" name="nombre" value={sala.nombre} />
                <button
                  type="submit"
                  className="mt-5 w-full rounded bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-amber-300"
                >
                  Reservar
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
