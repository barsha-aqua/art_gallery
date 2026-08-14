import { useEffect, useState, useCallback } from "react";
import AdminNav from "../components/AdminNav";
import heroImage from "../assets/hero_rose_vintage.jpg";

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("adminToken");
}

export default function AdminManage() {
  const [artworks, setArtworks] = useState([]);
  const [portraits, setPortraits] = useState([]);
  const [poems, setPoems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // { type, id, data }
  const [status, setStatus] = useState("");

  const fetchAll = useCallback(async () => {
    try {
      const [a, p, poe] = await Promise.all([
        fetch(`${API_URL}/artworks`).then((r) => r.json()),
        fetch(`${API_URL}/portraits`).then((r) => r.json()),
        fetch(`${API_URL}/poems`).then((r) => r.json()),
      ]);
      setArtworks(a);
      setPortraits(p);
      setPoems(poe);
    } catch (err) {
      console.error("Failed to load content:", err);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function handleDelete(type, id) {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await fetch(`${API_URL}/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }

      setStatus("Deleted successfully.");
      fetchAll();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }

  function startEdit(type, item) {
    setEditingItem({ type, id: item.id, data: { ...item } });
  }

  function cancelEdit() {
    setEditingItem(null);
  }

  async function saveEdit() {
    const { type, id, data } = editingItem;

    let body = {};
    if (type === "artworks") {
      body = {
        title: data.title,
        description: data.description,
        medium: data.medium,
        dimensions: data.dimensions,
        yearCreated: data.yearCreated,
      };
    } else if (type === "portraits") {
      body = { caption: data.caption };
    } else if (type === "poems") {
      body = { title: data.title, content: data.content };
    }

    try {
      const res = await fetch(`${API_URL}/${type}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Update failed");
      }

      setStatus("Updated successfully.");
      setEditingItem(null);
      fetchAll();
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }

  return (
    <div className="min-h-screen bg-canvas font-sans flex flex-col">
      <AdminNav />
      <div
        className="flex-grow relative bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-canvas/70" />
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <h1 className="font-serif text-3xl text-stone-800 mb-2 font-semibold">
            Manage Content
          </h1>
          {status && <p className="text-sm text-stone-500 mb-6">{status}</p>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ── Artworks Column ── */}
            <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-sm border border-stone-200/50 flex flex-col">
              <h2 className="font-serif text-xl text-stone-800 mb-4 pb-2 border-b border-stone-200 font-semibold">
                Artworks
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {artworks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-stone-100 p-4"
                  >
                    {editingItem?.type === "artworks" &&
                    editingItem.id === item.id ? (
                      <div className="space-y-2">
                        <input
                          className="w-full border border-stone-300 rounded px-2 py-1 text-sm bg-white"
                          value={editingItem.data.title || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: {
                                ...editingItem.data,
                                title: e.target.value,
                              },
                            })
                          }
                          placeholder="Title"
                        />
                        <textarea
                          className="w-full border border-stone-300 rounded px-2 py-1 text-sm bg-white"
                          value={editingItem.data.description || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: {
                                ...editingItem.data,
                                description: e.target.value,
                              },
                            })
                          }
                          placeholder="Description"
                          rows={2}
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            className="border border-stone-300 rounded px-2 py-1 text-sm bg-white w-full"
                            value={editingItem.data.medium || ""}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: {
                                  ...editingItem.data,
                                  medium: e.target.value,
                                },
                              })
                            }
                            placeholder="Medium"
                          />
                          <input
                            className="border border-stone-300 rounded px-2 py-1 text-sm bg-white w-full"
                            value={editingItem.data.dimensions || ""}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: {
                                  ...editingItem.data,
                                  dimensions: e.target.value,
                                },
                              })
                            }
                            placeholder="Dimensions"
                          />
                          <input
                            type="number"
                            className="border border-stone-300 rounded px-2 py-1 text-sm bg-white w-full"
                            value={editingItem.data.yearCreated || ""}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                data: {
                                  ...editingItem.data,
                                  yearCreated: e.target.value,
                                },
                              })
                            }
                            placeholder="Year"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={saveEdit}
                            className="bg-orange-800 text-white text-xs px-3 py-1.5 rounded hover:bg-orange-900 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded hover:bg-stone-300 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded bg-stone-100"
                          />
                          <div>
                            <p className="font-serif text-stone-800 font-medium text-sm">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                              {item.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit("artworks", item)}
                            className="text-xs text-terracotta hover:underline font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("artworks", item.id)}
                            className="text-xs text-red-500 hover:underline font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Portraits Column ── */}
            <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-sm border border-stone-200/50 flex flex-col">
              <h2 className="font-serif text-xl text-stone-800 mb-4 pb-2 border-b border-stone-200 font-semibold">
                Self-Portraits
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {portraits.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-stone-100 p-4"
                  >
                    {editingItem?.type === "portraits" &&
                    editingItem.id === item.id ? (
                      <div className="space-y-2">
                        <input
                          className="w-full border border-stone-300 rounded px-2 py-1 text-sm bg-white"
                          value={editingItem.data.caption || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: {
                                ...editingItem.data,
                                caption: e.target.value,
                              },
                            })
                          }
                          placeholder="Caption"
                        />
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={saveEdit}
                            className="bg-orange-800 text-white text-xs px-3 py-1.5 rounded hover:bg-orange-900 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded hover:bg-stone-300 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.caption || "Portrait"}
                            className="w-12 h-12 object-cover rounded bg-stone-100"
                          />
                          <p className="text-xs text-stone-600 italic">
                            {item.caption || "(no caption)"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit("portraits", item)}
                            className="text-xs text-terracotta hover:underline font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("portraits", item.id)}
                            className="text-xs text-red-500 hover:underline font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Poems Column ── */}
            <div className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-sm border border-stone-200/50 flex flex-col">
              <h2 className="font-serif text-xl text-stone-800 mb-4 pb-2 border-b border-stone-200 font-semibold">
                Poems
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {poems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border border-stone-100 p-4"
                  >
                    {editingItem?.type === "poems" &&
                    editingItem.id === item.id ? (
                      <div className="space-y-2">
                        <input
                          className="w-full border border-stone-300 rounded px-2 py-1 text-sm bg-white"
                          value={editingItem.data.title || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: {
                                ...editingItem.data,
                                title: e.target.value,
                              },
                            })
                          }
                          placeholder="Title"
                        />
                        <textarea
                          className="w-full border border-stone-300 rounded px-2 py-1 text-sm bg-white"
                          value={editingItem.data.content || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              data: {
                                ...editingItem.data,
                                content: e.target.value,
                              },
                            })
                          }
                          rows={5}
                        />
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={saveEdit}
                            className="bg-orange-800 text-white text-xs px-3 py-1.5 rounded hover:bg-orange-900 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded hover:bg-stone-300 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="font-serif text-stone-800 font-medium text-sm">
                          {item.title}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit("poems", item)}
                            className="text-xs text-terracotta hover:underline font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("poems", item.id)}
                            className="text-xs text-red-500 hover:underline font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
