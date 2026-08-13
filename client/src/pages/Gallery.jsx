import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/artworks")
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
        <div className="flex justify-center items-center py-20 text-stone-400">
          Loading gallery...
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && artworks.length === 0 && (
        <div className="flex justify-center items-center py-20 text-stone-400">
          No artworks currently available.
        </div>
      )}

      {!loading && !error && artworks.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              to={`/artwork/${artwork.id}`}
              className="block relative group break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-stone-100"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-serif text-xl mb-1">
                  {artwork.title}
                </h3>
                <p className="text-stone-200 text-sm">
                  {artwork.medium || "Mixed Media"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
