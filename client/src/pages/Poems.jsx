import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/poems`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch poems");
        return res.json();
      })
      .then((data) => {
        setPoems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load poems.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-4 font-semibold">
          Poems
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Words that didn't fit on canvas.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20 text-stone-500">
          Loading...
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && poems.length === 0 && (
        <div className="flex justify-center items-center py-20 text-stone-500">
          No poems yet.
        </div>
      )}

      {!loading && !error && poems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {poems.map((poem) => (
            <div
              key={poem.id}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <h2 className="font-serif text-xl text-stone-800 mb-4">
                {poem.title}
              </h2>
              <p
                className="text-stone-600 font-serif leading-relaxed text-sm"
                style={{ whiteSpace: "pre-line" }}
              >
                {poem.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
