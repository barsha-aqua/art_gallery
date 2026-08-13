import express from "express";
import multer from "multer";
import prisma from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET / - list all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: { createdAt: "desc" },
      include: { auction: true },
    });
    res.json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// GET /:id - get one artwork
router.get("/:id", async (req, res) => {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { id: Number(req.params.id) },
      include: { auction: { include: { bids: true } } },
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    res.json(artwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch artwork" });
  }
});

// POST / - create a new artwork (admin only)
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const { title, description, medium, dimensions, yearCreated } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Upload the image buffer to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description: description || null,
        medium: medium || null,
        dimensions: dimensions || null,
        yearCreated: yearCreated ? Number(yearCreated) : null,
        imageUrl: uploadResult.secure_url,
        status: "available",
      },
    });

    res.status(201).json(artwork);
  } catch (error) {
    console.error("Error creating artwork:", error);
    res.status(500).json({ error: "Failed to create artwork" });
  }
});

export default router;
// PUT /:id - edit an artwork (admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { title, description, medium, dimensions, yearCreated } = req.body;

    const artwork = await prisma.artwork.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(medium !== undefined && { medium }),
        ...(dimensions !== undefined && { dimensions }),
        ...(yearCreated !== undefined && { yearCreated: Number(yearCreated) }),
      },
    });

    res.json(artwork);
  } catch (error) {
    console.error("Error updating artwork:", error);
    res.status(500).json({ error: "Failed to update artwork" });
  }
});

// DELETE /:id - delete an artwork (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Delete related auction/bids first if they exist (avoids foreign key errors)
    const auction = await prisma.auction.findUnique({
      where: { artworkId: id },
    });
    if (auction) {
      await prisma.bid.deleteMany({ where: { auctionId: auction.id } });
      await prisma.auction.delete({ where: { id: auction.id } });
    }

    await prisma.artwork.delete({ where: { id } });

    res.json({ message: "Artwork deleted" });
  } catch (error) {
    console.error("Error deleting artwork:", error);
    res.status(500).json({ error: "Failed to delete artwork" });
  }
});
