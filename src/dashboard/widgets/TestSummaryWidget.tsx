export default function TestSummaryWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4">
      <h2 className="font-semibold">Souhrn testů</h2>

      <div className="flex justify-around text-sm">
        <Stat value="28" label="Úspěšné" color="text-green-600" />
        <Stat value="3" label="Neúspěšné" color="text-red-500" />
        <Stat value="2" label="Přeskočené" color="text-yellow-500" />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
