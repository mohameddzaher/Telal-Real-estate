import { create } from "zustand";

interface AppState {
  isPreloaderComplete: boolean;
  setPreloaderComplete: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isHeaderScrolled: boolean;
  setHeaderScrolled: (scrolled: boolean) => void;
  locale: "en" | "ar";
  setLocale: (locale: "en" | "ar") => void;
}

export const useAppStore = create<AppState>((set) => ({
  isPreloaderComplete: false,
  setPreloaderComplete: () => set({ isPreloaderComplete: true }),
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  activeSection: "",
  setActiveSection: (section) => set({ activeSection: section }),
  isHeaderScrolled: false,
  setHeaderScrolled: (scrolled) => set({ isHeaderScrolled: scrolled }),
  locale: "en",
  setLocale: (locale) => set({ locale }),
}));

interface PropertyFilterState {
  type: string | null;
  status: string | null;
  city: string | null;
  priceMin: number | null;
  priceMax: number | null;
  bedroomsMin: number | null;
  areaMin: number | null;
  search: string;
  sortBy: "price_asc" | "price_desc" | "newest" | "popular";
  setFilter: (key: string, value: string | number | null) => void;
  resetFilters: () => void;
}

const defaultFilters = {
  type: null,
  status: null,
  city: null,
  priceMin: null,
  priceMax: null,
  bedroomsMin: null,
  areaMin: null,
  search: "",
  sortBy: "newest" as const,
};

export const usePropertyFilterStore = create<PropertyFilterState>((set) => ({
  ...defaultFilters,
  setFilter: (key, value) => set((s) => ({ ...s, [key]: value })),
  resetFilters: () => set(defaultFilters),
}));

interface BookingState {
  step: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedRoom: string | null;
  setStep: (step: number) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setSelectedRoom: (room: string | null) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  selectedDate: null,
  selectedTime: null,
  selectedRoom: null,
  setStep: (step) => set({ step }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  reset: () =>
    set({ step: 1, selectedDate: null, selectedTime: null, selectedRoom: null }),
}));
