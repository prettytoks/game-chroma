import axios from 'axios';

export const API_URL = 'https://api.gridlist.com/video_games?sort=popularity.desc&page=1';

export const SINGLE_URL = 'https://api.gridlist.com/video_game';

export const fetchGame = async (slug) => {
  try {
    const response = await axios.get(`${SINGLE_URL}/${slug}`);
    const gameDetails = response.data;
    return gameDetails;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

