import Problem from "../models/problemmodel.js";

export const deleteproblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findByIdAndDelete(id);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }
    res.status(200).json({ success: true, message: "Problem deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}