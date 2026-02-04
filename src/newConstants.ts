import { MenuItem, MenuCategory } from './newTypes';

export const MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: 'app1',
    name: 'Creamy Crab Dip',
    price: '$16.99',
    description: 'House made silky crab dip infused with Old Bay seasoning and real lump crab meat. Served with butter-toasted French bread rounds.',
    category: MenuCategory.APPETIZERS,
    image: '/videos/creamy-crab-dip.mp4',
    isSignature: true
  },
  {
    id: 'app6',
    name: 'Smoked Sausage Boudin Balls',
    price: '$12.99',
    description: 'Crispy boudin croquettes with smoky andouille and creamy rice, served with spicy Creole mustard.',
    category: MenuCategory.APPETIZERS,
    image: '/videos/smoked-sausage-boudin-balls.mp4',
    isSignature: false,
  },
  {
    id: 'app2',
    name: 'Bayou Low Boil',
    price: '$11.99',
    description: 'A classic starter with Gulf shrimp, red potatoes, andouille sausage, and sweet corn. Served with a side of drawn cajun garlic butter.',
    category: MenuCategory.APPETIZERS,
    image: '/videos/bayou-low-boil.mp4',
    isSignature: true
  },
  {
    id: 'sal3',
    name: 'Charred Okra & Tomato Salad',
    price: '$13.99',
    description: 'Blistered okra, heirloom tomatoes, pickled red onions, and feta with lemon-cajun vinaigrette.',
    category: MenuCategory.SALADS,
    image: '/videos/charred-tomato-okra-salad.mp4',
    isSignature: false,
  },
  {
    id: 'app3',
    name: 'Crispy Alligator Bites',
    price: '$14.99',
    description: 'Tender, farm-raised alligator tail lightly battered and fried to a perfect golden crisp. Served with our signature zesty remoulade sauce.',
    category: MenuCategory.APPETIZERS,
    image: '/videos/crispy-alligator-bites.mp4',
    isSignature: true
  },
  {
    id: 'app4',
    name: 'Crawfish Queso Dip',
    price: '$18.99',
    description: 'Warm, melted three-cheese blend loaded with domestic crawfish tails and diced pimientos. Served with hand-cut crispy tortilla chips.',
    category: MenuCategory.APPETIZERS,
    image: '/videos/crawfish-queso-dip.mp4',
    isSignature: false
  },
  {
    id: 'app5',
    name: 'Cajun Sampler Platter',
    price: '$21.99',
    description: 'The ultimate introduction to the bayou: small portions of red beans and rice, crawfish etouffee, and our famous seafood gumbo.',
    category: MenuCategory.APPETIZERS,
    image: '/videos/cajun-sampler-platter.mp4',
    isSignature: true
  },

  // Salads
  {
    id: 'sal1',
    name: 'Blackened Chicken Cobb',
    price: '$15.99',
    description: 'Mixed greens topped with blackened chicken breast, avocado, egg, bacon, and blue cheese crumbles with a cajun ranch dressing.',
    category: MenuCategory.SALADS,
    image: '/videos/blackened-chicken-cobb.mp4',
    isSignature: false
  },
  {
    id: 'sal2',
    name: 'Remoulade Shrimp Salad',
    price: '$17.99',
    description: 'Crisp iceberg wedge topped with chilled boiled shrimp, tomatoes, and a generous pour of our house-made spicy remoulade.',
    category: MenuCategory.SALADS,
    image: '/videos/remoulade-shrimp-salad.mp4',
    isSignature: true
  },

  // Main Courses
  {
    id: 'main1',
    name: 'Alligator Sauce Piquant',
    price: '$26.99',
    description: 'Traditional slow-simmered alligator tail in a rich, spicy tomato-based roux with the "holy trinity" of vegetables. Served over white rice.',
    category: MenuCategory.MAIN_COURSES,
    image: '/videos/alligator-sauce-piquant.mp4',
    isSignature: true
  },
  {
    id: 'main2',
    name: 'King’s Crab Boil',
    price: '$52.99',
    description: 'A feast fit for royalty: Two large clusters of Snow Crab, jumbo shrimp, sausage, potatoes, and corn tossed in our signature cajun boil butter.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://images.unsplash.com/photo-1590759016226-c9002d4452c7?auto=format&fit=crop&q=80&w=800',
    isSignature: true
  },
  {
    id: 'main3',
    name: 'Seafood Gumbo Bowl',
    price: '$16.99',
    description: 'A deep, dark roux perfected over generations. Filled with Gulf shrimp, blue crab, and andouille sausage. Served with fluffy white rice.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cajun_seafood_gumbo.jpg',
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
  {
    id: 'main5',
    name: 'Blackened Redfish Pontchartrain',
    price: '$27.99',
    description: 'Cast-iron blackened redfish topped with crawfish cream sauce, served over herbed rice.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://images.unsplash.com/photo-1455612693675-112974d4880b?auto=format&fit=crop&q=80&w=800',
    isSignature: true,
  },
  {
    id: 'main6',
    name: 'Jambalaya Royal',
    price: '$21.99',
    description: 'Chicken, andouille, and Gulf shrimp simmered with pepper trinity, tomatoes, and long-grain rice.',
    category: MenuCategory.MAIN_COURSES,
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Jambalaya.JPG',
    isSignature: false,
  },

  // Po-Boys
  {
    id: 'pb1',
    name: 'Debris Roast Beef Po-Boy',
    price: '$19.99',
    description: 'Slow-cooked roast beef simmered until it falls apart into gravy "debris." Dressed with lettuce, tomatoes, and extra cajun mayo.',
    category: MenuCategory.POBOYS,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Poboy.jpg',
    isSignature: true
  },
  {
    id: 'pb3',
    name: 'Blackened Shrimp Po-Boy',
    price: '$19.99',
    description: 'Seared blackened shrimp, shredded lettuce, tomato, and rémoulade on Leidenheimer bread.',
    category: MenuCategory.POBOYS,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Poboy.jpg',
    isSignature: false,
  },
  {
    id: 'pb2',
    name: 'Fried Oyster Po-Boy',
    price: '$21.99',
    description: 'Plump, cornmeal-crusted oysters fried until golden and piled high on a toasted French roll with spicy mayo.',
    category: MenuCategory.POBOYS,
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Poboy.jpg',
    isSignature: false
  },
  {
    id: 'bk3',
    name: 'Bayou Combo Basket',
    price: '$19.99',
    description: 'Half shrimp, half catfish, hushpuppies, and Cajun fries with cocktail and tartar.',
    category: MenuCategory.BASKETS,
    image: 'https://images.pexels.com/photos/17628580/pexels-photo-17628580.jpeg?cs=srgb&dl=pexels-valeriya-17628580.jpg&fm=jpg',
    isSignature: false,
  },

  // Baskets
  {
    id: 'bk1',
    name: 'Fried Shrimp Basket',
    price: '$18.99',
    description: 'Half-pound of golden fried shrimp served with seasoned fries, coleslaw, and our house-made cocktail sauce.',
    category: MenuCategory.BASKETS,
    image: 'https://images.pexels.com/photos/17628580/pexels-photo-17628580.jpeg?cs=srgb&dl=pexels-valeriya-17628580.jpg&fm=jpg',
    isSignature: false
  },
  {
    id: 'kid3',
    name: 'Beignet Sticks',
    price: '$6.99',
    description: 'Kid-sized beignet sticks dusted with powdered sugar and served with chocolate dip.',
    category: MenuCategory.KIDS,
    image: 'https://images.pexels.com/photos/13988842/pexels-photo-13988842.jpeg?cs=srgb&dl=pexels-keesha-s-kitchen-22731136-13988842.jpg&fm=jpg',
    isSignature: false,
  },
  {
    id: 'bk2',
    name: 'Catfish & Hushpuppy Basket',
    price: '$17.99',
    description: 'Two large cornmeal-dusted catfish fillets fried to perfection. Served with golden hushpuppies and cajun fries.',
    category: MenuCategory.BASKETS,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    isSignature: false
  },
  {
    id: 'des3',
    name: 'Bananas Foster Bread Pudding',
    price: '$10.99',
    description: 'Caramelized bananas, dark rum sauce, and vanilla bean ice cream over brioche pudding.',
    category: MenuCategory.DESSERTS,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800',
    isSignature: true,
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
