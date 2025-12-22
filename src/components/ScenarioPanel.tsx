export function ScenarioPanel() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Generování testovacích scénářů
      </h2>

      <textarea
        className="
          w-full h-28 p-3 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          resize-none
        "
        placeholder="Popiš testovací záměr…"
      />

      <button
        className="
          mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg
          hover:bg-blue-700 active:scale-95
          shadow hover:shadow-lg
        "
      >
        Vygenerovat scénáře
      </button>

      <div className="flex gap-2 mt-4">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Happy Path
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Edge Cases
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Negative Tests
        </button>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        <li className="flex items-center gap-2 text-green-700">
          ✓ Uživatel se úspěšně přihlásí
        </li>
        <li className="flex items-center gap-2 text-green-700">
          ✓ Neplatné heslo zobrazí chybu
        </li>
        <li className="flex items-center gap-2 text-green-700">
          ✓ Uzamčený účet je zablokován
        </li>
      </ul>
    </div>
  );
}
