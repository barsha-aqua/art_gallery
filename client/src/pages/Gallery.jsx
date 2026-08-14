import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/artworks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artworks");
        return res.json();
      })
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load artworks.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-4 font-semibold">
          Selected Works
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          A curation of recent explorations in texture and light.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20 text-stone-500">
          Loading gallery...
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && artworks.length === 0 && (
        <div className="flex justify-center items-center py-20 text-stone-500">
          No artworks currently available.
        </div>
      )}

      {!loading && !error && artworks.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              to={`/artwork/${artwork.id}`}
              className="block break-inside-avoid rounded-xl bg-white p-2.5 shadow-[0_4px_16px_rgba(90,60,40,0.10),0_1px_3px_rgba(90,60,40,0.06)] hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative group overflow-hidden rounded-md">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-xl mb-1">
                    {artwork.title}
                  </h3>
                  <p className="text-stone-300 text-sm">
                    {artwork.medium || "Mixed Media"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
