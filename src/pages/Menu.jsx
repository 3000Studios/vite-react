import React from 'react';
import Navbar from './Home';

const sections = [
  {
    title: 'Appetizers',
    items: [
      ['Crab Dip App', '$16.99', 'House made creamy crab dip made with real crab meat. Served with toasted bread'],
      ['Low Boil App', '$11.99', 'Shrimp, potatoes, sausage, corn mushrooms. Served with drawn cajun butter.'],
      ['Alligator Bites', '$14.99', 'Tender and juicy alligator tail fried golden. House made cajun sauce.'],
      ['Crawfish Queso App', '$18.99', 'House queso dip with domestic crawfish tails. Served with crisp chips'],
      ['Mozzarella Sticks App', '$8.99', 'Golden and crispy. Choice of marinara, ranch, or cajun sauce'],
      ['Sampler Platter', '$18.99', 'Red beans & rice, crawfish etouffee, and your choice of gumbo'],
      ['Twisted Cajun App', '$18.99', 'Cajun trio remix—perfect for sharing'],
    ],
  },
  {
    title: 'Salads',
    items: [
      ['Cajun Chicken Salad', '$14.99', 'Zesty cajun pan grilled chicken over lettuce, tomato, cheese, croutons, carrots & cucumbers'],
      ['Cajun Crawfish Salad', '$19.99', 'Tender domestic crawfish tails with house seasonings over crisp veggies'],
      ['Cajun Shrimp Salad', '$14.99', 'Plump shrimp in cajun spices over lettuce, tomatoes, cheese, croutons, carrots & cucumbers'],
      ['Large House Salad', '$11.99', 'Lettuce, tomatoes, cheese, croutons, carrots & cucumbers'],
    ],
  },
  {
    title: 'Main Courses',
    subtitle: 'All Main Courses are served with a salad.',
    items: [
      ['Full Alligator Sauce Piquant', '$24.99', 'Tender alligator tail slow cooked in a spicy red tomato sauce over rice'],
      ['Cajun Crab Boil', '$48.99', 'Shrimp, potatoes, sausage, corn, mushrooms + XL crab leg cluster. Drawn butter.'],
      ['Chk/Saus Gumbo Bowl (Clear)', '$11.99', 'Non-traditional garlic & onion “feel good” gumbo'],
      ['Full Chicken Alfredo', '$22.99', 'Scratch alfredo over fresh pasta with zesty cajun chicken breast'],
      ['Full Crawfish Alfredo', '$24.99', 'Domestic crawfish tails over fresh pasta and scratch alfredo'],
      ['Full Crawfish Etouffee', '$18.99', 'Creamy brown buttery gravy with tender crawfish over rice'],
      ['Low Boil Entree', '$24.99', 'Shrimp, potatoes, sausage, corn & mushrooms. Drawn butter.'],
      ['Seafood Gumbo Bowl', '$14.99', 'Dark roux with chicken, sausage, shrimp and crab meat. Rice & optional okra.'],
      ['Full Shrimp & Grits', '$22.99', 'Cheese grits with brown sauce and shrimp'],
      ['Full Shrimp Alfredo', '$22.99', 'Shrimp over fresh pasta with scratch alfredo'],
      ['Full Red Beans & Rice', '$22.99', '48-hr slow cooked beans with sausage over rice'],
      ['Traditional Chk & Sausage Gumbo Bowl', '$11.99', 'Dark roux house-made with chicken and sausage over rice'],
      ['Half Alligator Sauce Piquant', '$12.99', 'Half portion over rice'],
      ['Chk & Saus Gumbo Cup (Clear)', '$6.99', 'Family recipe clear broth cup'],
      ['Half Crawfish Etouffee', '$10.99', 'Half portion over rice'],
      ['Seafood Gumbo Cup', '$8.99', 'Cup size dark roux seafood gumbo'],
      ['Traditional Chk & Sausage Gumbo Cup', '$6.99', 'Cup of dark roux chicken & sausage gumbo'],
    ],
  },
  {
    title: 'Lunch Baskets (11a-3p)',
    subtitle: 'Served with fries; substitutions available.',
    items: [
      ['Full Roast Beef Po-Boy', '$19.99', 'Dressed with lettuce, tomatoes, cajun sauce'],
      ['Full Shrimp Po-Boy', '$18.99', 'Golden fried shrimp, dressed'],
      ['Half Roast Beef Po-Boy', '$14.99', 'Half size classic'],
      ['Half Shrimp Po-Boy', '$12.99', 'Half portion'],
      ['Full Boiled Shrimp Po-Boy', '$18.99', 'Boiled shrimp, dressed'],
      ['Full Catfish Po-Boy', '$18.99', 'Fried catfish, dressed'],
      ['Full Crawfish Po-Boy', '$19.99', 'Crisp crawfish tails, dressed'],
      ['Half Boiled Shrimp Po-Boy', '$12.99', 'Half size boiled shrimp'],
      ['Half Catfish Po-Boy', '$12.99', 'Half catfish'],
      ['Half Crawfish Po-Boy', '$14.99', 'Half crawfish tails'],
      ['Half Smoked Cajun Sausage Po-Boy', '$8.99', 'Smoked sausage, dressed'],
    ],
  },
  {
    title: 'Dinner Po-Boys',
    items: [
      ['Roast Beef Po-Boy', '$19.99', 'Dressed with lettuce, tomatoes, cajun sauce'],
      ['Shrimp Po-Boy', '$18.99', 'Golden fried shrimp, dressed'],
      ['Boiled Shrimp Po-Boy', '$18.99', 'Boiled shrimp, dressed'],
      ['Catfish Po-Boy', '$18.99', 'Fried catfish, dressed'],
      ['Crawfish Po-Boy', '$19.99', 'Crisp crawfish tails, dressed'],
      ['Smoked Cajun Sausage Po-Boy', '$8.99', 'Smoked sausage, dressed'],
    ],
  },
  {
    title: 'Kids Menu',
    subtitle: 'For guests 12 and under.',
    items: [
      ['Kids Catfish Basket', '$8.99', 'Served with fries'],
      ['Kids Popcorn Chicken Basket', '$7.99', 'Served with fries'],
      ['Kids Shrimp Basket', '$8.99', 'Served with fries'],
      ['Kids Crawfish Tail Basket', '$9.99', 'Served with fries'],
    ],
  },
  {
    title: 'Desserts',
    items: [
      ['Beignets', '$8.99', 'Fresh, powdered sugar bliss'],
      ['Cajun Mud Cake', '$7.99', 'Rich, fudgy, and decadent'],
    ],
  },
  {
    title: 'Sides',
    items: [
      ['Cauliflower Bites', '$6.99', 'Lightly fried and seasoned'],
      ['Chicken & Sausage Gumbo Side', '$4.95', 'Dark roux side portion'],
      ['Fried Okra', '$5.99', 'Southern classic'],
      ['Fries', '$4.99', 'Crispy golden'],
      ['House Salad', '$7.99', 'Lettuce, tomatoes, cheese, croutons, carrots, cucumbers'],
      ['Hushpuppies', '$6.99', 'Crisp exterior, tender center'],
      ['Chips', '$6.99', 'Cajun seasoned'],
      ['Traditional Chk & Sausage Gumbo Side', '$4.95', 'Dark roux with chicken & sausage'],
      ['Seafood Gumbo Side Portion', '$5.95', 'Dark roux with chicken, sausage, shrimp, crab'],
    ],
  },
  {
    title: 'Drinks',
    items: [
      ['Arnold Palmer', '$3.00', ''],
      ['Coffee', '$3.00', ''],
      ['Coke / Diet / Zero', '$3.00', ''],
      ['Dr. Pepper', '$3.00', ''],
      ['Half & Half Tea', '$3.00', ''],
      ['Sprite', '$3.00', ''],
      ['Sweet / Unsweet Tea', '$3.00', ''],
      ['Lemonade', '$3.00', ''],
      ['Mellow Yellow', '$3.00', ''],
      ['Powerade', '$3.00', ''],
    ],
  },
  {
    title: 'Baskets',
    items: [
      ['Half Catfish Filet Basket', '$11.99', ''],
      ['Half Crawfish Tails Basket', '$13.99', ''],
      ['Half Snapper Basket', '$12.99', ''],
      ['Half Shrimp Basket', '$11.99', ''],
    ],
  },
];

const MenuSection = ({ title, subtitle, items }) => (
  <section className="relative mb-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
    <div className="flex items-baseline justify-between gap-4 flex-wrap">
      <h2 className="font-serif text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
    </div>
    <div className="mt-6 space-y-6">
      {items.map(([name, price, desc]) => (
        <div
          key={`${title}-${name}`}
          className="flex flex-col gap-2 border-b border-white/5 pb-4 last:border-0 last:pb-0"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg md:text-xl font-bold text-white">{name}</span>
            <span className="text-mardiGold font-black tracking-wide">{price}</span>
          </div>
          {desc && <p className="text-sm text-white/60 leading-relaxed">{desc}</p>}
        </div>
      ))}
    </div>
    <div className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-tr from-mardiGreen to-transparent opacity-20 blur-2xl" />
    <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-gradient-to-bl from-mardiPurple to-transparent opacity-20 blur-2xl" />
  </section>
);

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#080d1b] text-white">
      <Navbar />
      <main className="pt-36 pb-24 container mx-auto px-6">
        <header className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-mardiGold">Our Menu</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl font-black uppercase">
            Feast of <span className="text-mardiGreen">The Cajun Menu</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/70">
            Bold Louisiana classics, made-from-scratch sauces, and seafood boils with Mardi Gras soul.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10">
          {sections.map((section) => (
            <MenuSection key={section.title} {...section} />
          ))}
        </div>
      </main>
    </div>
  );
}
