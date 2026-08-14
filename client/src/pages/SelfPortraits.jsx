import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

export default function SelfPortraits() {
  const [portraits, setPortraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/portraits`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch portraits");
        return res.json();
      })
      .then((data) => {
        setPortraits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load portraits.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-4 font-semibold">
          Self Portraits
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          A visual diary — moments, faces, and reflections.
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

      {!loading && !error && portraits.length === 0 && (
        <div className="flex justify-center items-center py-20 text-stone-500">
          No portraits yet.
        </div>
      )}

      {!loading && !error && portraits.length > 0 && (
        <div className="space-y-16">
          {portraits.map((portrait) => (
            <div
              key={portrait.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              <img
                src={portrait.imageUrl}
                alt={portrait.caption || "Self portrait"}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {portrait.caption && (
                <p className="text-stone-600 text-base text-center py-4 px-4 font-serif italic">
                  {portrait.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
