import { useState, useEffect, useCallback } from "react";
import AdminNav from "../components/AdminNav";

const API_URL = "http://localhost:5000/api";

export default function AdminDashboard() {
  // ── Upload Artwork state ──
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [yearCreated, setYearCreated] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Start Auction state ──
  const [artworks, setArtworks] = useState([]);
  const [artworksLoading, setArtworksLoading] = useState(true);
  const [selectedArtworkId, setSelectedArtworkId] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [durationDays, setDurationDays] = useState("30");
  const [auctionMessage, setAuctionMessage] = useState("");
  const [auctionError, setAuctionError] = useState("");
  const [auctionLoading, setAuctionLoading] = useState(false);

  // ── Self-Portrait state ──
  const [portraitCaption, setPortraitCaption] = useState("");
  const [portraitFile, setPortraitFile] = useState(null);
  const [portraitMessage, setPortraitMessage] = useState("");
  const [portraitError, setPortraitError] = useState("");
  const [portraitLoading, setPortraitLoading] = useState(false);

  // ── Poem state ──
  const [poemTitle, setPoemTitle] = useState("");
  const [poemContent, setPoemContent] = useState("");
  const [poemMessage, setPoemMessage] = useState("");
  const [poemError, setPoemError] = useState("");
  const [poemLoading, setPoemLoading] = useState(false);

  const fetchArtworks = useCallback(async () => {
    setArtworksLoading(true);
    try {
      const res = await fetch(`${API_URL}/artworks`);
      if (!res.ok) throw new Error("Failed to fetch artworks");
      const data = await res.json();
      const available = data.filter(
        (a) => !a.auction && a.status !== "in_auction",
      );
      setArtworks(available);
    } catch (err) {
      console.error("Error loading artworks:", err);
    } finally {
      setArtworksLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!imageFile) {
      setError("Please choose an image file.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("medium", medium);
      formData.append("dimensions", dimensions);
      formData.append("yearCreated", yearCreated);
      formData.append("image", imageFile);

      const res = await fetch(`${API_URL}/artworks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage(`"${data.title}" uploaded successfully!`);
      setTitle("");
      setDescription("");
      setMedium("");
      setDimensions("");
      setYearCreated("");
      setImageFile(null);
      e.target.reset();

      fetchArtworks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAuctionSubmit(e) {
    e.preventDefault();
    setAuctionError("");
    setAuctionMessage("");

    if (!selectedArtworkId) {
      setAuctionError("Please select an artwork.");
      return;
    }
    if (!reservePrice || Number(reservePrice) <= 0) {
      setAuctionError("Please enter a valid reserve price.");
      return;
    }

    setAuctionLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("No admin token found. Please log in again.");
      }

      const body = {
        artworkId: Number(selectedArtworkId),
        reservePrice: Number(reservePrice),
        durationDays: Number(durationDays) || 30,
      };

      const res = await fetch(`${API_URL}/auctions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error(
            (data.error || "Unauthorized") +
              " — your session may have expired. Please log in again.",
          );
        }
        throw new Error(data.error || "Failed to start auction");
      }

      setAuctionMessage("Auction started successfully!");
      setSelectedArtworkId("");
      setReservePrice("");
      setDurationDays("30");

      fetchArtworks();
    } catch (err) {
      setAuctionError(err.message);
    } finally {
      setAuctionLoading(false);
    }
  }

  async function handlePortraitSubmit(e) {
    e.preventDefault();
    setPortraitError("");
    setPortraitMessage("");

    if (!portraitFile) {
      setPortraitError("Please choose an image file.");
      return;
    }

    setPortraitLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      formData.append("caption", portraitCaption);
      formData.append("image", portraitFile);

      const res = await fetch(`${API_URL}/portraits`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setPortraitMessage("Portrait uploaded successfully!");
      setPortraitCaption("");
      setPortraitFile(null);
      e.target.reset();
    } catch (err) {
      setPortraitError(err.message);
    } finally {
      setPortraitLoading(false);
    }
  }

  async function handlePoemSubmit(e) {
    e.preventDefault();
    setPoemError("");
    setPoemMessage("");

    if (!poemTitle || !poemContent) {
      setPoemError("Please fill in both title and content.");
      return;
    }

    setPoemLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_URL}/poems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: poemTitle, content: poemContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add poem");
      }

      setPoemMessage(`"${data.title}" added successfully!`);
      setPoemTitle("");
      setPoemContent("");
    } catch (err) {
      setPoemError(err.message);
    } finally {
      setPoemLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav />
      <div className="p-10">
        {/* SECTION 1: Upload New Artwork */}
        <h1 className="font-serif text-2xl text-stone-800 mb-6">
          Upload New Artwork
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-sm max-w-md space-y-4"
        >
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm text-stone-600 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-stone-600 mb-1">
                Medium
              </label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-stone-600 mb-1">
                Dimensions
              </label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Year Created
            </label>
            <input
              type="number"
              value={yearCreated}
              onChange={(e) => setYearCreated(e.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-800 text-white py-2 rounded text-sm font-medium hover:bg-orange-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Artwork"}
          </button>
        </form>

        {/* SECTION 2: Start an Auction */}
        <h2 className="font-serif text-2xl text-stone-800 mt-14 mb-6">
          Start an Auction
        </h2>

        <form
          onSubmit={handleAuctionSubmit}
          className="bg-white p-6 rounded-lg shadow-sm max-w-md space-y-4"
        >
          {auctionMessage && (
            <p className="text-green-600 text-sm">{auctionMessage}</p>
          )}
          {auctionError && (
            <p className="text-red-500 text-sm">{auctionError}</p>
          )}

          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Artwork *
            </label>
            {artworksLoading ? (
              <p className="text-xs text-stone-400">Loading artworks…</p>
            ) : artworks.length === 0 ? (
              <p className="text-xs text-stone-400 italic">
                No artworks available for auction.
              </p>
            ) : (
              <select
                value={selectedArtworkId}
                onChange={(e) => setSelectedArtworkId(e.target.value)}
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm bg-white"
                required
              >
                <option value="">— Select an artwork —</option>
                {artworks.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-stone-600 mb-1">
                Reserve Price ($) *
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={reservePrice}
                onChange={(e) => setReservePrice(e.target.value)}
                placeholder="e.g. 500"
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-stone-600 mb-1">
                Duration (days)
              </label>
              <input
                type="number"
                min="1"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={auctionLoading || artworks.length === 0}
            className="w-full bg-orange-800 text-white py-2 rounded text-sm font-medium hover:bg-orange-900 transition-colors disabled:opacity-50"
          >
            {auctionLoading ? "Starting Auction..." : "Start Auction"}
          </button>
        </form>

        {/* SECTION 3: Upload Self-Portrait */}
        <h2 className="font-serif text-2xl text-stone-800 mt-14 mb-6">
          Upload Self-Portrait
        </h2>

        <form
          onSubmit={handlePortraitSubmit}
          className="bg-white p-6 rounded-lg shadow-sm max-w-md space-y-4"
        >
          {portraitMessage && (
            <p className="text-green-600 text-sm">{portraitMessage}</p>
          )}
          {portraitError && (
            <p className="text-red-500 text-sm">{portraitError}</p>
          )}

          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Caption (optional)
            </label>
            <input
              type="text"
              value={portraitCaption}
              onChange={(e) => setPortraitCaption(e.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPortraitFile(e.target.files[0])}
              className="w-full text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={portraitLoading}
            className="w-full bg-orange-800 text-white py-2 rounded text-sm font-medium hover:bg-orange-900 transition-colors disabled:opacity-50"
          >
            {portraitLoading ? "Uploading..." : "Upload Portrait"}
          </button>
        </form>

        {/* SECTION 4: Add a Poem */}
        <h2 className="font-serif text-2xl text-stone-800 mt-14 mb-6">
          Add a Poem
        </h2>

        <form
          onSubmit={handlePoemSubmit}
          className="bg-white p-6 rounded-lg shadow-sm max-w-md space-y-4"
        >
          {poemMessage && (
            <p className="text-green-600 text-sm">{poemMessage}</p>
          )}
          {poemError && <p className="text-red-500 text-sm">{poemError}</p>}

          <div>
            <label className="block text-sm text-stone-600 mb-1">Title *</label>
            <input
              type="text"
              value={poemTitle}
              onChange={(e) => setPoemTitle(e.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Content *
            </label>
            <textarea
              value={poemContent}
              onChange={(e) => setPoemContent(e.target.value)}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
              rows={8}
              placeholder="Line breaks are preserved..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={poemLoading}
            className="w-full bg-orange-800 text-white py-2 rounded text-sm font-medium hover:bg-orange-900 transition-colors disabled:opacity-50"
          >
            {poemLoading ? "Adding..." : "Add Poem"}
          </button>
        </form>
      </div>
    </div>
  );
}
