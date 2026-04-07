import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean up existing data
  await prisma.leadNote.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.propertyFavorite.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.meetingRoom.deleteMany();
  await prisma.property.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.pageView.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ── Users ──
  const adminUser = await prisma.user.create({
    data: {
      name: "Sultan Al-Rashid",
      email: "admin@telaldevelopment.com",
      password: "$2b$10$placeholder_hash_admin",
      phone: "+966501234567",
      role: "SUPER_ADMIN",
      emailVerified: new Date(),
    },
  });

  const agentUser = await prisma.user.create({
    data: {
      name: "Fahad Al-Qahtani",
      email: "agent@telaldevelopment.com",
      password: "$2b$10$placeholder_hash_agent",
      phone: "+966509876543",
      role: "AGENT",
      emailVerified: new Date(),
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      name: "Ahmed Al-Faisal",
      email: "client@telaldevelopment.com",
      password: "$2b$10$placeholder_hash_client",
      phone: "+966505555555",
      role: "CLIENT",
      emailVerified: new Date(),
    },
  });

  // ── Projects ──
  const project1 = await prisma.project.create({
    data: {
      slug: "al-thuraya-tower",
      name: "Al Thuraya Tower",
      nameAr: "برج الثريا",
      description: "A 45-story landmark tower redefining the Riyadh skyline with ultra-luxury residences and world-class amenities.",
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

  const project2 = await prisma.project.create({
    data: {
      slug: "noor-residences",
      name: "Noor Residences",
      nameAr: "نور ريزيدنسز",
      description: "A visionary mixed-use development combining premium apartments, retail spaces, and landscaped communal areas.",
      type: "Mixed-Use Development",
      status: "UNDER_CONSTRUCTION",
      location: "KAFD, Riyadh",
      launchDate: new Date("2023-03-01"),
      completionDate: new Date("2026-06-01"),
      totalUnits: 340,
      coverImage: "/images/projects/noor-cover.jpg",
      gallery: ["/images/projects/noor-1.jpg"],
      isPublished: true,
      isFeatured: true,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      slug: "telal-business-park",
      name: "Telal Business Park",
      nameAr: "تلال بزنس بارك",
      description: "The Kingdom's most prestigious commercial address with Grade A office towers and direct metro connectivity.",
      type: "Commercial Complex",
      status: "PLANNING",
      location: "KAFD, Riyadh",
      launchDate: new Date("2024-09-01"),
      completionDate: new Date("2028-12-01"),
      totalUnits: 45,
      coverImage: "/images/projects/business-cover.jpg",
      gallery: [],
      isPublished: true,
      isFeatured: true,
    },
  });

  // ── Properties ──
  const propertyData = [
    {
      slug: "al-thuraya-tower-penthouse",
      title: "Al Thuraya Tower Penthouse",
      titleAr: "بنتهاوس برج الثريا",
      description: "An extraordinary penthouse spanning the top two floors of Al Thuraya Tower.",
      descriptionAr: "بنتهاوس استثنائي يمتد على الطابقين العلويين من برج الثريا.",
      type: "RESIDENTIAL" as const,
      status: "AVAILABLE" as const,
      price: 12500000,
      area: 650,
      bedrooms: 5,
      bathrooms: 7,
      floors: 2,
      parkingSpots: 4,
      location: "Olaya District, King Fahd Road",
      city: "Riyadh",
      amenities: ["Swimming Pool", "Gym", "Spa", "Concierge", "Smart Home"],
      isFeatured: true,
      isPublished: true,
      projectId: project1.id,
    },
    {
      slug: "rimal-gardens-villa",
      title: "Rimal Gardens Villa",
      titleAr: "فيلا حدائق الرمال",
      description: "A masterfully designed villa blending contemporary and Arabian architecture.",
      descriptionAr: "فيلا مصممة بإتقان تمزج بين العمارة المعاصرة والعربية.",
      type: "RESIDENTIAL" as const,
      status: "AVAILABLE" as const,
      price: 8750000,
      area: 520,
      bedrooms: 6,
      bathrooms: 5,
      floors: 2,
      parkingSpots: 3,
      location: "Al Nakheel District",
      city: "Riyadh",
      amenities: ["Garden", "Parking", "Smart Home", "Security"],
      isFeatured: true,
      isPublished: true,
    },
    {
      slug: "noor-residences-3br",
      title: "Noor Residences — 3 Bedroom",
      titleAr: "نور ريزيدنسز — 3 غرف نوم",
      description: "Modern luxury apartment with stunning city views.",
      descriptionAr: "شقة فاخرة عصرية مع إطلالات مدنية خلابة.",
      type: "OFF_PLAN" as const,
      status: "OFF_PLAN" as const,
      price: 3200000,
      area: 245,
      bedrooms: 3,
      bathrooms: 4,
      parkingSpots: 2,
      location: "King Abdullah Financial District",
      city: "Riyadh",
      amenities: ["Swimming Pool", "Gym", "Spa", "Concierge"],
      isFeatured: true,
      isPublished: true,
      projectId: project2.id,
    },
    {
      slug: "corniche-bay-duplex",
      title: "Corniche Bay Duplex",
      titleAr: "دوبلكس كورنيش باي",
      description: "Stunning waterfront duplex with direct Corniche views.",
      descriptionAr: "دوبلكس مذهل على الواجهة البحرية.",
      type: "RESIDENTIAL" as const,
      status: "AVAILABLE" as const,
      price: 6800000,
      area: 380,
      bedrooms: 4,
      bathrooms: 5,
      floors: 2,
      parkingSpots: 2,
      location: "Al Corniche",
      city: "Jeddah",
      amenities: ["Swimming Pool", "Gym", "Balcony", "Parking"],
      isFeatured: true,
      isPublished: true,
    },
    {
      slug: "telal-business-park-office",
      title: "Telal Business Park — Grade A Office",
      titleAr: "تلال بزنس بارك — مكتب درجة أولى",
      description: "Premium Grade A office space in the Kingdom's most prestigious address.",
      descriptionAr: "مساحة مكتبية فاخرة من الدرجة الأولى.",
      type: "COMMERCIAL" as const,
      status: "AVAILABLE" as const,
      price: 15000000,
      area: 1200,
      floors: 3,
      parkingSpots: 20,
      location: "KAFD",
      city: "Riyadh",
      amenities: ["Parking", "Security", "Concierge"],
      isPublished: true,
      projectId: project3.id,
    },
  ];

  for (const prop of propertyData) {
    await prisma.property.create({ data: prop });
  }

  // ── Meeting Rooms ──
  const room1 = await prisma.meetingRoom.create({
    data: {
      name: "The Boardroom",
      capacity: 16,
      amenities: ["Video Conferencing", "Whiteboard", "Coffee Service", "Sound System"],
      imageUrl: "/images/rooms/boardroom.jpg",
      floor: 25,
    },
  });

  await prisma.meetingRoom.create({
    data: {
      name: "The Innovation Suite",
      capacity: 8,
      amenities: ["Smart TV", "Whiteboard", "Coffee Service", "High-Speed WiFi"],
      imageUrl: "/images/rooms/innovation.jpg",
      floor: 25,
    },
  });

  // ── Blog Posts ──
  await prisma.blogPost.create({
    data: {
      slug: "saudi-luxury-real-estate-2024-outlook",
      title: "Saudi Luxury Real Estate: 2024 Market Outlook",
      titleAr: "العقارات الفاخرة في السعودية: توقعات السوق لعام 2024",
      excerpt: "The Kingdom's luxury real estate sector continues its growth trajectory.",
      body: "The Saudi Arabian luxury real estate market has entered a golden era...",
      coverImage: "/images/blog/market-outlook.jpg",
      category: "Market Analysis",
      tags: ["market analysis", "luxury", "investment"],
      author: "Ahmed Al-Rashid",
      readTime: 8,
      isPublished: true,
      publishedAt: new Date("2024-03-15"),
    },
  });

  // ── FAQs ──
  const faqData = [
    { question: "What types of properties does Telal offer?", questionAr: "ما أنواع العقارات التي تقدمها تلال؟", answer: "We offer residential, commercial, mixed-use, retail, and hospitality properties.", answerAr: "نقدم عقارات سكنية وتجارية ومتعددة الاستخدامات وتجزئة وضيافة.", category: "General" },
    { question: "Can foreign nationals purchase property?", questionAr: "هل يمكن للأجانب شراء عقارات؟", answer: "Yes, under updated Saudi property laws, foreign nationals with valid residency can purchase property.", answerAr: "نعم، يمكن للمقيمين الأجانب شراء عقارات وفقاً للقوانين المحدثة.", category: "Legal" },
    { question: "What payment plans are available?", questionAr: "ما خطط الدفع المتاحة؟", answer: "We offer flexible payment plans: 10-20% down payment, staged payments, and bank financing.", answerAr: "نقدم خطط دفع مرنة تشمل دفعة أولى ودفعات مرحلية وتمويل بنكي.", category: "Financing" },
  ];

  for (let i = 0; i < faqData.length; i++) {
    await prisma.fAQ.create({ data: { ...faqData[i], order: i } });
  }

  // ── Testimonials ──
  await prisma.testimonial.create({
    data: {
      clientName: "Abdullah Al-Faisal",
      clientTitle: "CEO, Al-Faisal Holdings",
      content: "Telal Development delivered beyond our expectations.",
      contentAr: "قدمت تلال للتطوير أكثر مما توقعنا.",
      rating: 5,
      order: 0,
    },
  });

  // ── Sample Booking ──
  await prisma.booking.create({
    data: {
      referenceNo: "TEL-SAMPLE-001",
      roomId: room1.id,
      userId: clientUser.id,
      guestName: "Ahmed Al-Faisal",
      guestEmail: "client@telaldevelopment.com",
      guestPhone: "+966505555555",
      company: "Al-Faisal Holdings",
      purpose: "Property consultation and portfolio review",
      date: new Date("2024-04-15"),
      startTime: "10:00",
      endTime: "11:00",
      attendees: 3,
      status: "CONFIRMED",
    },
  });

  // ── Sample Leads ──
  await prisma.lead.create({
    data: {
      name: "Mohammed Al-Saud",
      email: "mohammed@example.com",
      phone: "+966501112233",
      message: "Interested in the Al Thuraya penthouse. Please schedule a viewing.",
      source: "property_page",
      status: "NEW",
      assignedTo: agentUser.id,
    },
  });

  // ── Newsletter Subscribers ──
  await prisma.newsletterSubscriber.create({
    data: { email: "subscriber@example.com", isConfirmed: true },
  });

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
