import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  const availableColors = [
    { name: "White", hex: "#FFFFFF", border: true },
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1E3A8A" },
    { name: "Gray", hex: "#6B7280" },
    { name: "Red", hex: "#DC2626" },
    { name: "Orange", hex: "#F97316" },
    { name: "Yellow", hex: "#FCD34D" },
    { name: "Green", hex: "#10B981" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Pink", hex: "#EC4899" },
  ];

  const availableSizes = ["XS", "S", "M", "L", "XL", "2XL"];

  useEffect(() => {
    // Load cart count from localStorage
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const cart = JSON.parse(stored);
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    }
  }, []);

  const categories = ["All", "Men's", "Women's", "Unisex"];

  const products = [
    { id: 1, name: "Minimalist Face", price: 199.0, image: "/pic/men2.png", category: "Men's" },
    { id: 2, name: "Minimalist Face", price: 199.0, image: "/pic/men1.png", category: "Men's" },
    { id: 3, name: "Classic Cotton", price: 199.0, image: "/pic/men3.png", category: "Men's" },
    { id: 4, name: "Essential Duo Pack", price: 199.0, image: "/pic/unisex1.jpg", category: "Unisex" },
    { id: 5, name: "Women's Casual Tee", price: 199.0, image: "/pic/women1.jpg", category: "Women's" },
    { id: 6, name: "Men's Sport Tee", price: 199.0, image: "/pic/men3.png", category: "Men's" },
    { id: 7, name: "Unisex Basic White", price: 199.0, image: "/pic/unisex1.jpg", category: "Unisex" },
    { id: 8, name: "Women's V-Neck", price: 199.0, image: "/pic/women1.jpg", category: "Women's" },
    { id: 9, name: "Men's Graphic Tee", price: 199.0, image: "/pic/men3.png", category: "Men's" },
    { id: 10, name: "Unisex Oversized", price: 199.0, image: "/pic/unisex1.jpg", category: "Unisex" },
    { id: 11, name: "Women's Crop Top", price: 199.0, image: "/pic/women1.jpg", category: "Women's" },
    { id: 12, name: "Men's Polo Shirt", price: 199.0, image: "/pic/men1.png", category: "Men's" },
    { id: 13, name: "Unisex Vintage Wash", price: 199.0, image: "/pic/unisex1.jpg", category: "Unisex" },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addToCart = (product) => {
    // Open color/size selection modal
    setSelectedProduct(product);
    setSelectedColor("");
    setSelectedSize("");
  };

  const confirmAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const stored = localStorage.getItem("cart");
    let cart = [];
    
    try {
      cart = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error parsing cart:", e);
    }

    // Create unique item with color and size
    const cartItem = {
      ...selectedProduct,
      color: selectedColor,
      size: selectedSize,
      cartId: `${selectedProduct.id}-${selectedColor}-${selectedSize}` // Unique identifier
    };

    const existingItem = cart.find(
      (item) => item.cartId === cartItem.cartId
    );
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...cartItem, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);

    // Close modal
    setSelectedProduct(null);
    setSelectedColor("");
    setSelectedSize("");

    alert(`${selectedProduct.name} (${selectedColor}, ${selectedSize}) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-500 px-6 py-3 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold min-w-[120px]">Tee-Shirt</h1>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-white rounded-full px-5 py-2 pr-10 outline-none text-sm"
            />
            <img
              src="/icons/search.png"
              alt="Search"
              className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-40"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 min-w-[80px] justify-end">
          <button 
            onClick={() => navigate('/cart')}
            className="hover:opacity-80 transition relative"
          >
            <img src="/icons/cart.png" alt="Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="hover:opacity-80 transition"
          >
            <img src="/icons/acc.png" alt="User" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Category Filters */}
      <div className="bg-white px-6 py-4 flex items-center justify-center gap-4 shadow-sm">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all text-sm ${
              activeCategory === category
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <main className="px-6 py-5">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
                style={{ boxShadow: "0 4px 12px rgba(249,115,22,0.5)" }}
              >
                {/* Product Image */}
                <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-md transition-transform duration-300 hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow"
                  >
                    <img
                      src={
                        favorites[product.id]
                          ? "/icons/filled-heart.png"
                          : "/icons/heart.png"
                      }
                      alt="Favorite"
                      className="w-4 h-4"
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 bg-orange-50">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-bold text-sm">
                      ₱ {product.price.toFixed(2)}
                    </span>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </main>

      {/* Color & Size Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6">
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>

            {/* Product Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-orange-600 font-semibold">
                  ₱ {selectedProduct.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Color {selectedColor && `(${selectedColor})`}
              </label>
              <div className="grid grid-cols-5 gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-full aspect-square rounded-lg transition-all ${
                      selectedColor === color.name
                        ? "ring-4 ring-orange-500 scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      border: color.border ? "2px solid #e5e7eb" : "none",
                    }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <svg
                        className="absolute inset-0 m-auto w-5 h-5 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                      selectedSize === size
                        ? "bg-orange-500 text-white ring-2 ring-orange-500 scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={confirmAddToCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedColor || !selectedSize}
            >
              Add to Cart
            </button>

            {!selectedColor || !selectedSize ? (
              <p className="text-xs text-gray-500 text-center mt-2">
                Please select both color and size
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}