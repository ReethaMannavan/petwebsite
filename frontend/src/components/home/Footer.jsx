// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";

// export default function Footer() {
//   const [settings, setSettings] = useState(null);
//   const [petpaloozaLinks, setPetpaloozaLinks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [supportLinks, setSupportLinks] = useState([]);
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(null);

//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         const [settingsRes, petpaloozaRes, categoriesRes, supportRes] =
//           await Promise.all([
//             api.get("/footer/settings/"),
//             api.get("/footer/petpalooza-links/"),
//             api.get("/categories/"),
//             api.get("/footer/support-links/"),
//           ]);

//         setSettings(settingsRes.data[0] || null);
//         setPetpaloozaLinks(petpaloozaRes.data);
//         setCategories(categoriesRes.data);
//         setSupportLinks(supportRes.data);
//       } catch (err) {
//         console.error("Error fetching footer data:", err);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     try {
//       await api.post("/footer/subscribe/", { email });
//       setSubscribed("Thanks for subscribing!");
//       setEmail("");
//     } catch (err) {
//       setSubscribed("Subscription failed. Try again.");
//     }
//   };

//   return (
//     <footer className="footer-bg bg-[#1C49C2] text-white px-6 md:px-16 py-10 font-montserrat">
//       <div className="footer-container max-w-7xl mx-auto">
//         {/* ✅ Top Left Logo + Text */}
//         <div className="footer-logo mb-6 flex flex-col items-start space-y-2">
//           {settings?.footer_logo && (
//             <img
//               src={settings.footer_logo}
//               alt="Footer Logo"
//               className="h-8 w-auto"
//             />
//           )}
//           <p className="text-sm max-w-lg font-bold">{settings?.footer_text}</p>
//         </div>

//         {/* ✅ 5 Columns Underneath */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
//           {/* Column 1 - Petpalooza Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Petpalooza</h3>
//             <ul className="space-y-2">
//               {petpaloozaLinks.map((link) => (
//                 <li key={link.id}>
//                   <Link
//                     to={link.url}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 2 - Categories */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Categories</h3>
//             <ul className="space-y-2">
//               {categories.map((cat) => (
//                 <li key={cat.id}>
//                   <Link
//                     to={`/category/${cat.id}`}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {cat.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3 - Support Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Support</h3>
//             <ul className="space-y-2">
//               {supportLinks.map((link) => (
//                 <li key={link.id}>
//                   <Link
//                     to={link.url}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4 - Social Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Follow Us</h3>
//             <ul className="space-y-2">
//               {settings?.facebook && (
//                 <li>
//                   <a
//                     href={settings.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//               )}
//               {settings?.instagram && (
//                 <li>
//                   <a
//                     href={settings.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//               )}
//               {settings?.youtube && (
//                 <li>
//                   <a
//                     href={settings.youtube}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     YouTube
//                   </a>
//                 </li>
//               )}
//               {settings?.whatsapp && (
//                 <li>
//                   <a
//                     href={settings.whatsapp}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     WhatsApp
//                   </a>
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Column 5 - Subscribe */}
//           <div className="footer-column">
//             <h3 className="font-semibold text-lg mb-3">For Subscribe</h3>
//             <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="px-3 py-2 rounded-lg text-black focus:outline-none"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-[#98FB98] text-[#1C49C2] font-semibold px-4 py-2 rounded-lg hover:bg-[#0045FF] hover:text-white transition"
//               >
//                 Subscribe
//               </button>
//             </form>
//             {subscribed && (
//               <p className="mt-2 text-sm">{subscribed}</p>
//             )}
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";

// export default function Footer() {
//   const [settings, setSettings] = useState(null);
//   const [petpaloozaLinks, setPetpaloozaLinks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [supportLinks, setSupportLinks] = useState([]);
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(null);

//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         const [settingsRes, petpaloozaRes, categoriesRes, supportRes] =
//           await Promise.all([
//             api.get("/footer/settings/"),
//             api.get("/footer/petpalooza-links/"),
//             api.get("/categories/"),
//             api.get("/footer/support-links/"),
//           ]);

//         setSettings(settingsRes.data[0] || null);
//         setPetpaloozaLinks(petpaloozaRes.data);
//         setCategories(categoriesRes.data);
//         setSupportLinks(supportRes.data);
//       } catch (err) {
//         console.error("Error fetching footer data:", err);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     try {
//       await api.post("/footer/subscribe/", { email });
//       setSubscribed("Thanks for subscribing!");
//       setEmail("");
//     } catch (err) {
//       setSubscribed("Subscription failed. Try again.");
//     }
//   };

//   return (
//     <footer className="footer-bg bg-[#1C49C2] text-white px-6 md:px-16 py-10 font-montserrat">
//       <div className="footer-container max-w-7xl mx-auto">
//         {/* ✅ Top Left Logo + Text */}
//         <div className="footer-logo mb-6 flex flex-col items-start space-y-2">
//           {settings?.footer_logo && (
//             <img
//               src={settings.footer_logo}
//               alt="Footer Logo"
//               className="h-8 w-auto"
//             />
//           )}
//           <p className="text-sm max-w-lg font-bold">{settings?.footer_text}</p>
//         </div>

//         {/* ✅ 5 Columns Underneath */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
//           {/* Column 1 - Petpalooza Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Petpalooza</h3>
//             <ul className="space-y-2">
//               {petpaloozaLinks.map((link) => (
//                 <li key={link.id}>
//                   <Link
//                     to={link.url}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 2 - Categories */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Categories</h3>
//             <ul className="space-y-2">
//               {categories.map((cat) => (
//                 <li key={cat.id}>
//                   <Link
//                     to={`/category/${cat.id}`}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {cat.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3 - Support Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Support</h3>
//             <ul className="space-y-2">
//               {supportLinks.map((link) => (
//                 <li key={link.id}>
//                   <Link
//                     to={link.url}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4 - Social Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Follow Us</h3>
//             <ul className="space-y-2">
//               {settings?.facebook && (
//                 <li>
//                   <a
//                     href={settings.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//               )}
//               {settings?.instagram && (
//                 <li>
//                   <a
//                     href={settings.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//               )}
//               {settings?.youtube && (
//                 <li>
//                   <a
//                     href={settings.youtube}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     YouTube
//                   </a>
//                 </li>
//               )}
//               {settings?.whatsapp && (
//                 <li>
//                   <a
//                     href={settings.whatsapp}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     WhatsApp
//                   </a>
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Column 5 - Subscribe */}
//           <div className="footer-column">
//             <h3 className="font-semibold text-lg mb-3">For Subscribe</h3>
//             <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="px-3 py-2 rounded-lg text-black focus:outline-none"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-[#98FB98] text-[#1C49C2] font-semibold px-4 py-2 rounded-lg hover:bg-[#0045FF] hover:text-white transition"
//               >
//                 Subscribe
//               </button>
//             </form>
//             {subscribed && (
//               <p className="mt-2 text-sm">{subscribed}</p>
//             )}
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";

// export default function Footer() {
//   const [settings, setSettings] = useState(null);
//   const [petpaloozaLinks, setPetpaloozaLinks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [supportLinks, setSupportLinks] = useState([]);
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(null);

//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         const [settingsRes, petpaloozaRes, categoriesRes, supportRes] =
//           await Promise.all([
//             api.get("/footer/settings/"),
//             api.get("/footer/petpalooza-links/"),
//             api.get("/categories/"),
//             api.get("/footer/support-links/"),
//           ]);

//         setSettings(settingsRes.data[0] || null);
//         setPetpaloozaLinks(petpaloozaRes.data);
//         setCategories(categoriesRes.data);
//         setSupportLinks(supportRes.data);
//       } catch (err) {
//         console.error("Error fetching footer data:", err);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     try {
//       await api.post("/footer/subscribe/", { email });
//       setSubscribed("Thanks for subscribing!");
//       setEmail("");
//     } catch (err) {
//       setSubscribed("Subscription failed. Try again.");
//     }
//   };

//   return (
//     <footer className="footer-bg bg-[#1C49C2] text-white px-6 md:px-16 py-10 font-montserrat">
//       <div className="footer-container max-w-7xl mx-auto">
//         {/* ✅ Top Left Logo + Text */}
//         <div className="footer-logo mb-6 flex flex-col items-start space-y-2">
//           {settings?.footer_logo && (
//             <img
//               src={settings.footer_logo}
//               alt="Footer Logo"
//               className="h-8 w-auto"
//             />
//           )}
//           <p className="text-sm max-w-lg font-bold">{settings?.footer_text}</p>
//         </div>

//         {/* ✅ 5 Columns Underneath */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
//           {/* Column 1 - Petpalooza Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Petpalooza</h3>
//             <ul className="space-y-2">
//               {petpaloozaLinks.map((link) => (
//                 <li key={link.id}>
//                   <Link
//                     to={link.url}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 2 - Categories */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Categories</h3>
//             <ul className="space-y-2">
//               {categories.map((cat) => (
//                 <li key={cat.id}>
//                   <Link
//                     to={`/category/${cat.id}`}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {cat.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3 - Support Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Support</h3>
//             <ul className="space-y-2">
//               {supportLinks.map((link) => (
//                 <li key={link.id}>
//                   <Link
//                     to={link.url}
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4 - Social Links */}
//           <div className="footer-column">
//             <h3 className="font-bold text-xl mb-3">Follow Us</h3>
//             <ul className="space-y-2">
//               {settings?.facebook && (
//                 <li>
//                   <a
//                     href={settings.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//               )}
//               {settings?.instagram && (
//                 <li>
//                   <a
//                     href={settings.instagram}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//               )}
//               {settings?.youtube && (
//                 <li>
//                   <a
//                     href={settings.youtube}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     YouTube
//                   </a>
//                 </li>
//               )}
//               {settings?.whatsapp && (
//                 <li>
//                   <a
//                     href={settings.whatsapp}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:text-[#98FB98] transition font-semibold"
//                   >
//                     WhatsApp
//                   </a>
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Column 5 - Subscribe */}
//           <div className="footer-column">
//             <h3 className="font-semibold text-lg mb-3">For Subscribe</h3>
//             <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="px-3 py-2 rounded-lg text-black focus:outline-none"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-[#98FB98] text-[#1C49C2] font-semibold px-4 py-2 rounded-lg hover:bg-[#0045FF] hover:text-white transition"
//               >
//                 Subscribe
//               </button>
//             </form>
//             {subscribed && (
//               <p className="mt-2 text-sm">{subscribed}</p>
//             )}
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function Footer() {
  const [settings, setSettings] = useState(null);
  const [petpaloozaLinks, setPetpaloozaLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [supportLinks, setSupportLinks] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [settingsRes, petpaloozaRes, categoriesRes, supportRes] =
          await Promise.all([
            api.get("/footer/settings/"),
            api.get("/footer/petpalooza-links/"),
            api.get("/categories/"),
            api.get("/footer/support-links/"),
          ]);

        setSettings(settingsRes.data[0] || null);
        setPetpaloozaLinks(petpaloozaRes.data);
        setCategories(categoriesRes.data);
        setSupportLinks(supportRes.data);
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };

    fetchFooterData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await api.post("/footer/subscribe/", { email });
      setSubscribed("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setSubscribed("Subscription failed. Try again.");
    }
  };

  return (
    <footer className="footer-bg bg-[#1C49C2] text-white px-6 md:px-16 py-10 font-montserrat">
      <div className="footer-container max-w-7xl mx-auto">
        {/* ✅ Top Left Logo + Text */}
        <div className="footer-logo mb-6 flex flex-col items-start space-y-2">
          {settings?.footer_logo && (
            <img
              src={settings.footer_logo}
              alt="Footer Logo"
              className="h-8 w-auto"
            />
          )}
          <p className="text-sm max-w-lg font-bold">{settings?.footer_text}</p>
        </div>

        {/* ✅ 5 Columns Underneath */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1 - Petpalooza Links */}
          <div className="footer-column">
            <h3 className="font-bold text-xl mb-3">Petpalooza</h3>
            <ul className="space-y-2">
              {petpaloozaLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.url}
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Categories */}
          <div className="footer-column">
            <h3 className="font-bold text-xl mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Support Links */}
          <div className="footer-column">
            <h3 className="font-bold text-xl mb-3">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.url}
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Social Links */}
          <div className="footer-column">
            <h3 className="font-bold text-xl mb-3">Follow Us</h3>
            <ul className="space-y-2">
              {settings?.facebook && (
                <li>
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {settings?.instagram && (
                <li>
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {settings?.youtube && (
                <li>
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    YouTube
                  </a>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <a
                    href={settings.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#98FB98] transition font-semibold"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 5 - Subscribe */}
          <div className="footer-column">
            <h3 className="font-semibold text-lg mb-3">For Subscribe</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-lg text-black focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-[#98FB98] text-[#1C49C2] font-semibold px-4 py-2 rounded-lg hover:bg-[#0045FF] hover:text-white transition"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-sm">{subscribed}</p>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
