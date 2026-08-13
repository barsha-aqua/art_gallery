import express from "express";
import prisma from "../config/db.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

// POST /api/auctions - start an auction on an artwork (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { artworkId, reservePrice, durationDays } = req.body;

    if (!artworkId || !reservePrice) {
      return res
        .status(400)
        .json({ error: "artworkId and reservePrice are required" });
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id: Number(artworkId) },
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    const days = durationDays ? Number(durationDays) : 30;
    const endsAt = new Date();
    endsAt.setDate(endsAt.getDate() + days);

    const auction = await prisma.auction.create({
      data: {
        artworkId: Number(artworkId),
        reservePrice: Number(reservePrice),
        status: "open",
        endsAt,
      },
    });

    // Mark the artwork as being in auction
    await prisma.artwork.update({
      where: { id: Number(artworkId) },
      data: { status: "in_auction" },
    });

    res.status(201).json(auction);
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).json({ error: "Failed to create auction" });
  }
});

// POST /api/auctions/:id/bid - place a bid (public)
router.post("/:id/bid", async (req, res) => {
  try {
    const auctionId = Number(req.params.id);
    const { bidderName, bidderEmail, bidderMessage, amount } = req.body;

    if (!bidderName || !bidderEmail || !amount) {
      return res
        .status(400)
        .json({ error: "Name, email, and amount are required" });
    }

    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
    });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    if (auction.status !== "open") {
      return res.status(400).json({ error: "This auction is closed" });
    }

    const currentFloor = auction.currentHighestBid || auction.reservePrice;

    if (Number(amount) <= currentFloor) {
      return res.status(400).json({
        error: `Your offer must be higher than the current bid ($${currentFloor})`,
      });
    }

    // Save the bid
    const bid = await prisma.bid.create({
      data: {
        auctionId,
        bidderName,
        bidderEmail,
        bidderMessage: bidderMessage || null,
        amount: Number(amount),
      },
    });

    // Update the auction's current highest bid
    const updatedAuction = await prisma.auction.update({
      where: { id: auctionId },
      data: {
        currentHighestBid: Number(amount),
        currentHighestBidder: bidderName,
      },
    });

    res.status(201).json({ bid, auction: updatedAuction });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Failed to place bid" });
  }
});

export default router;
