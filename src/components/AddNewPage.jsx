import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

const AddNewPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.content || !formData.category) {
      alert('Please fill all fields!');
     return;
    }
  
    const success = await onSubmit(formData, 'Publish');
    if (success) {
      alert('Article published successfully!');
      setFormData({ title: '', content: '', category: '' });
    } else {
      alert('Failed to publish article. Check console for details.');
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.title || !formData.content || !formData.category) {
      alert('Please fill all fields!');
      return;
    }
    
    const success = await onSubmit(formData, 'Draft');
    if (success) {
      alert('Draft saved successfully!');
      setFormData({ title: '', content: '', category: '' });
    } else {
      alert('Failed to save draft. Check console for details.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Article</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-4xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter article title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your article content here..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileText size={16} />
            Publish
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Save size={16} />
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPage;