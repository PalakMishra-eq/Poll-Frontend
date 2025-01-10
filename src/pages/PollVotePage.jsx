// // src/pages/PollVotePage.jsx
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const VotePage = () => {
//   const { pollId } = useParams();
//   const [poll, setPoll] = useState(null);
//   const [selectedChoices, setSelectedChoices] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [reportSuccess, setReportSuccess] = useState("");
//   const navigate = useNavigate();

//   // Fetch poll details when the component mounts
//   useEffect(() => {
//     const fetchPollDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Authorization token is missing. Please log in again.");
//           return;
//         }

//         const response = await axios.get(
//           `https://interpolls.onrender.com/api/polls/${pollId}/details`,
//           {
//             headers: { Authorization: token }, // Match the Profile Page logic
//           }
//         );
//         setPoll(response.data);
//       } catch (err) {
//         console.error("Error fetching poll details:", err);
//         setError("Failed to fetch poll details. Please try again.");
//       }
//     };

//     fetchPollDetails();
//   }, [pollId]);

//   // Handle vote submission
//   const handleVote = async () => {
//     try {
//       setError("");
//       setSuccess("");
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("Authorization token is missing. Please log in again.");
//         return;
//       }

//       await axios.post(
//         `https://interpolls.onrender.com/api/polls/${pollId}/vote`,
//         { choiceIds: selectedChoices },
//         { headers: { Authorization: token } } // Match the Profile Page logic
//       );

//       setSuccess("Vote cast successfully!");
//       // Redirect to poll list after a short delay
//       setTimeout(() => {
//         navigate("/poll-list");
//       }, 1000); 
//     } catch (err) {
//       console.error("Error casting vote:", err);
//       setError("Failed to cast vote. Please try again.");
//     }
//   };


//    // Handle Reporting the Poll
//    const handleReportPoll = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `https://interpolls.onrender.com/api/polls/${pollId}/report`,
//         {},
//         { headers: { Authorization: `${token}` } }
//       );
//       setReportSuccess(response.data.message || "Poll reported successfully.");
//       setTimeout(() => {
//         navigate("/polls"); // Redirect to poll list after reporting
//       }, 2000); // Delay for user feedback
//     } catch (error) {
//       console.error("Error reporting poll:", error);
//       setError(
//         error.response?.data?.error || "Failed to report poll. Please try again."
//       );
//     }
//   };

//   // Handle choice selection
//   const handleChoiceChange = (choiceId, checked) => {
//     if (poll.pollType === "single-choice") {
//       setSelectedChoices([choiceId]); // Single choice: only one selection
//     } else if (poll.pollType === "multiple-choice") {
//       setSelectedChoices((prev) =>
//         checked ? [...prev, choiceId] : prev.filter((id) => id !== choiceId)
//       ); // Multiple choice: add/remove choices
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-500 mb-4">{success}</p>}

//       {poll ? (
//         <div className="bg-white p-6 rounded shadow-md">
//           <h1 className="text-2xl font-bold">{poll.title}</h1>
//           <p className="mt-2 text-gray-600">{poll.question}</p>

//           {/* Poll Choices */}
//           <div className="mt-4">
//             {poll.choices.map((choice) => (
//               <div key={choice._id} className="flex items-center mb-2">
//                 <input
//                   type={
//                     poll.pollType === "single-choice" ? "radio" : "checkbox"
//                   }
//                   name="choice"
//                   value={choice._id}
//                   onChange={(e) =>
//                     handleChoiceChange(choice._id, e.target.checked)
//                   }
//                 />
//                 <label className="ml-2">{choice.text}</label>
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleVote}
//             className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           >
//             Submit Vote
//           </button>
//         </div>
        
//       ) : (
//         <p className="text-gray-600">Loading poll details...</p>
//       )}
//     </div>
//   );
// };

// export default VotePage;

// src/pages/PollVotePage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const VotePage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");
  const [userRole, setUserRole] = useState(""); // To determine admin or voter
  const navigate = useNavigate();

  // Fetch poll details
  useEffect(() => {
    const fetchPollDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        setUserRole(role);

        const response = await axios.get(
          `https://interpolls.onrender.com/api/polls/${pollId}/details`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setPoll(response.data);
      } catch (error) {
        console.error("Error fetching poll details:", error);
        setError("Failed to fetch poll details. Please try again.");
      }
    };

    fetchPollDetails();
  }, [pollId]);

  // Handle Vote Submission
  const handleVote = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");

      await axios.post(
        `https://interpolls.onrender.com/api/polls/${pollId}/vote`,
        { choiceIds: selectedChoices },
        { headers: { Authorization: `${token}` } }
      );
      setSuccess("Vote cast successfully!");
      navigate("/polls"); // Redirect to poll list
    } catch (error) {
      console.error("Error casting vote:", error);
      setError("Failed to cast vote. Please try again.");
    }
  };

  // Handle Reporting the Poll
  const handleReportPoll = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://interpolls.onrender.com/api/polls/${pollId}/report`,
        {},
        { headers: { Authorization: `${token}` } }
      );
      setReportSuccess(response.data.message || "Poll reported successfully.");
      setTimeout(() => {
        navigate("/poll-list"); // Redirect to poll list after reporting
      }, 2000); // Delay for user feedback
    } catch (error) {
      console.error("Error reporting poll:", error);
      setError(
        error.response?.data?.error || "Failed to report poll. Please try again."
      );
    }
  };

  // Handle poll deletion (Admin only)
  const handleDeletePoll = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://interpolls.onrender.com/api/polls/${pollId}/delete`,
        { headers: { Authorization: `${token}` } }
      );
      setReportSuccess(response.data.message || "Poll deleted successfully.");
      setTimeout(() => {
        navigate("/poll-list"); // Redirect to poll list
      }, 2000); // Delay for feedback
    } catch (error) {
      console.error("Error deleting poll:", error);
      setError("Failed to delete poll. Please try again.");
    }
  };

  // Handle Choice Selection
  const handleChoiceChange = (choiceId, checked) => {
    if (poll.pollType === "single-choice") {
      setSelectedChoices([choiceId]);
    } else if (poll.pollType === "multiple-choice") {
      setSelectedChoices((prev) =>
        checked ? [...prev, choiceId] : prev.filter((id) => id !== choiceId)
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Header */}
    <Header />
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {reportSuccess && <p className="text-green-500 mb-4">{reportSuccess}</p>}
      {poll && (
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold">{poll.title}</h1>
          <p className="mt-2 text-gray-600">{poll.question}</p>
          <div className="mt-4">
            {poll.choices.map((choice) => (
              <div key={choice._id} className="flex items-center mb-2">
                <input
                  type={
                    poll.pollType === "single-choice" ? "radio" : "checkbox"
                  }
                  name="choice"
                  value={choice._id}
                  onChange={(e) =>
                    handleChoiceChange(choice._id, e.target.checked)
                  }
                />
                <label className="ml-2">{choice.text}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleVote}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Submit Vote
          </button>
        </div>
      )}

      {/* Conditional Buttons */}
      {userRole === "Admin" ? (
          <button
            onClick={handleDeletePoll}
            className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded shadow-md"
          >
            Delete Poll
          </button>
        ) : (
          <button
            onClick={handleReportPoll}
            className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded shadow-md"
          >
            Report Poll
          </button>
        )}
      </div>
     {/* Footer */}
     <Footer />
    </div>
  );
};

export default VotePage;
