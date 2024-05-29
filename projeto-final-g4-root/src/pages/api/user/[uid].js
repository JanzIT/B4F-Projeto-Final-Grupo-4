import { getUserById } from "@/services/user";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { uid } = req.query
    const user = await getUserById(uid);

    if (!user) {
      return res.status(400)
    }

    return res.status(200).json({ user })
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
