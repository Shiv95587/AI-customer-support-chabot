"use client";
import BouncingDotsLoader from "../components/BouncingDotsLoader";

import { useEffect, useState } from "react";
export default function Message({ message, loading, setTemp }) {
  const { role, text } = message;
  const [displayedText, setDisplayedText] = useState("");
  console.log(role, text);
  const commonStyles =
    "font-medium tracking-wide max-w-[600px] whitespace-normal p-4 rounded-lg text-wrap w-fit break-words overflow-y-auto ";

  useEffect(() => {
    if (role === "bot") {
      let index = 0;
      const timer = setInterval(() => {
        setDisplayedText((prevText) => {
          if (text[index] === undefined) return prevText;
          return prevText + text[index];
        });
        index++;
        if (index >= text.length) {
          clearInterval(timer);
        }
      }, 10);
      return () => clearInterval(timer); // Clean up interval on component unmount
    }
  }, [text, role]);

  useEffect(() => {
    setTemp(displayedText);
  }, [displayedText, setTemp]);
  return role === "bot" ? (
    text.length === 0 ? (
      <BouncingDotsLoader />
    ) : (
      <div className={`bg-gray-950 text-slate-50 ${commonStyles}`}>
        {displayedText}
      </div>
    )
  ) : (
    <div className={`bg-slate-50 text-gray-950 ml-auto ${commonStyles}`}>
      {text}
    </div>
  );
}
