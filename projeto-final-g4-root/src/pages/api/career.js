
import userData from '../../../data/user.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(careerData);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
