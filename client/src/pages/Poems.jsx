import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Poems() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPoem, setSelectedPoem] = useState(null);

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
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-4 font-semibold">
          Poems
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Words that didn't fit on canvas.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20 text-stone-400">
          Loading...
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && poems.length === 0 && (
        <div className="flex justify-center items-center py-20 text-stone-400">
          No poems yet.
        </div>
      )}

      {!loading && !error && poems.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {poems.map((poem) => (
            <button
              key={poem.id}
              onClick={() => setSelectedPoem(poem)}
              className="block w-full text-left break-inside-avoid rounded-xl bg-white p-2.5 shadow-[0_4px_16px_rgba(90,60,40,0.10),0_1px_3px_rgba(90,60,40,0.06)] hover:shadow-md transition-shadow duration-300 mb-6"
            >
              <div className="bg-[#F3E9DC] rounded-md p-6">
                <h2
                  className="text-xl text-stone-800 mb-4"
                  style={{ fontFamily: "var(--font-poem)" }}
                >
                  {poem.title}
                </h2>
                <p
                  className="text-stone-600 text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-poem)",
                    whiteSpace: "pre-line",
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {poem.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPoem && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPoem(null)}
        >
          <div
            className="bg-[#F3E9DC] rounded-lg shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPoem(null)}
              className="absolute top-4 right-5 text-stone-400 hover:text-terracotta text-2xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h2
              className="text-2xl text-stone-800 mb-6 text-center"
              style={{ fontFamily: "var(--font-poem)" }}
            >
              {selectedPoem.title}
            </h2>
            <p
              className="text-stone-700 text-base leading-loose text-center"
              style={{
                fontFamily: "var(--font-poem)",
                whiteSpace: "pre-line",
              }}
            >
              {selectedPoem.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
