import { getCenas } from "@/services/serviceTESTE";


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const data = await getCenas();
    res.status(200).json({ success: true, data }, data);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
