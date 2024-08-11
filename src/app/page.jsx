"use client";
import { useState } from "react";
import ChatBox from "../components/ChatBox.jsx";
import QueryBox from "../components/QueryBox.jsx";
import "./chatbox.css";
export default function ChatInterface() {
  const [responses, setResponses] = useState([]);

  return (
    <div className="flex flex-col h-full gap-4">
      <ChatBox responses={responses} />
      <QueryBox responses={responses} setResponses={setResponses} />
    </div>
  );
}
