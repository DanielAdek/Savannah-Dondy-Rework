import React, { useState } from 'react';
import { Search, ShoppingCart, User, Bell, ChevronDown, MapPin, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';


const categories = [
  'All', 'Motors', 'Fashion', 'Electronics', 'Collectibles', 'Sports', 
  'Health & Beauty', 'Home & Garden', 'Toys', 'Business & Industrial'
];

const watchesShoes: Product[] = [
  {
    id: 1,
    title: "Apple Watch Series 9 GPS 45mm Midnight Aluminum Case",
    price: 329.99,
    originalPrice: 429.99,
    image: "https://i.ebayimg.com/images/g/mhQAAOSw3dNnkUry/s-l500.webp",
    rating: 4.8,
    reviews: 2341,
    shipping: "Free shipping",
    seller: "Apple Store",
    discount: 23,
    badge: "TRENDING"
  },
  {
    id: 2,
    title: "Nike Air Jordan 1 Retro High OG Chicago",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://i.ebayimg.com/images/g/0p4AAeSw~XVoQii7/s-l500.webp",
    rating: 4.7,
    reviews: 1892,
    shipping: "Free shipping",
    seller: "Nike Official",
    discount: 24,
    badge: "HOT DEAL"
  },
  {
    id: 3,
    title: "Rolex Submariner Date 41mm Steel Watch",
    price: 8999.99,
    image: "https://i.ebayimg.com/images/g/SKsAAeSwAHVoau8Q/s-l500.webp",
    rating: 4.9,
    reviews: 156,
    shipping: "Free shipping",
    seller: "Luxury Watches",
    badge: "POPULAR"
  },
  {
    id: 4,
    title: "Adidas Ultraboost 22 Running Shoes",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://i.ebayimg.com/thumbs/images/g/T6kAAOSwAr5jYN9F/s-l400.webp",
    rating: 4.6,
    reviews: 934,
    shipping: "Free shipping",
    seller: "Adidas Store",
    discount: 28
  },
  {
    id: 5,
    title: "Samsung Galaxy Watch 6 Classic 47mm",
    price: 349.99,
    originalPrice: 429.99,
    image: "https://i.ebayimg.com/thumbs/images/g/GoQAAOSwkYxdQQKr/s-l400.webp",
    rating: 4.5,
    reviews: 1234,
    shipping: "Free shipping",
    seller: "Samsung Official",
    discount: 19
  },
  {
    id: 6,
    title: "Converse Chuck Taylor All Star High Top",
    price: 54.99,
    originalPrice: 64.99,
    image: "https://i.ebayimg.com/thumbs/images/g/MlcAAeSwNrZoX6lq/s-l400.webp",
    rating: 4.4,
    reviews: 2567,
    shipping: "Free shipping",
    seller: "Converse Store",
    discount: 15
  }
];

const vehicleParts: Product[] = [
  {
    id: 7,
    title: "Premium Brake Pads Set - Front & Rear",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://i.ebayimg.com/thumbs/images/g/4g0AAOSwoZJiDrXP/s-l960.webp",
    rating: 4.6,
    reviews: 456,
    shipping: "Free shipping",
    seller: "Auto Parts Pro",
    discount: 25,
    badge: "BEST SELLER"
  },
  {
    id: 8,
    title: "LED Headlight Bulbs H11 Super Bright",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://i.ebayimg.com/thumbs/images/g/gSIAAOSwJu1iDrXT/s-l960.webp",
    rating: 4.7,
    reviews: 789,
    shipping: "Free shipping",
    seller: "Bright Lights Co",
    discount: 33
  },
  {
    id: 9,
    title: "Universal Car Floor Mats Set of 4",
    price: 29.99,
    originalPrice: 49.99,
    image: "https://i.ebayimg.com/thumbs/images/g/rbwAAOSwPnBiDrXY/s-l960.webp",
    rating: 4.3,
    reviews: 1123,
    shipping: "Free shipping",
    seller: "Auto Accessories",
    discount: 40
  },
  {
    id: 10,
    title: "Performance Air Filter High Flow",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://i.ebayimg.com/thumbs/images/g/hpkAAOSwlAJiDrXc/s-l960.webp",
    rating: 4.5,
    reviews: 567,
    shipping: "Free shipping",
    seller: "Performance Parts",
    discount: 29
  }
];

const suggestedQuestions = [
  "What are your shipping options?",
  "How can I track my order?",
  "What is your return policy?",
  "Do you offer buyer protection?",
  "How do I become a seller?",
  "What payment methods do you accept?"
];

const EmporiumStore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, isUser: boolean, timestamp: Date}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const handleStartChat = () => {
    if (customerName.trim()) {
      setChatStarted(true);
      setChatMessages([
        {
          id: 1,
          text: `Hi ${customerName}! 👋 Welcome to Emporium Store. How can I help you today?`,
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    
  }

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: currentMessage,
        isUser: true,
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, newMessage]);
      setCurrentMessage('');
      
      // Simulate auto-reply
      setTimeout(() => {
        const autoReply = {
          id: chatMessages.length + 2,
          text: "Thank you for your message! Our team will get back to you shortly. In the meantime, you can browse our help center or check out our latest deals.",
          isUser: false,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hi! <span className="text-blue-600 hover:underline cursor-pointer">Sign in</span> or <span className="text-blue-600 hover:underline cursor-pointer">register</span></span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Daily Deals</span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Help & Contact</span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Sell</span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Watchlist</span>
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.87 2.34-2.17 3.5-3.5.36-.42.68-.85 1-1.28.31-.43.58-.86.84-1.29C18.16 17 22 12.55 22 7L12 2z"/>
                    <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Emporium Store
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Shop by category <ChevronDown className="w-4 h-4 inline ml-1" /></span>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
              <User className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Find it. Love it. Buy it.</h2>
          <p className="text-xl mb-8">Discover amazing deals on millions of items</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Shopping
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchesShoes.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...watchesShoes.slice(2, 4), ...vehicleParts.slice(0, 2)].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Hot Deals Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Hot Deals</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicleParts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Watches & Shoes Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Watches & Shoes</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchesShoes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $35</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Buyer Protection</h3>
              <p className="text-gray-600">Your purchase is protected</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.87 2.34-2.17 3.5-3.5.36-.42.68-.85 1-1.28.31-.43.58-.86.84-1.29C18.16 17 22 12.55 22 7L12 2z"/>
                    <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Emporium Store
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                The world's online marketplace where you can buy and sell almost anything.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-700 p-2 rounded hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">Facebook</span>
                </div>
                <div className="bg-gray-700 p-2 rounded hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">Twitter</span>
                </div>
                <div className="bg-gray-700 p-2 rounded hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">Instagram</span>
                </div>
              </div>
            </div>

            {/* Buy */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Buy</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Registration</a></li>
                <li><a href="#" className="hover:text-white">eBay Money Back Guarantee</a></li>
                <li><a href="#" className="hover:text-white">Bidding & buying help</a></li>
                <li><a href="#" className="hover:text-white">Stores</a></li>
                <li><a href="#" className="hover:text-white">eBay for Charity</a></li>
              </ul>
            </div>

            {/* Sell */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Start selling</a></li>
                <li><a href="#" className="hover:text-white">How to sell</a></li>
                <li><a href="#" className="hover:text-white">Business sellers</a></li>
                <li><a href="#" className="hover:text-white">Affiliates</a></li>
                <li><a href="#" className="hover:text-white">Developer</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help & Contact</a></li>
                <li><a href="#" className="hover:text-white">Resolution Center</a></li>
                <li><a href="#" className="hover:text-white">Seller Center</a></li>
                <li><a href="#" className="hover:text-white">Policies</a></li>
                <li><a href="#" className="hover:text-white">Site Map</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <span>© 2024 Emporium Store Inc. All rights reserved.</span>
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Cookies</a>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">United States</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-7 right-7 z-50">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
          </button>
        )}

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-100 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-1 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.87 2.34-2.17 3.5-3.5.36-.42.68-.85 1-1.28.31-.43.58-.86.84-1.29C18.16 17 22 12.55 22 7L12 2z"/>
                    <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white" fillOpacity="0.3"/>
                  </svg>
                </div>
                <span className="font-semibold">Emporium Store</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-purple-500 rounded-full p-1 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {!chatStarted ? (
              /* Chat Start Form */
              <div className="flex-1 p-4 bg-blue-50">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Hi 👋</h3>
                  <p className="text-sm text-gray-600">We are available to reply all your requests or questions about Emporium Store</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        🇳🇬 +234
                      </span>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember Me</label>
                  </div>

                  <button
                    onClick={handleStartChat}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-md font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Start Chat
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">Or chat with us on</p>
                  <div className="flex justify-center space-x-4">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">W</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">M</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">I</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                          : 'bg-white text-gray-800 border'
                      }`}>
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested Questions */}
                {chatMessages.length === 1 && (
                  <div className="px-4 py-2 bg-white border-t">
                    <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                    <div className="space-y-1">
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Input */}
                <div className="p-4 bg-white border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmporiumStore;

