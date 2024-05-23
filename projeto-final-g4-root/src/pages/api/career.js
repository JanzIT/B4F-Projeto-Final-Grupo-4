export default async (req, res) => {
    if (req.method === "GET") {
        try {
            const res = await getAllCareersFromDatabase()
            res.status(200).json(res)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}