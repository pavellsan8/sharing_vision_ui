const API_BASE_URL = 'http://127.0.0.1:5001';

export const fetchArticles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/article/10/0`);
    const data = await response.json();

    // console.log('API Response:', data);
    const grouped = {
      Published: data.filter(a => a.status === 'Publish'),
      Drafts: data.filter(a => a.status === 'Draft'),
      Trashed: data.filter(a => a.status === 'Thrash')
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
      title: formData.title || '',
      content: formData.content || '',
      category: formData.category || '',
      status: status
    };

    // console.log('Sending payload:', payload);

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

    console.log('Article created:', data);
    return true;
  } catch (error) {
    console.error('Error creating article:', error);
    return false;
  }
};

export const updateArticleStatus = async (id, status) => {
  try {
    if (!id) return false;
    const getRes = await fetch(`${API_BASE_URL}/article/${id}`);
    if (!getRes.ok) return false;
    const article = await getRes.json();

    const payload = { ...article, status };

    const res = await fetch(`${API_BASE_URL}/article/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error('Update failed', res.status, data);
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