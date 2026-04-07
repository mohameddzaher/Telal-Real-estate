// ============================================================
// Telal Development — Type Definitions
// ============================================================

// User Roles
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  AGENT = "AGENT",
  ANALYST = "ANALYST",
  CONTENT_EDITOR = "CONTENT_EDITOR",
  CLIENT = "CLIENT",
  GUEST = "GUEST",
}

// Property Types
export enum PropertyType {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
  MIXED_USE = "MIXED_USE",
  OFF_PLAN = "OFF_PLAN",
  RETAIL = "RETAIL",
  HOSPITALITY = "HOSPITALITY",
}

export enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  OFF_PLAN = "OFF_PLAN",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  RESERVED = "RESERVED",
}

export enum ProjectStatus {
  PLANNING = "PLANNING",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
  COMPLETED = "COMPLETED",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  NEGOTIATING = "NEGOTIATING",
  CLOSED_WON = "CLOSED_WON",
  CLOSED_LOST = "CLOSED_LOST",
}

// Data Models
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  currency: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  parkingSpots?: number;
  location: string;
  city: string;
  coordinates?: { lat: number; lng: number };
  amenities: string[];
  images: PropertyImage[];
  videos: string[];
  floorPlans: string[];
  projectId?: string;
  project?: Project;
  isFeatured: boolean;
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  propertyId: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  type: string;
  status: ProjectStatus;
  location: string;
  launchDate?: Date;
  completionDate?: Date;
  totalUnits?: number;
  masterPlan?: string;
  coverImage: string;
  gallery: string[];
  properties?: Property[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
}

export interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  amenities: string[];
  imageUrl?: string;
  floor?: number;
  isActive: boolean;
}

export interface Booking {
  id: string;
  referenceNo: string;
  roomId: string;
  room?: MeetingRoom;
  userId?: string;
  user?: User;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  company?: string;
  purpose: string;
  date: Date;
  startTime: string;
  endTime: string;
  attendees: number;
  notes?: string;
  status: BookingStatus;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  status: LeadStatus;
  assignedTo?: string;
  notes?: LeadNote[];
  propertyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadNote {
  id: string;
  content: string;
  authorId: string;
  leadId: string;
  createdAt: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  isConfirmed: boolean;
  token?: string;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  order: number;
  isPublished: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle?: string;
  content: string;
  contentAr?: string;
  rating: number;
  propertyId?: string;
  avatar?: string;
  isPublished: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  image: string;
  linkedin?: string;
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  features: string[];
  image: string;
  order: number;
}

// Analytics
export interface AnalyticsMetric {
  label: string;
  value: number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

// Navigation
export interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  children?: NavItem[];
}
