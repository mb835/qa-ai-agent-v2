export function PipelineWidget() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg">
      <h3 className="font-semibold mb-3">Stav CI/CD pipeline</h3>

      <div className="flex gap-2 mb-3">
        <span className="bg-green-500 text-white px-3 py-1 rounded">
          Commit
        </span>
        <span className="bg-green-500 text-white px-3 py-1 rounded">
          CI
        </span>
        <span className="bg-red-500 text-white px-3 py-1 rounded">
          Run Tests
        </span>
        <span className="bg-green-500 text-white px-3 py-1 rounded">
          Deploy
        </span>
      </div>

      <p className="text-sm text-gray-600">
        Poslední běh: <b>28 úspěšných</b>, <b>1 neúspěšný</b>
      </p>
    </div>
  );
}
