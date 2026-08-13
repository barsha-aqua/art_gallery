import prisma from "../config/db.js";

const artworks = [
  {
    title: "Dusk over the Ridge",
    medium: "Oil on Canvas",
    dimensions: "24 x 36 in",
    yearCreated: 2024,
    imageUrl: "https://placehold.co/600x800",
    status: "available",
  },
  {
    title: "Study in Stillness",
    medium: "Acrylic",
    dimensions: "18 x 24 in",
    yearCreated: 2023,
    imageUrl: "https://placehold.co/600x400",
    status: "available",
  },
  {
    title: "Tidepools",
    medium: "Watercolor",
    dimensions: "12 x 16 in",
    yearCreated: 2025,
    imageUrl: "https://placehold.co/600x900",
    status: "available",
  },
  {
    title: "Field Notes I",
    medium: "Gouache",
    dimensions: "10 x 10 in",
    yearCreated: 2024,
    imageUrl: "https://placehold.co/600x600",
    status: "available",
  },
  {
    title: "Portrait, Unfinished",
    medium: "Oil on Board",
    dimensions: "20 x 24 in",
    yearCreated: 2022,
    imageUrl: "https://placehold.co/600x750",
    status: "available",
  },
  {
    title: "Night Market",
    medium: "Ink and Wash",
    dimensions: "14 x 18 in",
    yearCreated: 2023,
    imageUrl: "https://placehold.co/600x450",
    status: "available",
  },
];

async function main() {
  for (const artwork of artworks) {
    await prisma.artwork.create({ data: artwork });
    console.log(`Created: ${artwork.title}`);
  }
}

main()
  .then(() => {
    console.log("Seeding finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
