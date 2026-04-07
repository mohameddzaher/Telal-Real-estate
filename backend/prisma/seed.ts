import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Telal database...");

  // Create demo users
  await prisma.user.upsert({
    where: { email: "admin@telaldevelopment.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@telaldevelopment.com",
      password: "admin123",
      role: "SUPER_ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "agent@telaldevelopment.com" },
    update: {},
    create: {
      name: "Sales Agent",
      email: "agent@telaldevelopment.com",
      password: "agent123",
      role: "AGENT",
    },
  });

  await prisma.user.upsert({
    where: { email: "client@telaldevelopment.com" },
    update: {},
    create: {
      name: "Demo Client",
      email: "client@telaldevelopment.com",
      password: "client123",
      role: "CLIENT",
    },
  });

  // Create projects
  const proj1 = await prisma.project.upsert({
    where: { slug: "al-thuraya-tower" },
    update: {},
    create: {
      slug: "al-thuraya-tower",
      name: "Al Thuraya Tower",
      nameAr: "برج الثريا",
      description:
        "A 45-story landmark tower redefining the Riyadh skyline. Al Thuraya Tower offers ultra-luxury residences with world-class amenities, concierge services, and panoramic city views.",
      type: "Residential Tower",
      status: "COMPLETED",
      location: "Olaya District, Riyadh",
      launchDate: new Date("2020-06-01"),
      completionDate: new Date("2023-12-01"),
      totalUnits: 120,
      coverImage: "/images/projects/thuraya-cover.jpg",
      gallery: ["/images/projects/thuraya-1.jpg", "/images/projects/thuraya-2.jpg"],
      isPublished: true,
      isFeatured: true,
    },
  });

  const proj2 = await prisma.project.upsert({
    where: { slug: "noor-residences" },
    update: {},
    create: {
      slug: "noor-residences",
      name: "Noor Residences",
      nameAr: "نور ريزيدنسز",
      description:
        "A visionary mixed-use development in King Abdullah Financial District. Noor Residences combines premium apartments, retail spaces, and landscaped communal areas.",
      type: "Mixed-Use Development",
      status: "UNDER_CONSTRUCTION",
      location: "KAFD, Riyadh",
      launchDate: new Date("2023-03-01"),
      completionDate: new Date("2026-06-01"),
      totalUnits: 340,
      coverImage: "/images/projects/noor-cover.jpg",
      gallery: ["/images/projects/noor-1.jpg", "/images/projects/noor-2.jpg"],
      isPublished: true,
      isFeatured: true,
    },
  });

  const proj3 = await prisma.project.upsert({
    where: { slug: "telal-business-park" },
    update: {},
    create: {
      slug: "telal-business-park",
      name: "Telal Business Park",
      nameAr: "تلال بزنس بارك",
      description:
        "The Kingdom's most prestigious commercial address. Telal Business Park comprises Grade A office towers, a conference center, retail podium, and landscaped plazas.",
      type: "Commercial Complex",
      status: "PLANNING",
      location: "KAFD, Riyadh",
      launchDate: new Date("2024-09-01"),
      completionDate: new Date("2028-12-01"),
      totalUnits: 45,
      coverImage: "/images/projects/business-cover.jpg",
      gallery: ["/images/projects/business-1.jpg"],
      isPublished: true,
      isFeatured: true,
    },
  });

  // Create meeting rooms
  await prisma.meetingRoom.upsert({
    where: { id: "room-1" },
    update: {},
    create: {
      id: "room-1",
      name: "The Boardroom",
      capacity: 16,
      amenities: ["Video Conferencing", "Whiteboard", "Coffee Service", "Sound System", "Projector"],
      imageUrl: "/images/rooms/boardroom.jpg",
      floor: 25,
      isActive: true,
    },
  });

  await prisma.meetingRoom.upsert({
    where: { id: "room-2" },
    update: {},
    create: {
      id: "room-2",
      name: "The Innovation Suite",
      capacity: 8,
      amenities: ["Smart TV", "Whiteboard", "Coffee Service", "High-Speed WiFi"],
      imageUrl: "/images/rooms/innovation.jpg",
      floor: 25,
      isActive: true,
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
