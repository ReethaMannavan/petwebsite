
// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage
//   useEffect(() => {
//     const access = localStorage.getItem("access");
//     const refresh = localStorage.getItem("refresh");
//     const email = localStorage.getItem("email");
//     const firstName = localStorage.getItem("first_name");
//     const lastName = localStorage.getItem("last_name");

//     if (access && email) {
//       setUser({ email, firstName, lastName });
//     }
//   }, []);

//   const login = (userData, tokens) => {
//     localStorage.setItem("access", tokens.access);
//     localStorage.setItem("refresh", tokens.refresh);
//     localStorage.setItem("email", userData.email);
//     localStorage.setItem("first_name", userData.first_name || "");
//     localStorage.setItem("last_name", userData.last_name || "");

//     setUser({
//       email: userData.email,
//       firstName: userData.first_name || "",
//       lastName: userData.last_name || "",
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("email");
//     localStorage.removeItem("first_name");
//     localStorage.removeItem("last_name");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");

    if (access && email) {
      setUser({ email, firstName, lastName });
    }
  }, []);

  // Login function (used for both login & registration)
  const login = (apiResponse) => {
    const { access, refresh, user: userInfo } = apiResponse;

    // Save tokens
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // Save user info
    localStorage.setItem("email", userInfo.email);
    localStorage.setItem("first_name", userInfo.first_name || "");
    localStorage.setItem("last_name", userInfo.last_name || "");

    setUser({
      email: userInfo.email,
      firstName: userInfo.first_name || "",
      lastName: userInfo.last_name || "",
    });
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("email");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
