import Problem from "../models/problemmodel.js";
export const addproblem=async(req,res)=>{
    try {
        const {link,logs,description,level,title,tags}=req.body;
        if (!link || !title ) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: link, title, or logs." 
            });
        }
        const userid=req.user.id;
        const newproblem=new Problem({
            user:userid,
            tags,
            title,
            logs,
            description,
            level,
            status:"Struggling",
            link,
             nextReviewDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        })
        await newproblem.save();
        res.status(201).json({ success: true, problem: newproblem });
    } catch (error) {
        res.status(500).json({ success: false, message:error.message});
    }
}