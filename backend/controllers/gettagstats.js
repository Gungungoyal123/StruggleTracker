export const getTagStats = async (req, res) => {
    try {
        const stats = await Problem.aggregate([
            // Stage 1: Filter by User
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },

            // Stage 2: UNWIND (The most important part)
            // If a problem has tags ["DP", "Math"], it creates TWO copies 
            // of that problem: one for DP and one for Math.
            { $unwind: "$tags" },

            // Stage 3: Group by Tag Name
            { 
                $group: { 
                    _id: "$tags", 
                    count: { $sum: 1 } 
                } 
            },

            // Stage 4: Sort by most frequent tags
            { $sort: { count: -1 } }
        ]);

        const formattedData = stats.map(item => ({
            name: item._id,
            value: item.count
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};