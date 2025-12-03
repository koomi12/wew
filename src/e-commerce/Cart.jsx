import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // 🔥 EDIT MODAL
  const navigate = useNavigate();

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

  const removeItem = (cartId) => {
    const updated = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (cartId, delta) => {
    const updated = cartItems.map((item) =>
      item.cartId === cartId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const saveEdits = () => {
    const updated = cartItems.map((item) =>
      item.cartId === editingItem.cartId ? editingItem : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setEditingItem(null); // Close modal
  };

  const subtotal = cartItems
    .filter((item) => item.selected !== false)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </button>
          <button onClick={() => navigate("/profile")}>
            <img src="/icons/acc.png" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {cartItems.length > 0 && (
          <div className="bg-white p-4 mb-4 rounded-lg shadow flex items-center gap-4">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={cartItems.every((item) => item.selected !== false)}
              onChange={(e) => {
                const updated = cartItems.map((item) => ({
                  ...item,
                  selected: e.target.checked,
                }));
                setCartItems(updated);
                localStorage.setItem("cart", JSON.stringify(updated));
              }}
            />
            <span className="font-medium text-gray-700">Select All</span>
            <button onClick={clearCart} className="ml-auto text-red-500">
              Delete All
            </button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-orange-500 text-white px-6 py-3 rounded-full mt-3"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={item.selected !== false}
                  onChange={(e) => {
                    const updated = cartItems.map((c) =>
                      c.cartId === item.cartId
                        ? { ...c, selected: e.target.checked }
                        : c
                    );
                    setCartItems(updated);
                    localStorage.setItem("cart", JSON.stringify(updated));
                  }}
                />

                <img src={item.image} className="w-20 h-20 rounded-md" />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>

                  {/* 🔥 Size & Color */}
                  <p className="text-sm text-gray-500">
                    {item.color} • {item.size}
                  </p>

                  {/* EDIT BUTTON */}
                  <button
                    className="text-blue-600 text-sm hover:underline mt-1"
                    onClick={() => setEditingItem(item)}
                  >
                    Edit Variation
                  </button>

                  <p className="mt-1 font-bold text-orange-600 text-lg">
                    ₱ {item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => updateQuantity(item.cartId, -1)}
                    className="px-3 py-1"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, 1)}
                    className="px-3 py-1"
                  >
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

      {/* FOOTER CHECKOUT */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-4 px-6 flex items-center justify-between">
          <div className="text-gray-600">
            Total:{" "}
            <span className="text-xl font-bold text-orange-600">
              ₱ {subtotal.toLocaleString()}
            </span>
          </div>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg">
            Checkout
          </button>
        </div>
      )}

      {/* ─────────────────────────────── */}
      {/* 🔥 EDIT VARIATION POPUP MODAL */}
      {/* ─────────────────────────────── */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-4">Edit Variation</h2>

            {/* COLOR */}
            <p className="font-medium mb-1">Color:</p>
            <div className="flex gap-2 mb-4">
              {["Red", "Black", "White", "Blue"].map((color) => (
                <button
                  key={color}
                  onClick={() => setEditingItem({ ...editingItem, color })}
                  className={`px-3 py-1 rounded border ${
                    editingItem.color === color
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* SIZE */}
            <p className="font-medium mb-1">Size:</p>
            <div className="flex gap-2 mb-4">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setEditingItem({ ...editingItem, size })}
                  className={`px-3 py-1 rounded border ${
                    editingItem.size === size
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
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
