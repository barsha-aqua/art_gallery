import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// GET / - fetch all artworks, newest first, including auction data
router.get("/", async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        auction: true,
      },
    });
    res.json(artworks);
  } catch (error) {
    console.error("Error fetching artworks:", error);
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// GET /:id - fetch single artwork by ID, including auction and bids
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artwork = await prisma.artwork.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        auction: {
          include: {
            bids: true,
          },
        },
      },
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    res.json(artwork);
  } catch (error) {
    console.error("Error fetching artwork by ID:", error);
    res.status(500).json({ error: "Failed to fetch artwork" });
  }
});

export default router;
