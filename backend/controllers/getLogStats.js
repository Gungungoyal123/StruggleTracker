// controller to get log statistics
export const getLogStats = async (req, res) => {
    try {
        const stats = await Problem.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
            { 
                $group: { 
                    _id: "$logs", // Group by our Enum values
                    count: { $sum: 1 } 
                } 
            }
        ]);

        // Format for Recharts: [{ name: 'TLE', value: 5 }, ...]
        const formattedData = stats.map(item => ({
            name: item._id,
            value: item.count
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};