import { useState } from "react";

export default function QueryBox({ responses, setResponses, setLoading }) {
  const [query, setQuery] = useState("");
  async function handleQuerySubmit(e) {
    e.preventDefault();
    setResponses((prev) => [...prev, { role: "user", text: query }]);
    setResponses((prev) => [...prev, { role: "bot", text: "" }]);
    setQuery("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      console.log(data.choices[0].message.content);
      setResponses((prev) => {
        const t = [...prev];
        t[t.length - 1] = {
          role: "bot",
          text: data.choices[0].message.content,
        };
        return t;
        // { role: "bot", text: data.choices[0].message.content },
      });
    } catch (error) {
      console.error("Error fetching the API:", error);
    }
  }

  return (
    <div className="flex-none">
      <form
        className="flex flex-row justify-center"
        method="POST"
        onSubmit={handleQuerySubmit}
      >
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none font-medium tracking-wides max-sm:rounded-none"
          placeholder="Ask KaratBot"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
