import { useState } from "react";

const API_URL = "http://localhost:5000/api";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [yearCreated, setYearCreated] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 p-10">
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
            <label className="block text-sm text-stone-600 mb-1">Medium</label>
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
    </div>
  );
}
