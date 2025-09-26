import React from 'react';

export type Theme = 'light' | 'dark';

export type Page = 'home' | 'discover' | 'ai' | 'map' | 'plan' | 'booking' | 'food' | 'reviews' | 'detail';

export interface View {
  page: Page;
  attractionId?: string;
}

export interface PageProps {
  navigateTo: (view: View) => void;
  theme: Theme;
  toggleTheme: () => void;
  setActiveTab: (tab: Page) => void;
  attractionId?: string;
}

export interface Attraction {
  id: string;
  name: string;
  type: 'spiritual' | 'entertainment' | 'nature';
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  location: { lat: number; lng: number };
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface FoodPlace {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    reviewsCount: number;
    image: string;
}

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

export interface Review {
    id: string;
    attractionId: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: View;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    image: string;
}
