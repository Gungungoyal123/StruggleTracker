import Problem from "../models/problemmodel.js";

export const getstrugglingproblem=async(req,res)=>{
    try {
        const now=new Date();
        const dueproblem=await Problem.find({
            user:req.user.id,
            nextReviewDate:{$lte:now},
            masteryLevel:0
        }).sort({ nextReviewDate: 1 }); 
        return res.status(200).json({
            success: true,
            count: dueproblem.length,
            data: dueproblem
        });
    
    } catch (error) {
        console.error("Error fetching struggles:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch struggling problems" 
        });
    }
}