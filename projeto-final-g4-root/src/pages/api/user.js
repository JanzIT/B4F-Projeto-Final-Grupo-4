//Karol´s Json tests
// import { findCorrelatedCareers } from "@/services/orderedCareerSuggestions";
// import userData from "../../../data/user.json";

// import { getUserById } from "@/services/user";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const body = JSON.parse(req.body);
//     const userId = JSON.parse(req.body).userId;
//     const user = await getUserById(userId);

//     const carreers = await findCorrelatedCareers(user);
//     res.status(200).json({ user, carreers });
//   }

//   if (req.method === "GET") {
//     const { type } = req.query;
//     // const user = await getUserById(userid);
//     if (type === "chosenCareer") {
//       const chosenCareer = userData.careerSuggestions.find(
//         (career) => career._id === userData.chosenCareer
//       );
//       if (chosenCareer) {
//         res.status(200).json(chosenCareer);
//       } else {
//         res.status(404).json({ message: "Chosen career not found" });
//       }
//     }
//     // } else {
//     //   const userId = JSON.parse(req.body).userId;
//     //   console.log("QUARTETO" + userId);
//     //   const user = await getUserById(userId);
//     //   console.log(user);
//     //   res.status(200).json(user);
//     // }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }




//uncomment this and the lower /dashboard page for fake data
import userData from '../../../data/user.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { type } = req.query;
    if (type === 'chosenCareer') {
      const chosenCareer = userData.careerSuggestions.find(career => career._id === userData.chosenCareer);
      if (chosenCareer) {
        res.status(200).json(chosenCareer);
      } else {
        res.status(404).json({ message: 'Chosen career not found' });
      }
    } else {
      res.status(200).json(userData);
    }
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
