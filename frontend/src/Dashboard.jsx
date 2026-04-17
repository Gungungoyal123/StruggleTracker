import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemCard from "./ProblemCard";
import AddProblemModal from "./AddProblemModal";
import { MiniBarChart, MiniDonutChart, BarChartModal, DonutChartModal } from "./Charts";

const BASE_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("struggling");
  const [strugglingproblems, setstrugglingProblems] = useState([]);
  const [mastered, setmasteredproblems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBarModal, setShowBarModal] = useState(false);
  const [showDonutModal, setShowDonutModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchProblems();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setUsername(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(`${BASE_URL}/user/getproblem/struggling`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response2 = await fetch(`${BASE_URL}/user/getproblem/mastered`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const data2 = await response2.json();
      if (response.ok) setstrugglingProblems(data.data);
      if (response2.ok) setmasteredproblems(data2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProblems = tab === "struggling" ? strugglingproblems : mastered;
  const todaysDue = strugglingproblems.slice(0, 3);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: