import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export const Home = ({ activePage }) => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const endpoint = ["articles", "blogs", "reports"].includes(activePage)
      ? activePage
      : "articles";

    try {
      const response = await axios.get(
        `https://api.spaceflightnewsapi.net/v4/${endpoint}/`
      );
      setContent(response.data.results);
      setError(null);
    } catch (error) {
      console.error(`Error fetching ${activePage}:`, error);
      setError("Failed to load content. Please try again later.");
    }
  }, [activePage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full min-h-dvh m-auto flex flex-col justify-center items-center">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : content.length ? (
        content.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b border-gray-300 w-full max-w-md"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p>{item.summary}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Read more
            </a>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
