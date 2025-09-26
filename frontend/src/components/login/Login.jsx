
// // Login.js
// // Login.js
// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../../api/api";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const { login, user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [showRegister, setShowRegister] = useState(false);

//   useEffect(() => { if (user) navigate("/"); }, [user]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("auth/login/", loginData);
//       login({ email: loginData.email }, { access: res.data.access, refresh: res.data.refresh });
//       toast.success("Login successful");
//       navigate("/");
//     } catch (err) {
//       if (err.response?.data?.detail) toast.error(err.response.data.detail);
//       else toast.error("Login failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <Toaster />
//       <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg w-full max-w-4xl">
//         {/* Login Form */}
//         <div className="p-8">
//           <h2 className="text-xl font-bold mb-4">Returning Customer</h2>
//           <form onSubmit={handleLogin}>
//             <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded"
//               value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
//             <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded"
//               value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
//             <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
//           </form>
//         </div>

//         {/* Register */}
//         <div className="p-8 border-t md:border-t-0 md:border-l">
//           <h2 className="text-xl font-bold mb-4">New Customer</h2>
//           <button onClick={() => setShowRegister(true)} className="w-full bg-green-500 text-white p-2 rounded">Create Account</button>
//         </div>
//       </div>

//       {showRegister && <RegisterModal close={() => setShowRegister(false)} />}
//     </div>
//   );
// }

// // Register Modal
// function RegisterModal({ close }) {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ first_name:"", last_name:"", email:"", password:"", password2:"" });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.password2) { toast.error("Passwords do not match"); return; }

//     try {
//       const res = await api.post("auth/register/", formData);
//       login({ email: res.data.user.email, first_name: res.data.user.first_name, last_name: res.data.user.last_name },
//             { access: res.data.access, refresh: res.data.refresh });
//       toast.success("Registration successful");
//       close();
//       navigate("/");
//     } catch (err) {
//       if (err.response?.data) {
//         for (const key in err.response.data) {
//           const val = err.response.data[key];
//           if (Array.isArray(val)) val.forEach(m => toast.error(`${key}: ${m}`));
//           else toast.error(`${key}: ${val}`);
//         }
//       } else toast.error("Registration failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative mx-4 my-8">
//         <button onClick={close} className="absolute top-2 right-2 text-gray-500">✕</button>
//         <h2 className="text-xl font-bold mb-4">Create Account</h2>
//         <form onSubmit={handleRegister}>
//           <input type="text" name="first_name" placeholder="First Name" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
//           <input type="text" name="last_name" placeholder="Last Name" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
//           <input type="password" name="password2" placeholder="Confirm Password" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
//           <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Attempting login with:", loginData); // <-- check email/password

  try {
    const res = await api.post("auth/login/", loginData);
    console.log("Login response:", res.data); // <-- see full response

    login(res.data); // AuthContext login
    toast.success("Login successful");
    navigate("/");
  } catch (err) {
    console.error("Login error:", err.response?.data); // <-- full backend error
    if (err.response?.data?.detail) toast.error(err.response.data.detail);
    else toast.error("Login failed");
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
   
      <Toaster />

      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg w-full max-w-4xl">
      
        {/* Login Form */}
        <div className="p-8">
     
          <h2 className="text-xl font-bold mb-4 bg-[#98FB98] px-4 py-3">Returning Customer</h2>
          <form onSubmit={handleLogin}>
            <label className="font-semibold mb-4">Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded-xl"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <label className="font-semibold mb-4">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded-xl"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-persianblue text-white p-2 rounded-xl">
              Login
            </button>
          </form>
        </div>

        {/* Register */}
        <div className="p-8 border-t md:border-t-0 md:border-l">
          <h2 className="text-xl font-bold mb-4 bg-[#98FB98] px-4 py-3">New Customer</h2>
          <p className="px-4 mt-4 mb-4">Register with us for a faster checkout,to track the status of your order and more.</p>
          <button
            onClick={() => setShowRegister(true)}
            className="w-full bg-persianblue text-white p-2 rounded-xl"
          >
            Create Account
          </button>
        </div>
      </div>

      {showRegister && <RegisterModal close={() => setShowRegister(false)} />}
    </div>
  );
}

// Register Modal
function RegisterModal({ close }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("auth/register/", formData);
      login(res.data); // AuthContext login handles tokens + user info
      toast.success("Registration successful");
      close();
      navigate("/");
    } catch (err) {
      if (err.response?.data) {
        for (const key in err.response.data) {
          const val = err.response.data[key];
          if (Array.isArray(val)) val.forEach((m) => toast.error(`${key}: ${m}`));
          else toast.error(`${key}: ${val}`);
        }
      } else toast.error("Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative mx-4 my-8">
        <button onClick={close} className="absolute top-2 right-2 text-gray-500">✕</button>
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="first_name" placeholder="First Name" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="last_name" placeholder="Last Name" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
          <input type="password" name="password2" placeholder="Confirm Password" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
}
