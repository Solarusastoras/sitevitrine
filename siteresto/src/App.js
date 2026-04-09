import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuGrid from './components/MenuGrid';
import AddDishForm from './components/AddDishForm';
import OpeningHours from './components/OpeningHours';
import MapSection from './components/MapSection';
import ThemeSelector from './components/ThemeSelector';
import Footer from './components/Footer';
import Login from './components/Login';
import { supabase } from './supabase';
import './App.scss';

const INITIAL_DISHES = [
  {
    name: "Filet de Boeuf aux Morilles",
    description: "Un tendre filet de bœuf servi avec une sauce crémeuse aux morilles et des pommes de terre grenailles.",
    price: "28.50",
    category: "Plats",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Tarte Tatin Maison",
    description: "Pommes caramélisées, pâte feuilletée croustillante, servie avec une boule de glace vanille.",
    price: "9.00",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac4b7fcb?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Salade César Royale",
    description: "Poulet grillé, croûtons, parmesan, œuf poché et sauce César maison.",
    price: "16.50",
    category: "Entrée",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Vin Rouge - Bordeaux",
    description: "Un vin rouge élégant avec des notes de fruits rouges et d'épices.",
    price: "32.00",
    category: "Boisson",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Foie Gras Maison",
    description: "Foie gras de canard mi-cuit, chutney de figues et brioche toastée.",
    price: "18.00",
    category: "Entrée",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Carpaccio de Saint-Jacques",
    description: "Noix de Saint-Jacques marinées aux agrumes, baies roses et huile d'olive.",
    price: "16.00",
    category: "Entrée",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Millefeuille à la Vanille de Madagascar",
    description: "Pâte feuilletée légère, crème diplomate vanille et caramel beurre salé.",
    price: "10.50",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Fondant au Chocolat Noir",
    description: "Cœur coulant au chocolat Valrhona, glace stracciatella.",
    price: "9.50",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Cocktail Signature Le Jardin",
    description: "Gin infusé au romarin, liqueur de fleur de sureau, citron vert, tonic.",
    price: "12.00",
    category: "Boisson",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    name: "Champagne Blanc de Blancs",
    description: "Une coupe de notre sélection de champagne grand cru, bulles fines.",
    price: "14.00",
    category: "Boisson",
    image: "https://images.unsplash.com/photo-1590847959085-f5bb17b6ced4?auto=format&fit=crop&q=80&w=1000"
  }
];

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('restaurant-theme') || 'premium');

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchDishes();

    return () => subscription.unsubscribe();
  }, []);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setDishes(data);
      } else {
        setDishes(INITIAL_DISHES);
      }
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setDishes(INITIAL_DISHES);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('restaurant-theme', newTheme);
  };

  const [platDuJour] = useState(INITIAL_DISHES[0]);

  const handleAddDish = async (newDish) => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .insert([newDish])
        .select();

      if (error) throw error;

      if (data) {
        setDishes([data[0], ...dishes]);
      }

      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Erreur lors de l\'ajout du plat.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="App" data-theme={theme}>
      <Header
        user={user}
        onLogout={handleLogout}
        onToggleLogin={() => setShowLogin(true)}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />
      <main>
        <Hero platDuJour={platDuJour} />
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Chargement de la carte...</p>
          </div>
        ) : (
          <MenuGrid dishes={dishes} />
        )}
        <OpeningHours />
        <MapSection />
        {user && (
          <section className="admin-controls container">
            <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
            <AddDishForm onAddDish={handleAddDish} />
          </section>
        )}
      </main>
      <Footer />
      {showLogin && !user && <Login onLogin={(u) => { setShowLogin(false); setUser(u); }} />}
    </div>
  );
}

export default App;
