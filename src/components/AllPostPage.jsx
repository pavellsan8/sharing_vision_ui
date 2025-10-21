import React, { useState } from 'react';
import { Trash2, Edit, XCircle } from 'lucide-react';

const AllPostsPage = ({ articles, onTrash, onRefresh, onDelete }) => {
  const [activeTab, setActiveTab] = useState('Published');

  const getList = (tab) => {
    return (articles && (articles[tab] ?? articles[tab.toLowerCase()])) ?? [];
  };

  const handleEdit = (article) => {
    console.log('Edit:', article);
  };

  const handleTrash = async (article) => {
    if (window.confirm(`Move "${article.title}" to trash?`)) {
      await onTrash(article.id, activeTab);
    }
  };

  const handlePermanentDelete = async (article) => {
    if (window.confirm(`Permanently delete "${article.title}"? This cannot be undone!`)) {
      const success = await onDelete(article.id);
      if (success) {
        onRefresh();
      } else {
        alert('Failed to delete article.');
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>
      
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('Published')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'Published'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Published ({getList('Published').length})
        </button>
        <button
          onClick={() => setActiveTab('Drafts')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'Drafts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Drafts ({getList('Drafts').length})
        </button>
        <button
          onClick={() => setActiveTab('Trashed')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'Trashed'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Trashed ({getList('Trashed').length})
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getList(activeTab).length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No articles found
                </td>
              </tr>
            ) : (
              getList(activeTab).map((article, idx) => (
                <tr key={article.id ?? `${activeTab}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.category}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>

                      {activeTab === 'Trashed' ? (
                        <button
                          onClick={() => handlePermanentDelete(article)}
                          className="p-2 text-red-700 hover:bg-red-50 rounded"
                          title="Delete Permanently"
                        >
                          <XCircle size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTrash(article)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Move to Trash"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPostsPage;