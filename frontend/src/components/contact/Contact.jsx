import { useEffect, useState } from "react";
import api from "../../api/api"; // centralized Axios

export default function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/contact/page/all/").then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-montserrat">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">Home / Contact</p>
      <p className="text-xl font-semibold mb-5">Contact Us</p>

      {/* Header */}
      {data.header && (
        <div className="bg-white rounded-xl border border-black shadow p-6 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {data.header.icon && (
              <img
                src={data.header.icon}
                alt="icon"
                className="w-10 h-10 object-contain"
              />
            )}
            <div>
              <h1 className="text-xl font-bold">{data.header.title}</h1>
              <p className="text-gray-600">{data.header.subtitle}</p>
            </div>
          </div>
          <a
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {data.header.button_text}
          </a>
        </div>
      )}

      {/* Quick Links */}
      <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {data.quick_links.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="rounded-xl p-6 flex flex-col gap-2 hover:shadow-md border border-black transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.icon}
                alt={item.title}
                className="w-12 h-12 object-contain"
              />
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
            <p className="text-sm text-black">{item.description}</p>
          </a>
        ))}
      </div>

      {/* Browse Topics */}
      <h2 className="text-lg font-semibold mb-4">Browse Topics</h2>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
       {data.browse_topics.map((topic) => (
  <a
    key={topic.id}
    href={topic.link}
    className="border rounded-xl p-6 flex items-center gap-3 hover:shadow-md border-black transition"
  >
    <img
      src={topic.icon}
      alt={topic.title}
      className="w-10 h-10 object-contain"
    />
    <h3 className="font-semibold">{topic.title}</h3>
  </a>
))}

      </div>

      {/* Get in Touch */}
      {data.contact_info && (
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-2">Get in touch</h2>
          <p className="mb-4 text-gray-600">
            If you have any inquiries, feel free to contact us
          </p>
          <div className="flex flex-col gap-2">
            {data.contact_info.phone && (
              <p>
                📞 <span className="font-medium">{data.contact_info.phone}</span>
              </p>
            )}
            {data.contact_info.email && (
              <p>
                📧 <a
                  href={`mailto:${data.contact_info.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {data.contact_info.email}
                </a>
              </p>
            )}
           
          </div>
        </div>
      )}
    </div>
  );
}


