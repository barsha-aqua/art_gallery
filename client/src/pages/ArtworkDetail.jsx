import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/artworks/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error("Artwork not found");
          throw new Error("Failed to fetch artwork");
        }
        return res.json();
      })
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 text-stone-400 min-h-[60vh]">
        Loading artwork details...
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="flex justify-center items-center py-32 text-red-400 min-h-[60vh]">
        {error || "Something went wrong."}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left: Image */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-md bg-stone-100">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right: Details & Auction */}
        <div className="w-full lg:w-1/2 flex flex-col">
          
          <div className="mb-10">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
              From the Selected Works Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-8">
              {artwork.title}
            </h1>

            {/* Metadata Row */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-6 mb-8 text-sm">
              <div>
                <p className="font-semibold text-stone-600 mb-1">Medium</p>
                <p className="text-stone-500">{artwork.medium || "Mixed Media"}</p>
              </div>
              <div>
                <p className="font-semibold text-stone-600 mb-1">Dimensions</p>
                <p className="text-stone-500">{artwork.dimensions || "Variable"}</p>
              </div>
              <div>
                <p className="font-semibold text-stone-600 mb-1">Year</p>
                <p className="text-stone-500">{artwork.yearCreated || new Date(artwork.createdAt).getFullYear()}</p>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed">
              {artwork.description ||
                "Drawing inspiration from quiet moments, this piece captures a fleeting transition of light. The artist utilizes organic warmth and layered textures to evoke a sense of calm exploration, inviting the viewer to pause and reflect within the silent spaces of the composition."}
            </p>
          </div>

          {/* Auction Card (Conditional) */}
          {artwork.auction && (
            <div className="bg-white rounded-2xl shadow-sm border-l-4 border-terracotta p-8 mt-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">
                    Current Highest Bid
                  </p>
                  <p className="text-4xl font-serif text-stone-800">
                    ${artwork.auction.currentHighestBid || artwork.auction.reservePrice}
                  </p>
                  <p className="text-sm text-stone-500 mt-2">
                    Reserve: ${artwork.auction.reservePrice}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-terracotta flex items-center justify-end gap-1 mb-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ends In
                  </p>
                  <p className="text-lg font-serif text-stone-800">3d 14h 22m</p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-700 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-700 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
                />
                <div className="relative">
                  <span className="absolute left-0 top-3 text-stone-400">$</span>
                  <input
                    type="number"
                    placeholder="Offer Amount"
                    className="w-full border-b border-stone-200 py-3 pl-4 bg-transparent text-stone-700 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
                  />
                </div>
                
                <button
                  type="button"
                  className="w-full bg-[#9c4a35] hover:bg-terracotta text-white font-medium py-4 rounded-lg mt-6 flex items-center justify-center gap-2 transition-colors"
                >
                  Place Bid <span>&rarr;</span>
                </button>
                <p className="text-[10px] text-stone-400 text-center font-medium uppercase tracking-wider mt-4">
                  By placing a bid, you agree to our Terms of Auction.
                </p>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
