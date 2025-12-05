import { useState, useEffect } from "react";

export default function EnhancedProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    // Simulate loading user info
    setUserInfo({
      email: "user@example.com",
      role: "user",
      name: "John Doe",
      phone: "+63 912 345 6789",
      joinedDate: "January 15, 2024",
      profilePic: null
    });

    // Simulate user orders
    setUserOrders([
      {
        id: "ORD001",
        items: 3,
        total: 597.00,
        date: "Dec 01, 2024",
        status: "delivered"
      },
      {
        id: "ORD002",
        items: 1,
        total: 199.00,
        date: "Nov 28, 2024",
        status: "shipped"
      },
      {
        id: "ORD003",
        items: 2,
        total: 398.00,
        date: "Nov 15, 2024",
        status: "pending"
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "delivered":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-500 px-6 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-white text-2xl font-bold">My Profile</h1>
        
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-orange-100 transition flex items-center gap-2 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Shop
          </button>

          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition text-sm">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-8 text-white">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              {/* User Info */}
              <div>
                <h2 className="text-3xl font-bold mb-1">{userInfo.name}</h2>
                <p className="text-orange-100 text-sm mb-2">{userInfo.email}</p>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {userInfo.role.toUpperCase()} ACCOUNT
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === "info"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Account Information</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === "orders"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-sm">Order History ({userOrders.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "info" ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h3>
            
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-gray-900 font-medium">{userInfo.email}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="text-gray-900 font-medium">{userInfo.name}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="text-gray-900 font-medium">{userInfo.phone}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="text-gray-900 font-medium">{userInfo.joinedDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t space-y-3">
              <button className="w-full flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="font-medium">Edit Profile</span>
              </button>

              <button className="w-full flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="font-medium">Change Password</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Order History</h3>
              <span className="text-sm text-gray-600">{userOrders.length} total orders</span>
            </div>

            <div className="space-y-4">
              {userOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order ID</p>
                      <p className="font-semibold text-gray-900">#{order.id}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Items</p>
                      <p className="font-medium text-gray-900">{order.items} item(s)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="font-semibold text-orange-600">₱ {order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order Date</p>
                      <p className="font-medium text-gray-900">{order.date}</p>
                    </div>
                  </div>

                  <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}