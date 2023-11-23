
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Extract the slug from the request parameters
    const { slug } = req.query;

    // Make a request to the external API using the provided slug
    const response = await axios.get(`https://api.gridlist.com/video_game/${slug}`);
    const data = response.data;

    // Respond with the fetched data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching game details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
