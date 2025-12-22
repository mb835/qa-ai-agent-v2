export default function CloudWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-3">
      <h2 className="font-semibold">Cloud testy</h2>

      <p className="text-sm">Spuštěno na BrowserStack</p>

      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-500 rounded w-2/3"></div>
      </div>

      <p className="text-xs text-gray-500">12 / 18 testů</p>
    </div>
  );
}
