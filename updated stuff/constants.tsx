import { MenuItem, MenuCategory } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: 'app1',
    name: 'Creamy Crab Dip',
    price: '$16.99',
    description: 'House made silky crab dip infused with Old Bay seasoning and real lump crab meat. Served with butter-toasted French bread rounds.',
    category: MenuCategory.APPETIZERS,
    image: 'https://images.unsplash.com/photo-1455081281423-611229bbbd2e?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'app2',
    name: 'Bayou Low Boil',
    price: '$11.99',
    description: 'A classic starter with Gulf shrimp, red potatoes, andouille sausage, and sweet corn. Served with a side of drawn cajun garlic butter.',
    category: MenuCategory.APPETIZERS,
    image: 'https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'app3',
    name: 'Crispy Alligator Bites',
    price: '$14.99',
    description: 'Tender, farm-raised alligator tail lightly battered and fried to a perfect golden crisp. Served with our signature zesty remoulade sauce.',
    category: MenuCategory.APPETIZERS,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'app4',
    name: 'Crawfish Queso Dip',
    price: '$18.99',
    description: 'Warm, melted three-cheese blend loaded with domestic crawfish tails and diced pimientos. Served with hand-cut crispy tortilla chips.',
    category: MenuCategory.APPETIZERS,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },
  {
    id: 'app5',
    name: 'Cajun Sampler Platter',
    price: '$21.99',
    description: 'The ultimate introduction to the bayou: small portions of red beans and rice, crawfish etouffee, and our famous seafood gumbo.',
    category: MenuCategory.APPETIZERS,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },

  // Salads
  {
    id: 'sal1',
    name: 'Blackened Chicken Cobb',
    price: '$15.99',
    description: 'Mixed greens topped with blackened chicken breast, avocado, egg, bacon, and blue cheese crumbles with a cajun ranch dressing.',
    category: MenuCategory.SALADS,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },
  {
    id: 'sal2',
    name: 'Remoulade Shrimp Salad',
    price: '$17.99',
    description: 'Crisp iceberg wedge topped with chilled boiled shrimp, tomatoes, and a generous pour of our house-made spicy remoulade.',
    category: MenuCategory.SALADS,
    image: 'https://images.unsplash.com/photo-1546793665-c74683c3f43d?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },

  // Main Courses
  {
    id: 'main1',
    name: 'Alligator Sauce Piquant',
    price: '$26.99',
    description: 'Traditional slow-simmered alligator tail in a rich, spicy tomato-based roux with the "holy trinity" of vegetables. Served over white rice.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'main2',
    name: 'King’s Crab Boil',
    price: '$52.99',
    description: 'A feast fit for royalty: Two large clusters of Snow Crab, jumbo shrimp, sausage, potatoes, and corn tossed in our signature cajun boil butter.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'main3',
    name: 'Seafood Gumbo Bowl',
    price: '$16.99',
    description: 'A deep, dark roux perfected over generations. Filled with Gulf shrimp, blue crab, and andouille sausage. Served with fluffy white rice.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://images.unsplash.com/photo-1583019117226-d4e1af74e20b?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'main4',
    name: 'Shrimp & Grits Royale',
    price: '$23.99',
    description: 'Creamy stone-ground grits topped with sautéed jumbo shrimp, smoked bacon, and a savory Low Country gravy.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://images.unsplash.com/photo-1516685018646-5482cba1305a?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },

  // Po-Boys
  {
    id: 'pb1',
    name: 'Debris Roast Beef Po-Boy',
    price: '$19.99',
    description: 'Slow-cooked roast beef simmered until it falls apart into gravy "debris." Dressed with lettuce, tomatoes, and extra cajun mayo.',
    category: MenuCategory.POBOYS,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'pb2',
    name: 'Fried Oyster Po-Boy',
    price: '$21.99',
    description: 'Plump, cornmeal-crusted oysters fried until golden and piled high on a toasted French roll with spicy mayo.',
    category: MenuCategory.POBOYS,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },

  // Baskets
  {
    id: 'bk1',
    name: 'Fried Shrimp Basket',
    price: '$18.99',
    description: 'Half-pound of golden fried shrimp served with seasoned fries, coleslaw, and our house-made cocktail sauce.',
    category: MenuCategory.BASKETS,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },
  {
    id: 'bk2',
    name: 'Catfish & Hushpuppy Basket',
    price: '$17.99',
    description: 'Two large cornmeal-dusted catfish fillets fried to perfection. Served with golden hushpuppies and cajun fries.',
    category: MenuCategory.BASKETS,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },

  // Kids Menu
  {
    id: 'kid1',
    name: 'Lil’ Gator Nuggets',
    price: '$8.99',
    description: 'Tender white-meat chicken nuggets served with fries and a choice of dipping sauce. Perfect for the little bayou explorers.',
    category: MenuCategory.KIDS,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },
  {
    id: 'kid2',
    name: 'Cajun Mac & Cheese',
    price: '$7.99',
    description: 'Extra creamy three-cheese macaroni with a mild hint of cajun spices. A kid-friendly favorite with a New Orleans twist.',
    category: MenuCategory.KIDS,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },

  // Desserts
  {
    id: 'des1',
    name: 'Traditional Beignets',
    price: '$9.99',
    description: 'Three warm, pillowy French-style doughnuts buried under a mountain of powdered sugar. A French Quarter essential.',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1582294101758-6927f6b95b19?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'des2',
    name: 'Praline Cheesecake',
    price: '$11.99',
    description: 'Velvety cheesecake topped with a rich, buttery New Orleans pecan praline sauce and whipped cream.',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },

  // Sides
  {
    id: 'side1',
    name: 'Cajun Street Corn',
    price: '$6.99',
    description: 'Grilled corn on the cob slathered in spicy mayo, sprinkled with cajun spices and fresh cilantro.',
    category: MenuCategory.SIDES,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },

  // Drinks
  {
    id: 'dr1',
    name: 'Bourbon Street Hurricane',
    price: '$14.99',
    description: 'A festive Mardi Gras blend of light and dark rums, passion fruit, lime, and a splash of grenadine. A legendary classic.',
    category: MenuCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'dr2',
    name: 'Voodoo Queen Martini',
    price: '$13.99',
    description: 'Dark, mysterious, and magical. Blackberry-infused vodka with a hint of violet and a shimmering edible gold rim.',
    category: MenuCategory.DRINKS,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  }
];

export const CATEGORIES = Object.values(MenuCategory);