"use client";
import QueryBox from "./QueryBox";
import Message from "./Messsage";
import { useState, useEffect, useRef } from "react";
export default function ChatBox({ responses }) {
  const scrollableDivRef = useRef(null);
  const [temp, setTemp] = useState("");

  useEffect(() => {
    // Ensure the div scrolls to the bottom whenever items change
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
      scrollableDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses, temp]);
  return (
    <div
      ref={scrollableDivRef}
      className="border-box overflow-y-auto custom-scrollbar flex-grow"
    >
      <div className="mt-16 rounded-md border-slate-50 border-0.25 px-4 border-1 grid gap-8 grid-cols-1">
        {responses.length > 0 ? (
          responses.map((message, index) => {
            return <Message message={message} key={index} setTemp={setTemp} />;
          })
        ) : (
          <div className="flex flex-col gap-2 items-center mt-48">
            <h1 className="text-slate-50 text-4xl font-bold">Hi!</h1>
            <h3 className="text-slate-50 text-2xl font-medium text-center">
              How can I help you?
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
