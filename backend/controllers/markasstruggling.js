import Problem from "../models/problemmodel.js";

export const markasstruggling = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        problem.masteryLevel = 0;
        problem.status = "Struggling";
        problem.nextReviewDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days
        await problem.save();
        res.status(200).json({
            success: true,
            nextDate: problem.nextReviewDate
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}