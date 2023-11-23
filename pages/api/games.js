import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.gridlist.com/video_games?sort=popularity.desc&page=1');
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
