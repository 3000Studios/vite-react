// Import React to resolve the 'Cannot find namespace React' error when using React.ReactNode
import React from 'react';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: MenuCategory;
  image?: string;
  isSignature?: boolean;
}

export enum MenuCategory {
  APPETIZERS = "Appetizers",
  SALADS = "Salads",
  MAIN_COURSES = "Main Courses",
  POBOYS = "Po-Boys",
  LUNCH_BASKETS = "Lunch Baskets",
  KIDS = "Kids Menu",
  DESSERTS = "Desserts",
  SIDES = "Sides",
  DRINKS = "Drinks",
  BASKETS = "Baskets"
}

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}