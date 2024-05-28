import { findCorrelatedCareers } from "@/services/orderCareerSuggestion";



export default async (req, res) => {
    if (req.method === "GET") {
        try { 
           
            const filtro = await findCorrelatedCareers(req.query.userId);
            

            res.status(200).json({careers:filtro}); // Aqui, 'res.json(filtro)' é corrigido para 'res.status(200).json(filtro)'
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};