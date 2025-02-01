import axios from 'axios';

export const fetchArticlesWithTopic = async (topic, page, perPage) => {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${topic}&page=${page}&hitsPerPage=${perPage}`
  );
  console.log(response);
  return response.data;
};

// export const updateData = async () => {};
