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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="w-full min-h-dvh m-auto flex flex-col justify-center items-center">
      <div className="w-full flex flex-wrap justify-center items-center gap-6 p-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : content.length ? (
          content.map((item) => (
            <div
              key={item.id}
              className="relative w-[28rem] h-[38rem] bg-black drop-shadow-md rounded-lg overflow-hidden hover:scale-[1.02] duration-200"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-96 object-cover object-center"
                />
              )}
              <div className="p-4 flex flex-col justify-between h-48">
                <h2 className="text-lg font-semibold text-neutral-300">
                  {item.title}
                </h2>
                <p className="text-neutral-200 text-sm mt-2 line-clamp-3">
                  {item.summary}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 pt-2 self-start"
                >
                  Read more
                </a>
                <p className="absolute bottom-4 right-4 text-sm text-neutral-400 pt-2">
                  {item.news_site}
                </p>
                <p className="absolute bottom-4 left-4 text-sm text-neutral-400 pt-2">
                  {formatDate(item.published_at)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
