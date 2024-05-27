//Karol´s Json tests
import userData from '../../../data/user.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

//-------------------------------------------------------------------

// /pages/api/user.js -->> rigth DB way!

// import { getUserById } from '@/services/user';

// export default async (req, res) => {
//     if (req.method === 'GET') {
//         try {
//             const { _id } = req.query;
//             const user = await getUserById(_id);
//             res.status(200).json(user);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// };
