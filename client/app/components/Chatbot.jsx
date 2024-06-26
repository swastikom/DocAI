"use client"

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";
import Welcome from "./Welcome";
import Chatload from "./Chatload";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import AI from "@/public/AI.png";
import User from "@/public/User.png";

const Chatbot = (props) => {
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const [inputText, setInputText] = useState(""); // State for input text
  const [error, setError] = useState(null); // State for error messages
  const documentId = props.data; // Document ID passed from props
  const chatWindowRef = useRef(null); // Ref for chat window to enable scrolling
  const [showWelcome, setShowWelcome] = useState(!documentId); // State to control the welcome message visibility
  const [load, setLoad] = useState(false); // State to indicate loading status

  // Function to scroll chat window to the bottom
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when component mounts
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages or load state changes
  }, [messages, load]);

  useEffect(() => {
    if (!documentId) {
      localStorage.removeItem("chatHistory"); // Clear chat history if no document ID
      return;
    }

    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")); // Load chat history from local storage
    if (chatHistory) {
      setMessages(chatHistory); // Set chat history in state
      setShowWelcome(false); // Hide welcome message if there's a chat history
    }
  }, [documentId]);

  const handleMessageSend = async () => {
    // Check if the input message is empty
    if (inputText.trim() === "") {
      setError("Please enter a message."); // Set error message for empty input
      setTimeout(() => {
        setError(null); // Clear error message after 4 seconds
      }, 4000);
      return; // Stop further execution
    }

    // Check if the document ID is provided
    if (!documentId) {
      setError("Document ID is missing."); // Set error message for missing document ID
      setTimeout(() => {
        setError(null); // Clear error message after 4 seconds
      }, 4000);
      return; // Stop further execution
    }

    const userMessage = { text: inputText, fromUser: true }; // Create user message object
    setInputText(""); // Clear input text
    setShowWelcome(false); // Hide welcome message when the user sends a message

    try {
      // Add user's message to chat history
      const updatedMessages = [...messages, userMessage];
      setLoad(true); // Set loading state to true

      // Make API request to get bot's response
      const response = await axios.post(
        `http://127.0.0.1:8000/answer/${documentId}/`,
        {
          question: inputText,
        }
      );
      const botResponse = response.data.answer; // Get bot's response from API

      // Add bot's response to chat history along with user's message
      const botMessage = { text: botResponse, fromUser: false };
      updatedMessages.push(botMessage);

      // Update state and local storage with the updated chat history
      setMessages(updatedMessages);
      localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
      setError(null); // Reset error state if no error occurs
      setLoad(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setError("Error fetching bot response. Please try again."); // Set error message
      setLoad(false); // Set loading state to false
      // Clear the error message after 4 seconds
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <div className="w-[100%] mx-auto p-4 flex flex-col h-screen pt-[4em]">
      {showWelcome && <Welcome />} {/* Render Welcome component if showWelcome is true */}
      {!showWelcome && (
        <>
          <div
            ref={chatWindowRef}
            className="flex-grow chat-window bg-white rounded p-4 ml-3 no-scrollbar overflow-y-auto"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message p-2 rounded flex items-start gap-5 ${
                  msg.fromUser ? "bg-none py-4 mt-2" : "bg-none py-4 "
                }`}
              >
                <div className="h-10 w-10">
                  {msg.fromUser ? (
                    <Image
                      src={User}
                      alt="User Avatar"
                      height={"5em"}
                      width={"5em"}
                    />
                  ) : (
                    <Image
                      src={AI}
                      alt="AI Avatar"
                      height={"5em"}
                      width={"5em"}
                    />
                  )}{" "}
                </div>
                <div className="w-[100%] mt-[7px]">{msg.text}</div>
              </div>
            ))}
            {/* Render loading indicator if loading state is true */}
            {load && <Chatload />}
            {/* Render error message if error state is not null */}
            {error && (
              <div className="${isVisible ? 'animate-fadein' : 'animate-fadeout'} px-5 py-2 my-2 text-white bg-red-500 rounded-lg w-fit">
                {error}
              </div>
            )}
          </div>
          <div className="pb-7 sticky bottom-0 bg-white">
            <div className="flex mt-2 shadow-md rounded-lg">
              <input
                type="text"
                className="flex-1 rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-[#f6f7f9] py-2 px-4 placeholder-gray-400 focus:outline-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Send a message..."
              />
              <button
                className="bg-[#f6f7f9] border-[1px] border-l-0 text-slate-400 font-bold py-4 px-5 pr-5 rounded-r-lg hover:bg-green-400 hover:border-green-400 hover:text-black transition duration-300 ease-in-out"
                onClick={handleMessageSend}
              >
                <LuSendHorizonal />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
