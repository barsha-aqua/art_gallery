import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

function getDaysRemaining(endsAt) {
  if (!endsAt) return null;
  const diff = new Date(endsAt) - new Date();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  if (days > 0) return `${days}d ${hours}h remaining`;
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours}h ${mins}m remaining`;
}

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Bid form state ──
  const [bidderName, setBidderName] = useState("");
  const [bidderEmail, setBidderEmail] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidLoading, setBidLoading] = useState(false);
  const [bidSuccess, setBidSuccess] = useState("");
  const [bidError, setBidError] = useState("");

  // ── Collapsible auction state ──
  const [auctionOpen, setAuctionOpen] = useState(false);
  const auctionContentRef = useRef(null);

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

  async function handleBidSubmit(e) {
    e.preventDefault();
    setBidError("");
    setBidSuccess("");

    if (!bidderName.trim() || !bidderEmail.trim() || !bidAmount) {
      setBidError("Please fill in all fields.");
      return;
    }

    setBidLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/auctions/${artwork.auction.id}/bid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bidderName: bidderName.trim(),
            bidderEmail: bidderEmail.trim(),
            amount: Number(bidAmount),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place bid");
      }

      // Update the displayed highest bid without a full page refresh
      setArtwork((prev) => ({
        ...prev,
        auction: {
          ...prev.auction,
          currentHighestBid: Number(bidAmount),
        },
      }));

      setBidSuccess("Your bid has been placed!");
      setBidderName("");
      setBidderEmail("");
      setBidAmount("");
    } catch (err) {
      setBidError(err.message);
    } finally {
      setBidLoading(false);
    }
  }

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

  const auction = artwork.auction;
  const isAuctionOpen = auction && auction.status === "open";
  const displayedBid = auction
    ? auction.currentHighestBid || auction.reservePrice
    : null;
  const timeRemaining = auction ? getDaysRemaining(auction.endsAt) : null;

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

          {/* Auction toggle — only when auction exists and is open */}
          {isAuctionOpen && (
            <div className="mt-2">
              {/* Subtle toggle pill */}
              <button
                type="button"
                onClick={() => setAuctionOpen((v) => !v)}
                className="inline-flex items-center gap-2 border border-terracotta/60 text-terracotta text-sm font-medium px-5 py-2.5 rounded-full hover:bg-terracotta/5 transition-colors"
              >
                Buy this art at auction
                <span
                  className="inline-block transition-transform duration-300"
                  style={{ transform: auctionOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  &rarr;
                </span>
              </button>

              {/* Collapsible auction card */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: auctionOpen
                    ? `${auctionContentRef.current?.scrollHeight || 800}px`
                    : "0px",
                  opacity: auctionOpen ? 1 : 0,
                }}
              >
                <div ref={auctionContentRef} className="pt-6">
                  <div className="bg-white rounded-2xl shadow-sm border-l-4 border-terracotta p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">
                          Current Highest Bid
                        </p>
                        <p className="text-4xl font-serif text-stone-800">
                          ${displayedBid}
                        </p>
                        <p className="text-sm text-stone-500 mt-2">
                          Reserve: ${auction.reservePrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-terracotta flex items-center justify-end gap-1 mb-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Ends In
                        </p>
                        <p className="text-lg font-serif text-stone-800">
                          {timeRemaining}
                        </p>
                      </div>
                    </div>

                    {/* Bid feedback messages */}
                    {bidSuccess && (
                      <p className="text-green-600 text-sm mb-4">{bidSuccess}</p>
                    )}
                    {bidError && (
                      <p className="text-red-500 text-sm mb-4">{bidError}</p>
                    )}

                    <form className="space-y-4" onSubmit={handleBidSubmit}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={bidderName}
                        onChange={(e) => setBidderName(e.target.value)}
                        required
                        className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-700 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={bidderEmail}
                        onChange={(e) => setBidderEmail(e.target.value)}
                        required
                        className="w-full border-b border-stone-200 py-3 bg-transparent text-stone-700 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
                      />
                      <div className="relative">
                        <span className="absolute left-0 top-3 text-stone-400">$</span>
                        <input
                          type="number"
                          placeholder="Offer Amount"
                          min="1"
                          step="0.01"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          required
                          className="w-full border-b border-stone-200 py-3 pl-4 bg-transparent text-stone-700 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={bidLoading}
                        className="w-full bg-[#9c4a35] hover:bg-terracotta text-white font-medium py-4 rounded-lg mt-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {bidLoading ? "Placing Bid..." : <>Place Bid <span>&rarr;</span></>}
                      </button>
                      <p className="text-[10px] text-stone-400 text-center font-medium uppercase tracking-wider mt-4">
                        By placing a bid, you agree to our{" "}
                        <Link to="/terms" className="underline underline-offset-2 hover:text-terracotta transition-colors">
                          Terms of Auction
                        </Link>.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
