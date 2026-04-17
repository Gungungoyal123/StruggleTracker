import axios from "axios";

export const extracturl = async (req, res) => {
    try {
        const { url } = req.body;
        const parts = url.split('/problems/');
        if (parts.length < 2) {
            return res.status(400).json({ success: false, error: "INVALID URL" });
        }
        const name = parts[1].split('/')[0];

        // try two different API endpoints as fallback
        let rawData = null;
        try {
            const response = await axios.get(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${name}`, { timeout: 5000 });
            rawData = response.data;
        } catch (err) {
            // first API failed, try backup
            const response2 = await axios.get(`https://leetcode-api-fShows.vercel.app/problem/${name}`, { timeout: 5000 });
            rawData = response2.data;
        }

        const problemTitle = rawData?.questionTitle || rawData?.title || name.replace(/-/g, " ");
        const problemDifficulty = rawData?.difficulty || rawData?.level || "Medium";
        const topicTags = rawData?.topicTags
            ? rawData.topicTags.map(tag => tag.name)
            : [];

        return res.status(200).json({
            success: true,
            title: problemTitle,
            difficulty: problemDifficulty,
            tags: topicTags
        });
    } catch (error) {
        console.error("Fetch Error:", error.message);
        // still return something useful so user can fill manually
        const name = req.body.url?.split('/problems/')[1]?.split('/')[0] || "";
        return res.status(200).json({
            success: true,
            title: name.replace(/-/g, " "),
            difficulty: "Medium",
            tags: []
        });
    }
}