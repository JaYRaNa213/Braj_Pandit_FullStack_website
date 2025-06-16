// // /src/context/AuthContext.jsx


// import React, { createContext, useState, useEffect, useContext } from "react";

// // Create AuthContext
// export const AuthContext = createContext();

// // AuthProvider to wrap app and provide auth state
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("authUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("authUser", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("authUser");
//     }
//   }, [user]);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Export custom hook
// export function useAuth() {
//   return useContext(AuthContext);
// }






import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🧠 Load user from token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error("❌ Invalid token in localStorage:", err.message);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // ✅ Login sets token and decoded user
  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("❌ Failed to decode token at login:", err.message);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
