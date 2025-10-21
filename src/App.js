import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import AllPostsPage from './components/AllPostPage';
import AddNewPage from './components/AddNewPage';
import PreviewPage from './components/PreviewPage';
import { fetchArticles, createArticle, updateArticleStatus, deleteArticle } from './services/api';

const App = () => {
  const [currentPage, setCurrentPage] = useState('all-posts');
  const [articles, setArticles] = useState({
    Published: [],
    Drafts: [],
    Trashed: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const data = await fetchArticles();
    setArticles(data);
    setLoading(false);
  };

  const handleCreateArticle = async (formData, status) => {
    const success = await createArticle(formData, status);
    if (success) {
      await loadArticles();
      return true;
    }
    return false;
  };

  const handleDelete = async (id) => {
    const success = await deleteArticle(id);
    if (success) {
      await loadArticles();
      return true;
    }
    return false;
  };

  const handleTrash = async (id, currentStatus) => {
    const success = await updateArticleStatus(id, 'Trash');
    if (success) {
      const article = articles[currentStatus]?.find(a => a.id === id);
      if (article) {
        setArticles(prev => ({
          ...prev,
          [currentStatus]: prev[currentStatus].filter(a => a.id !== id),
          Trashed: [...(prev.Trashed || []), { ...article, status: 'Trash' }]
        }));
      } else {
        await loadArticles();
      }
    } else {
      await loadArticles();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <>
            {currentPage === 'all-posts' && (
              <AllPostsPage 
                articles={articles} 
                onTrash={handleTrash}
                onDelete={handleDelete}
                onRefresh={loadArticles}
              />
            )}
            {currentPage === 'add-new' && (
              <AddNewPage onSubmit={handleCreateArticle} />
            )}
            {currentPage === 'preview' && (
              <PreviewPage articles={articles.Published ?? articles.published ?? []} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;