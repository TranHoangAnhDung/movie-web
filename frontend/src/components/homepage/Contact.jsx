import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi thông tin liên hệ ở đây
    alert("Cảm ơn bạn đã gửi thông tin liên hệ!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-4xl text-red-600 font-bold mb-8">Liên Hệ</h1>
      <p className="text-white mb-6">
        Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="name">
            Tên:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-red-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-red-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="message">
            Tin nhắn:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-red-500"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition duration-300"
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default Contact;
