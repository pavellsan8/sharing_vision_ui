const API_BASE_URL = 'http://127.0.0.1:5001';

const normalizeStatusToGroup = (s) => {
  if (!s) return 'Drafts';
  const v = String(s).toLowerCase();
  if (['publish', 'published'].includes(v)) return 'Published';
  if (['draft', 'drafts'].includes(v)) return 'Drafts';
  if (['trash', 'thrash', 'trashed', 'trashd'].includes(v)) return 'Trashed';
  return 'Drafts';
};

const normalizeStatusToBackend = (status) => {
  const v = String(status).toLowerCase();
  if (['published', 'publish'].includes(v)) return 'Publish';
  if (['draft', 'drafts'].includes(v)) return 'Draft';
  if (['trashed', 'trash'].includes(v)) return 'Trash';
  return 'Draft';
};

export const fetchArticles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/article/10/0`);
    const data = await response.json();

    const grouped = {
      Published: data.filter(a => normalizeStatusToGroup(a.status) === 'Published'),
      Drafts: data.filter(a => normalizeStatusToGroup(a.status) === 'Drafts'),
      Trashed: data.filter(a => normalizeStatusToGroup(a.status) === 'Trashed')
    };

    return grouped;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { Published: [], Drafts: [], Trashed: [] };
  }
};

export const createArticle = async (formData, status) => {
  try {
    const payload = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      status: normalizeStatusToBackend(status)
    };
    
    // console.log('Sending payload:', payload); // Debug log
    
    const response = await fetch(`${API_BASE_URL}/article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      console.error('Create article failed', response.status, data);
      return false;
    }
    // console.log('Article created:', data); // Debug log
    return true;
  } catch (error) {
    console.error('Error creating article:', error);
    return false;
  }
};

export const updateArticleStatus = async (id, status) => {
  try {
    const getRes = await fetch(`${API_BASE_URL}/article/${id}`);
    if (!getRes.ok) {
      console.error('Failed to fetch article before update', getRes.status);
      return false;
    }
    const article = await getRes.json();

    const payload = { 
      ...article, 
      status: normalizeStatusToBackend(status) 
    };
    
    // console.log('Updating article with payload:', payload); // Debug log
    
    const res = await fetch(`${API_BASE_URL}/article/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error('Update article status failed', res.status, data);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error updating article status:', error);
    return false;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/article/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
};