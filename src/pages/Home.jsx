import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v4/articles/")
      .then((response) => {
        setArticles(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return (
    <div className="w-full min-h-dvh m-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Latest Spaceflight News</h1>
      {articles.length ? (
        articles.map((article) => (
          <div
            key={article.id}
            className="p-4 border-b border-gray-300 w-full max-w-md"
          >
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p>{article.summary}</p>
            <a
              href={article.url}
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
