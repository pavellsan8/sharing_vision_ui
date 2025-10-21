import React, { useState } from 'react';

const PreviewPage = ({ articles = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;
  
  const totalPages = Math.ceil((articles?.length ?? 0) / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = (articles || []).slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Preview - Published Articles</h1>
      
      <div className="space-y-6">
        {currentArticles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No published articles yet
          </div>
        ) : (
          currentArticles.map((article, idx) => (
            <div key={article.id ?? `preview-${startIndex + idx}`} className="bg-white rounded-lg shadow p-6">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {article.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{article.content}</p>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;