import RoomCard from "@/components/RoomCard";

const salas = [
  {
    id: "sotano",
    nombre: "El sotano maldito",
    descripcion:
      "Una habitacion cerrada, una cuenta atras y pistas escondidas por todas partes.",
    hora: "18:00",
  },
  {
    id: "laboratorio",
    nombre: "Laboratorio secreto",
    descripcion:
      "Descubre que experimento salio mal antes de que se bloquee la salida.",
    hora: "20:00",
  },
  {
    id: "hotel",
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
            <RoomCard key={sala.id} sala={sala} />
          ))}
        </div>
      </section>
    </main>
  );
}
