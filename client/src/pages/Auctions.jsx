import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getTimeRemaining(endsAt) {
  if (!endsAt) return null;
  const diff = new Date(endsAt) - new Date();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  if (days > 0) return `${days}d ${hours}h left`;
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours}h ${mins}m left`;
}

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/artworks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artworks");
        return res.json();
      })
      .then((data) => {
        const open = data.filter(
          (a) => a.auction && a.auction.status === "open",
        );
        setAuctions(open);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load auctions.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-4 font-semibold">
          Active Auctions
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Place your bid on one-of-a-kind pieces before time runs out.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20 text-stone-400">
          Loading auctions...
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && auctions.length === 0 && (
        <div className="flex flex-col justify-center items-center py-20 text-stone-400">
          <p className="font-serif text-xl text-stone-500 mb-2">
            No active auctions right now
          </p>
          <p className="text-sm">
            Check back soon — new pieces go live regularly.
          </p>
        </div>
      )}

      {!loading && !error && auctions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((artwork) => {
            const bid =
              artwork.auction.currentHighestBid || artwork.auction.reservePrice;
            const timeLeft = getTimeRemaining(artwork.auction.endsAt);

            return (
              <Link
                key={artwork.id}
                to={`/artwork/${artwork.id}`}
                className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-semibold text-terracotta px-3 py-1 rounded-full shadow-sm">
                    {timeLeft}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg text-stone-800 mb-1 group-hover:text-terracotta transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">
                    {artwork.medium || "Mixed Media"}
                  </p>
                  <div className="flex items-baseline justify-between border-t border-stone-100 pt-3">
                    <div>
                      <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                        Current Bid
                      </p>
                      <p className="text-xl font-serif text-stone-800">
                        ${bid}
                      </p>
                    </div>
                    <span className="text-xs text-terracotta font-medium group-hover:translate-x-1 transition-transform">
                      Bid now &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
