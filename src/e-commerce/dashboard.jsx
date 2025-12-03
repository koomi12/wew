import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
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
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    }
  }, []);

  const updateQuantity = (cartId, delta) => {
    const updated = cartItems.map((item) =>
      item.cartId === cartId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (cartId) => {
    const updated = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const subtotal = cartItems
    .filter((i) => i.selected !== false)
    .reduce((sum, i) => sum + i.price * i.quantity, 0);

  const saveEdits = () => {
    const updated = cartItems.map((item) =>
      item.cartId === editingItem.cartId ? editingItem : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">

      {/* Header */}
      <header className="bg-orange-500 px-6 py-3 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Tee-Shirt</h1>

        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-white hover:text-orange-100 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Continue Shopping
          </button>

          <button onClick={() => navigate("/profile")} className="hover:opacity-80 transition">
            <img src="/icons/acc.png" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Cart */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {cartItems.length > 0 && (
          <div className="bg-white p-4 mb-4 rounded-lg shadow flex items-center gap-4">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={cartItems.every((i) => i.selected !== false)}
              onChange={(e) => {
                const updated = cartItems.map((i) => ({ ...i, selected: e.target.checked }));
                setCartItems(updated);
                localStorage.setItem("cart", JSON.stringify(updated));
              }}
            />

            <span className="font-medium text-gray-700">Select All</span>

            <button onClick={clearCart} className="ml-auto text-red-500 hover:text-red-600 text-sm">
              Delete All
            </button>
          </div>
        )}

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-3">Your cart is empty</h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.cartId} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">

                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={item.selected !== false}
                  onChange={(e) => {
                    const updated = cartItems.map((c) =>
                      c.cartId === item.cartId ? { ...c, selected: e.target.checked } : c
                    );
                    setCartItems(updated);
                    localStorage.setItem("cart", JSON.stringify(updated));
                  }}
                />

                <img src={item.image} className="w-20 h-20 rounded-md object-cover" />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>

                  {/* Color & Size */}
                  <p className="text-sm text-gray-500">
                    {item.color} • {item.size}  
                    <button
                      onClick={() => setEditingItem(item)}
                      className="ml-3 text-blue-500 underline text-xs"
                    >
                      Edit
                    </button>
                  </p>

                  <p className="mt-1 font-bold text-orange-600 text-lg">
                    ₱ {item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button onClick={() => updateQuantity(item.cartId, -1)} className="px-3">
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartId, 1)} className="px-3">
                    +
                  </button>
                </div>

                <button onClick={() => removeItem(item.cartId)} className="text-red-500">
                  🗑
                </button>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* Shopee Style Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-4 px-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-600">
            <span>Total:</span>
            <span className="text-xl font-bold text-orange-600">
              ₱ {subtotal.toLocaleString()}
            </span>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg">
            Checkout
          </button>
        </div>
      )}

      {/* EDIT VARIATION MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl relative">

            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img src={editingItem.image} className="w-20 h-20 rounded-lg" />
              <div>
                <h3 className="font-bold">{editingItem.name}</h3>
                <p className="text-orange-600 font-semibold">
                  ₱ {editingItem.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="font-semibold text-sm mb-2 block">Select Color</label>
              <div className="grid grid-cols-5 gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() =>
                      setEditingItem({ ...editingItem, color: color.name })
                    }
                    className={`relative w-full aspect-square rounded-lg transition-all ${
                      editingItem.color === color.name
                        ? "ring-4 ring-orange-500 scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      border: color.border ? "2px solid #ccc" : "none",
                    }}
                  >
                    {editingItem.color === color.name && (
                      <svg
                        className="absolute inset-0 m-auto w-5 h-5 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="font-semibold text-sm mb-2 block">Select Size</label>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setEditingItem({ ...editingItem, size })
                    }
                    className={`py-2 px-4 rounded-lg font-semibold text-sm ${
                      editingItem.size === size
                        ? "bg-orange-500 text-white scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdits}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
