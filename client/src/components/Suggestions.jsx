import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // const response = await fetch(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/posts/suggestions`
        // );
        // const data = await response.json();
        // setSuggestions(data.suggestions);
        setTimeout(() => {
          setSuggestions([]);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="hidden lg:flex flex-col min-w-[30%] h-screen mt-20 fixed border-l border-black p-4">
      <h2 className="text-lg font-bold mb-4">Suggestions</h2>
      <ul className="space-y-2">
        {loading ? (
          <li className="text-gray-600">Loading suggestions...</li>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <li key={suggestion._id} className="hover:underline">
              <a href={`/post/${suggestion.slug}`}>{suggestion.title}</a>
            </li>
          ))
        ) : (
          <li className="text-gray-600">No suggestions available</li>
        )}
      </ul>
    </div>
  );
};

export default Suggestions;
