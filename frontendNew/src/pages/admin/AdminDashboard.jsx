// // src/pages/admin/AdminDashboard.jsx

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   ShoppingCart,
//   CalendarCheck,
//   Users,
//   Plus,
//   LogOut,
// } from "lucide-react";
// import { getAdminDashboardSummary } from "../../services/admin/adminService";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const adminLinks = [
//   { label: "Manage Blogs", icon: <FileText className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-blogs" },
//   { label: "Manage Products", icon: <ShoppingCart className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-products" },
//   { label: "Manage Puja Bookings", icon: <CalendarCheck className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-puja-bookings" },
//   { label: "Manage Users", icon: <Users className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/manage-users" },
//   { label: "All Orders", icon: <LayoutDashboard className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/orders" },
//   { label: "Add Blog", icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/add-blog" },
//   { label: "Add Product", icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />, path: "/admin/add-product" },
//   { label: "Logout", icon: <LogOut className="w-5 h-5 text-red-600" />, path: "/logout" },
// ];

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await getAdminDashboardSummary();
//         setStats(data?.data || {});
//       } catch (error) {
//         console.error("Dashboard summary fetch failed", error);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">Admin Dashboard</h1>

//         {/* Summary Cards */}
//         {stats && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
//             <SummaryCard label="Users" count={stats.totalUsers} />
//             <SummaryCard label="Bookings" count={stats.totalBookings} />
//             <SummaryCard label="Blogs" count={stats.totalBlogs} />
//             <SummaryCard label="Products" count={stats.totalProducts} />
//             <SummaryCard label="Orders" count={stats.totalOrders} />
//           </div>
//         )}

//         {/* Chart Section */}
//         {stats?.last7DaysStats && (
//           <div className="bg-white rounded-xl shadow p-6 mb-10">
//             <h2 className="text-xl font-semibold text-[#4A1C1C] mb-4">Bookings & Orders (Last 7 Days)</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={stats.last7DaysStats}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="bookings" fill="#4A1C1C" name="Bookings" />
//                 <Bar dataKey="orders" fill="#9D4EDD" name="Orders" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}

//         {/* Action Links */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {adminLinks.map((link) => (
//             <Link
//               to={link.path}
//               key={link.label}
//               className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-300 border-l-4 border-[#4A1C1C]"
//             >
//               {link.icon}
//               <span className="text-lg font-medium text-[#4A1C1C]">{link.label}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SummaryCard = ({ label, count }) => (
//   <div className="bg-white p-4 rounded-lg shadow text-center">
//     <p className="text-sm text-gray-500">{label}</p>
//     <p className="text-2xl font-bold text-[#4A1C1C]">{count ?? 0}</p>
//   </div>
// );

// export default AdminDashboard;














// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FileText,
//   ShoppingCart,
//   CalendarCheck,
//   Users,
//   Plus,
//   LogOut,
//   PackageSearch,
//   User,
//   ClipboardList,
// } from "lucide-react";
// import { getAdminDashboardSummary } from "../../services/admin/adminService";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const adminLinks = [
//   {
//     label: "Manage Blogs",
//     icon: <FileText className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/manage-blogs",
//   },
//   {
//     label: "Manage Products",
//     icon: <ShoppingCart className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/manage-products",
//   },
//   {
//     label: "Manage Puja Bookings",
//     icon: <CalendarCheck className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/manage-puja-bookings",
//   },
//   {
//     label: "Manage Users",
//     icon: <Users className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/manage-users",
//   },
//   {
//     label: "All Orders",
//     icon: <LayoutDashboard className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/orders",
//   },
//   {
//     label: "Add Blog",
//     icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/add-blog",
//   },
//   {
//     label: "Add Product",
//     icon: <Plus className="w-5 h-5 text-[#4A1C1C]" />,
//     path: "/admin/add-product",
//   },
//   {
//     label: "Logout",
//     icon: <LogOut className="w-5 h-5 text-red-600" />,
//     path: "/logout",
//   },
// ];

// const AdminDashboard = () => {
//   const [summary, setSummary] = useState(null);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const data = await getAdminDashboardSummary();
//         setSummary(data);
//       } catch (err) {
//         console.error("Failed to fetch summary", err);
//       }
//     };
//     fetchSummary();
//   }, []);

//   const statCards = [
//     { label: "Total Users", value: summary?.totalUsers || 0, icon: <User className="text-blue-600 w-6 h-6" /> },
//     { label: "Total Bookings", value: summary?.totalBookings || 0, icon: <CalendarCheck className="text-indigo-600 w-6 h-6" /> },
//     { label: "Total Blogs", value: summary?.totalBlogs || 0, icon: <FileText className="text-green-600 w-6 h-6" /> },
//     { label: "Total Products", value: summary?.totalProducts || 0, icon: <PackageSearch className="text-yellow-600 w-6 h-6" /> },
//     { label: "Total Orders", value: summary?.totalOrders || 0, icon: <ClipboardList className="text-pink-600 w-6 h-6" /> },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">Admin Dashboard</h1>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
//           {statCards.map((card) => (
//             <div key={card.label} className="bg-white p-5 rounded-xl shadow border-l-4 border-[#4A1C1C] flex items-center gap-4">
//               {card.icon}
//               <div>
//                 <p className="text-sm text-gray-600">{card.label}</p>
//                 <h2 className="text-2xl font-semibold text-[#4A1C1C]">{card.value}</h2>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Chart */}
//         {summary?.weeklyData && (
//           <div className="bg-white rounded-xl p-6 shadow mb-12">
//             <h2 className="text-xl font-semibold mb-4 text-[#4A1C1C]">Last 7 Days Bookings</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={summary.weeklyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="bookings" fill="#4A1C1C" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}

//         {/* Navigation Links */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {adminLinks.map((link) => (
//             <Link
//               to={link.path}
//               key={link.label}
//               className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-300 border-l-4 border-[#4A1C1C]"
//             >
//               {link.icon}
//               <span className="text-lg font-medium text-[#4A1C1C]">{link.label}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




// src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { getAdminDashboardSummary } from "../../services/admin/adminService";
import {
  FileText,
  ShoppingCart,
  CalendarCheck,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getAdminDashboardSummary();
        setSummary(res.data);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const cardStyle =
    "flex items-center space-x-4 bg-white p-4 rounded-xl shadow border-l-4 border-[#4A1C1C]";

  const adminLinks = [
    {
      label: "Manage Blogs",
      icon: <FileText className="w-5 h-5 text-[#4A1C1C]" />,
      path: "/admin/manage-blogs",
    },
    {
      label: "Manage Products",
      icon: <ShoppingCart className="w-5 h-5 text-[#4A1C1C]" />,
      path: "/admin/manage-products",
    },
    {
      label: "Manage Puja Bookings",
      icon: <CalendarCheck className="w-5 h-5 text-[#4A1C1C]" />,
      path: "/admin/manage-puja-bookings",
    },
    {
      label: "Manage Users",
      icon: <Users className="w-5 h-5 text-[#4A1C1C]" />,
      path: "/admin/manage-users",
    },
    {
      label: "All Orders",
      icon: <LayoutDashboard className="w-5 h-5 text-[#4A1C1C]" />,
      path: "/admin/orders",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#4A1C1C] text-xl">
        Loading dashboard...
      </div>
    );
  }

  const { totals, chart } = summary || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">
          Admin Dashboard
        </h1>

        {/* 📦 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className={cardStyle}>
            <Users className="w-6 h-6 text-[#4A1C1C]" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-bold text-[#4A1C1C]">{totals.totalUsers}</p>
            </div>
          </div>

          <div className={cardStyle}>
            <FileText className="w-6 h-6 text-[#4A1C1C]" />
            <div>
              <p className="text-sm text-gray-500">Total Blogs</p>
              <p className="text-xl font-bold text-[#4A1C1C]">{totals.totalBlogs}</p>
            </div>
          </div>

          <div className={cardStyle}>
            <ShoppingCart className="w-6 h-6 text-[#4A1C1C]" />
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-xl font-bold text-[#4A1C1C]">{totals.totalProducts}</p>
            </div>
          </div>

          <div className={cardStyle}>
            <CalendarCheck className="w-6 h-6 text-[#4A1C1C]" />
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-xl font-bold text-[#4A1C1C]">{totals.totalBookings}</p>
            </div>
          </div>

          <div className={cardStyle}>
            <LayoutDashboard className="w-6 h-6 text-[#4A1C1C]" />
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold text-[#4A1C1C]">{totals.totalOrders}</p>
            </div>
          </div>
        </div>

        {/* 📈 Chart */}
        <div className="bg-white rounded-xl shadow p-6 mb-12">
          <h2 className="text-2xl font-semibold text-[#4A1C1C] mb-4">
            Weekly Booking Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.bookingChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#4A1C1C"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🔗 Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link
              to={link.path}
              key={link.label}
              className={cardStyle}
            >
              {link.icon}
              <span className="text-lg font-medium text-[#4A1C1C]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
