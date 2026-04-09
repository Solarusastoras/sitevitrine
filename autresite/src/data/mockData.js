export const CATEGORIES = [
  { id: 'haut', name: 'Haut' },
  { id: 'bas', name: 'Bas' },
  { id: 'chaussures', name: 'Chaussures' },
  { id: 'lingerie', name: 'Lingerie' },
  { id: 'accessoires', name: 'Accessoires' },
];

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Veste Structurée Noire',
    price: 189.99,
    gender: 'femme',
    subCategory: 'haut',
    image: '/images/p1.png',
    description: 'Une veste aux lignes épurées et structurées, parfaite pour une allure élégante.',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Manteau en Laine Beige',
    price: 249.99,
    gender: 'homme',
    subCategory: 'haut',
    image: '/images/p2.png',
    description: 'Confort et distinction avec ce manteau hivernal haut de gamme.',
    isNew: false,
  },
  {
    id: 'p3',
    name: 'Robe en Jean',
    price: 155.00,
    gender: 'femme',
    subCategory: 'haut',
    image: '/images/p3.png',
    description: 'Une robe en jean intemporelle, coupe moderne et décontractée pour un look urbain.',
    isNew: true,
  },
  {
    id: 'p4',
    name: 'Sweat Oversize Éco-Coton',
    price: 85.00,
    gender: 'homme',
    subCategory: 'haut',
    image: '/images/p4.png',
    description: 'Le sweat parfait urbain, respectueux de l\'environnement et ample.',
    isNew: false,
  },
  {
    id: 'p5',
    name: 'Sac à Bandoulière Cuir',
    price: 320.00,
    gender: 'femme',
    subCategory: 'accessoires',
    image: '/images/p5.png',
    description: 'Accessoire intemporel en cuir véritable pour toutes vos sorties.',
    isNew: false,
  },
  {
    id: 'p6',
    name: 'Pantalon Tailleur Lin',
    price: 110.00,
    gender: 'femme',
    subCategory: 'bas',
    image: '/images/p6.png',
    description: 'Léger et élégant, le compagnon idéal de vos étés.',
    isNew: true,
  },
  {
    id: 'p7',
    name: 'Chemise en Soie Blanche',
    price: 135.00,
    gender: 'femme',
    subCategory: 'haut',
    image: '/images/p7.png',
    description: 'Une chemise fluide et raffinée pour une touche de luxe au quotidien.',
    isNew: true,
  },
  {
    id: 'p8',
    name: 'Jean Coupe Droite',
    price: 95.00,
    gender: 'homme',
    subCategory: 'bas',
    image: '/images/p8.png',
    description: 'Le basique indispensable, résistant et confortable.',
    isNew: false,
  },
  {
    id: 'p9',
    name: 'Ensemble Dentelle Fine',
    price: 120.00,
    gender: 'femme',
    subCategory: 'lingerie',
    image: '/images/p9.png',
    description: 'Délicatesse et sensualité avec cet ensemble en dentelle artisanale.',
    isNew: true,
  },
  {
    id: 'p10',
    name: 'Baskets Urbaines',
    price: 145.00,
    gender: 'homme',
    subCategory: 'chaussures',
    image: '/images/p10.png',
    description: 'Style et confort pour vos déplacements citadins.',
    isNew: true,
  }
];

export const HERO_CONTENT = {
  title: 'Collection Été 2026',
  subtitle: 'Redéfinissez votre style avec nos nouvelles pièces exclusives.',
  ctaText: 'Découvrir la collection',
  heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'
};

export const STORE_INFO = {
  address: "1 Place Vendôme, 75001 Paris",
  phone: "+33 1 23 45 67 89",
  email: "contact@vetements-studio.com",
  coordinates: { lat: 48.8675, lng: 2.3294 },
  hours: [
    { day: "Lundi - Vendredi", time: "10:00 - 19:30" },
    { day: "Samedi", time: "11:00 - 20:00" },
    { day: "Dimanche", time: "Sur rendez-vous" }
  ]
};
