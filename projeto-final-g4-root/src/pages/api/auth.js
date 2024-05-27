import { authUser, registerUser } from "@/services/auth";

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const user = await authUser(email, password);
      res.status(200).json({ success: true, message: 'Authentication successful!', user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email, password, userSkills, generalSkills, careerSkills, scoreAcquiredSkills, chosenCareer, careerSuggestions  } = req.body;
      // Create user object with desired structure
      const userInfo = {
        name,
        email,
        password,
        userSkills: {
          generalSkills: [],
          careerSkills: [],
        },
        scoreAcquiredSkills,
        chosenCareer,
        careerSuggestions: [],
      };
      const user = await registerUser(userInfo); // Pass userInfo to registerUser function
      res.status(201).json({ success: true, message: 'User created successfully!', user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
