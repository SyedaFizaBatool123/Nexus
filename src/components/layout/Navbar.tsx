import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, MessageCircle, User, LogOut, Building2, 
  CircleDollarSign, Calendar, Video, FileText, CreditCard 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper function for smooth scrolling to sections
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname.includes('/dashboard')) {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on dashboard, navigate there first
      navigate(user?.role === 'entrepreneur' ? `/dashboard/entrepreneur#${id}` : `/dashboard/investor#${id}`);
    }
  };
  
  const dashboardRoute = user?.role === 'entrepreneur' 
    ? '/dashboard/entrepreneur' 
    : '/dashboard/investor';
  
  const profileRoute = user 
    ? `/profile/${user.role}/${user.id}` 
    : '/login';
  
  const navLinks = [
    {
      icon: user?.role === 'entrepreneur' ? <Building2 size={18} /> : <CircleDollarSign size={18} />,
      text: 'Dashboard',
      path: dashboardRoute,
    },
    // --- NEW MILESTONE 7 CONNECTIONS ---
    {
      icon: <Calendar size={18} />,
      text: 'Meetings',
      onClick: () => scrollToSection('meetings-section'),
    },
    {
      icon: <Video size={18} />,
      text: 'Video Call',
      onClick: () => scrollToSection('video-call-section'),
    },
    {
      icon: <FileText size={18} />,
      text: 'Documents',
      onClick: () => scrollToSection('document-chamber'),
    },
    {
      icon: <CreditCard size={18} />,
      text: 'Payments',
      onClick: () => scrollToSection('payment-portal'),
    },
    // ---------------------------------
    {
      icon: <MessageCircle size={18} />,
      text: 'Messages',
      path: user ? '/messages' : '/login',
    },
    {
      icon: <Bell size={18} />,
      text: 'Notifications',
      path: user ? '/notifications' : '/login',
    }
  ];
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">Business Nexus</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:ml-6">
            {user ? (
              <div className="flex items-center space-x-1">
                {navLinks.map((link, index) => (
                  link.path ? (
                    <Link
                      key={index}
                      to={link.path}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <span className="mr-1.5 text-gray-400">{link.icon}</span>
                      {link.text}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={link.onClick}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <span className="mr-1.5 text-gray-400">{link.icon}</span>
                      {link.text}
                    </button>
                  )
                ))}
                
                <div className="h-6 w-px bg-gray-200 mx-2" />

                <Link to={profileRoute} className="flex items-center space-x-2 px-3">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="xs"
                    status={user.isOnline ? 'online' : 'offline'}
                  />
                  <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                </Link>

                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login"><Button variant="outline">Log in</Button></Link>
                <Link to="/register"><Button>Sign up</Button></Link>
              </div>
            )}
          </div>
          
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-700 hover:bg-gray-50">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-1">
          {user && navLinks.map((link, index) => (
            link.path ? (
              <Link key={index} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 text-base font-medium text-gray-700 border-b border-gray-50">
                <span className="mr-4">{link.icon}</span> {link.text}
              </Link>
            ) : (
              <button key={index} onClick={link.onClick} className="flex w-full items-center py-3 text-base font-medium text-gray-700 border-b border-gray-50">
                <span className="mr-4">{link.icon}</span> {link.text}
              </button>
            )
          ))}
          {user && (
            <button onClick={handleLogout} className="flex w-full items-center py-3 text-base font-medium text-red-600">
              <LogOut size={18} className="mr-4" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};