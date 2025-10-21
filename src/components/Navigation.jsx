import React from 'react';
import { FileText, Plus, Eye } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">Dashboard Article</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('all-posts')}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                currentPage === 'all-posts'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText size={16} />
              All Posts
            </button>
            <button
              onClick={() => setCurrentPage('add-new')}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                currentPage === 'add-new'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Plus size={16} />
              Add New
            </button>
            <button
              onClick={() => setCurrentPage('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                currentPage === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Eye size={16} />
              Preview
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;