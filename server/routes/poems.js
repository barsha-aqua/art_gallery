import express from "express";
import prisma from "../config/db.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// GET / - list all poems
router.get("/", async (req, res) => {
  try {
    const poems = await prisma.poem.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(poems);
  } catch (error) {
    console.error("Error fetching poems:", error);
    res.status(500).json({ error: "Failed to fetch poems" });
  }
});

// POST / - add a new poem (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const poem = await prisma.poem.create({
      data: { title, content },
    });

    res.status(201).json(poem);
  } catch (error) {
    console.error("Error creating poem:", error);
    res.status(500).json({ error: "Failed to create poem" });
  }
});
// PUT /:id - edit a poem (admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;

    const poem = await prisma.poem.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
    });

    res.json(poem);
  } catch (error) {
    console.error("Error updating poem:", error);
    res.status(500).json({ error: "Failed to update poem" });
  }
});

// DELETE /:id - delete a poem (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await prisma.poem.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Poem deleted" });
  } catch (error) {
    console.error("Error deleting poem:", error);
    res.status(500).json({ error: "Failed to delete poem" });
  }
});

export default router;
