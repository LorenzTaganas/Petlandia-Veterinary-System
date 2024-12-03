import React, { useState, useEffect } from "react";

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const response = await fetch("http://localhost:3000/api/faqs");
    const data = await response.json();
    setFaqs(data);
  };

  const handleSend = async (question) => {
    const newMessages = [...messages, { text: question, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const response = await getBotResponse(question);
    setMessages([...newMessages, { text: response, sender: "bot" }]);
  };

  const getBotResponse = async (userInput) => {
    const faq = faqs.find(
      (f) => f.question.toLowerCase() === userInput.toLowerCase()
    );
    if (faq) {
      return faq.answer;
    } else {
      await submitQuestion(userInput);
      return "I'm sorry, I don't have the answer to that question right now. For further assistance, please contact us directly at 0965-8063-229 or petlandiavets@gmail.com. Our team will be happy to help!";
    }
  };

  const submitQuestion = async (question) => {
    await fetch("http://localhost:3000/api/faqs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer: "" }),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl h-full max-h-[80vh]">
        {" "}
        {/* Adjusted width and height */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Chatbot</h2>{" "}
          {/* Increased font size */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4 h-[60vh] overflow-y-auto">
          {" "}
          {/* Adjusted height */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "bot" ? "text-left" : "text-right"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-200"
                    : "bg-blue-500 text-white"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select a question:
            </label>
            <div className="flex flex-wrap mb-4">
              {" "}
              {/* Added margin-bottom */}
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(faq.question)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
