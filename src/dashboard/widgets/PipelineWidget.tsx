export default function PipelineWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-3">
      <h2 className="font-semibold">Stav pipeline</h2>

      <div className="flex gap-2">
        <Button label="Commit" />
        <Button label="CI" />
        <Button label="Testy" danger />
        <Button label="Nasazení" />
      </div>

      <p className="text-sm text-gray-600">
        Poslední běh: <b>28 úspěšných</b>, <b className="text-red-600">1 neúspěšný</b>
      </p>
    </div>
  );
}

function Button({ label, danger }: { label: string; danger?: boolean }) {
  return (
    <button
      className={`px-3 py-1 rounded text-sm text-white ${
        danger ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {label}
    </button>
  );
}
