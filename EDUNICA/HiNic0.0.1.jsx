import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Book, Gamepad2, Users, FileText, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import StoryCard from '@/components/StoryCard';
import InteractiveMap from '@/components/InteractiveMap';
import CulturalCalendar from '@/components/CulturalCalendar';
import KnowledgeLibrary from '@/components/KnowledgeLibrary';
import EducationalGames from '@/components/EducationalGames';
import CreateStoryModal from '@/components/CreateStoryModal';
import AuthPage from '@/pages/AuthPage';
import logo from './assets/logo.png';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('hinic_user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, [location.pathname]);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('hinic_user', JSON.stringify({ role }));
    navigate('/');
    toast({
      title: "¡Bienvenido/a de vuelta!",
      description: `Has iniciado sesión como ${role}.`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('hinic_user');
    navigate('/auth');
    toast({
      title: "Has cerrado sesión",
      description: "¡Esperamos verte pronto!",
    });
  };

  const navigationItems = [
    { id: 'home', label: 'Inicio', icon: Users },
    { id: 'stories', label: 'Relatos', icon: FileText },
    { id: 'map', label: 'Mapa Cultural', icon: MapPin },
    { id: 'calendar', label: 'Calendario', icon: Calendar },
    { id: 'library', label: 'Biblioteca', icon: Book },
    { id: 'games', label: 'Juegos', icon: Gamepad2 }
  ];

  const featuredStories = [
    {
      id: 1,
      title: "La Leyenda del Güegüense",
      author: "Doña María González",
      location: "Masaya",
      type: "video",
      likes: 234,
      description: "Una representación tradicional que mantiene viva nuestra identidad cultural...",
      image: "Traditional Nicaraguan Güegüense dance performance with colorful masks and costumes"
    },
    {
      id: 2,
      title: "Receta del Gallo Pinto Tradicional",
      author: "Chef Carlos Mendoza",
      location: "Granada",
      type: "text",
      likes: 189,
      description: "El secreto familiar para preparar el auténtico gallo pinto nicaragüense...",
      image: "Traditional Nicaraguan gallo pinto dish with rice and beans on a colorful plate"
    },
    {
      id: 3,
      title: "Cantos de Trabajo en el Campo",
      author: "Don Roberto Flores",
      location: "Estelí",
      type: "audio",
      likes: 156,
      description: "Los cantos que acompañan la siembra y cosecha en nuestros campos...",
      image: "Nicaraguan farmers working in coffee fields with traditional tools"
    }
  ];

  const MainApp = () => {
    const renderContent = () => {
      switch (activeSection) {
        case 'stories':
          return (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-hinic-dark-blue">Relatos Comunitarios</h2>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-hinic-orange text-white hover:bg-hinic-orange/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Compartir Relato
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </div>
          );
        case 'map':
          return <InteractiveMap />;
        case 'calendar':
          return <CulturalCalendar />;
        case 'library':
          return <KnowledgeLibrary />;
        case 'games':
          return <EducationalGames />;
        default:
          return (
            <div className="space-y-12">
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 py-12"
              >
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="w-40 h-40 flex items-center justify-center">
                      <img alt="Logo de HiNic con el ave motmot" src={logo} className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
                <p className="text-xl text-hinic-dark-blue max-w-3xl mx-auto leading-relaxed">
                  Preservemos juntos nuestro patrimonio cultural. Un espacio donde las tradiciones, 
                  saberes y memorias de nuestro pueblo cobran vida para las nuevas generaciones.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Button 
                    onClick={() => setActiveSection('stories')}
                    className="bg-hinic-teal text-white hover:bg-hinic-teal/90 px-8 py-3 text-lg"
                  >
                    Explorar Relatos
                  </Button>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    variant="outline" 
                    className="border-2 border-hinic-orange text-hinic-orange hover:bg-hinic-orange/10 px-8 py-3 text-lg"
                  >
                    Compartir Historia
                  </Button>
                </div>
              </motion.div>
  
              {/* Featured Stories */}
              <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-center text-hinic-dark-blue">Relatos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <StoryCard story={story} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
  
              {/* Features Grid */}
              <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[
                  {
                    icon: MapPin,
                    title: "Mapa Cultural",
                    description: "Explora memorias geolocalizadas por toda Nicaragua",
                    color: "bg-hinic-teal",
                    action: () => setActiveSection('map')
                  },
                  {
                    icon: Calendar,
                    title: "Calendario Tradicional",
                    description: "Eventos, ferias y festividades de nuestro pueblo",
                    color: "bg-hinic-orange",
                    action: () => setActiveSection('calendar')
                  },
                  {
                    icon: Book,
                    title: "Biblioteca Popular",
                    description: "Saberes, recetas y costumbres ancestrales",
                    color: "bg-hinic-mint",
                    action: () => setActiveSection('library')
                  },
                  {
                    icon: Gamepad2,
                    title: "Juegos Didácticos",
                    description: "Aprende sobre identidad y valores patrios",
                    color: "bg-hinic-brown",
                    action: () => setActiveSection('games')
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-effect rounded-xl p-6 cursor-pointer group"
                    onClick={feature.action}
                  >
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-hinic-dark-blue mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.section>
            </div>
          );
      }
    };

    return (
      <div className="min-h-screen cultural-pattern">
        <Helmet>
          <title>HiNic - Preservando Nuestro Patrimonio Cultural</title>
          <meta name="description" content="Aplicación educativa para preservar, registrar y compartir saberes populares, culturales y tradiciones de Nicaragua. Involucra al sistema educativo, familias y comunidades." />
        </Helmet>
  
        {/* Navigation */}
        <nav className="glass-effect border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSection('home')}>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img alt="Logo de HiNic con el ave motmot" src={logo} className="w-full h-full object-contain" />
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-hinic-teal text-white'
                        : 'text-hinic-dark-blue hover:bg-hinic-teal/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
  
              <div className="flex items-center gap-2">
                {userRole === 'administrador' && (
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-hinic-orange text-white hover:bg-hinic-orange/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear
                  </Button>
                )}
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 text-hinic-dark-blue" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Mobile Navigation */}
        <div className="md:hidden glass-effect border-t fixed bottom-0 left-0 right-0 z-50">
          <div className="flex justify-around py-2">
            {navigationItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${
                  activeSection === item.id ? 'text-hinic-teal' : 'text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
  
        {/* Create Story Modal */}
        <CreateStoryModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
        />
  
        <Toaster />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
      <Route path="/*" element={isAuthenticated ? <MainApp /> : <AuthPage onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;