import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForyouSongs: Song[];
  trendingSongs: Song[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForyouSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.albums });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchAlbumById: async (id) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data.album });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get(`/songs/featured`);
      set({ featuredSongs: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get(`/songs/made-for-you`);
      set({ madeForyouSongs: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get(`/songs/trending`);
      set({ trendingSongs: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
