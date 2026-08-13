import express from "express";
import multer from "multer";
import prisma from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET / - list all self-portraits
router.get("/", async (req, res) => {
  try {
    const portraits = await prisma.selfPortrait.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(portraits);
  } catch (error) {
    console.error("Error fetching portraits:", error);
    res.status(500).json({ error: "Failed to fetch portraits" });
  }
});

// POST / - upload a new self-portrait (admin only)
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const { caption } = req.body;

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portraits" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    const portrait = await prisma.selfPortrait.create({
      data: {
        imageUrl: uploadResult.secure_url,
        caption: caption || null,
      },
    });

    res.status(201).json(portrait);
  } catch (error) {
    console.error("Error creating portrait:", error);
    res.status(500).json({ error: "Failed to create portrait" });
  }
});
// PUT /:id - edit a portrait's caption (admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { caption } = req.body;

    const portrait = await prisma.selfPortrait.update({
      where: { id: Number(req.params.id) },
      data: { caption: caption ?? null },
    });

    res.json(portrait);
  } catch (error) {
    console.error("Error updating portrait:", error);
    res.status(500).json({ error: "Failed to update portrait" });
  }
});

// DELETE /:id - delete a portrait (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await prisma.selfPortrait.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Portrait deleted" });
  } catch (error) {
    console.error("Error deleting portrait:", error);
    res.status(500).json({ error: "Failed to delete portrait" });
  }
});

export default router;
