import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function AddCounter() {
  const [counters, setCounters] = useState([]);
  console.log(counters);
  const [newCounter, setNewCounter] = useState({
    project: "",
    member: "",
    loveus: "",
    happyClient: "",
  });

  const [updateCounter, setUpdateCounter] = useState({
    id: "",
    project: "",
    member: "",
    loveus: "",
    happyClient: "",
  });

  useEffect(() => {
    fetchCounters();
  }, []);

  useEffect(() => {
    if (counters.length > 0) {
      setUpdateCounter({ ...counters[0], id: counters[0]._id }); // Auto-select first counter
    }
  }, [counters]);

  const fetchCounters = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/get-all-counters`);
      setCounters(response.data.data);
    } catch (error) {
      console.error("Error fetching counters:", error);
    }
  };

  const addCounter = async () => {
    try {
      await axios.post(`${config.API_URL}/add-counters`, newCounter);
      fetchCounters();
      setNewCounter({ project: "", member: "", loveus: "", happyClient: "" });
    } catch (error) {
      console.error("Error adding counter:", error);
    }
  };

  const updateCounterData = async () => {
    if (!"67b9def91beffea00ddb8e3d") return;

    try {
      await axios.put(
        `${config.API_URL}/update-counter/${"67b9def91beffea00ddb8e3d"}`,
        updateCounter
      );
      fetchCounters();
    } catch (error) {
      console.error("Error updating counter:", error);
    }
  };

  return (
    <div className="add-service-container">
      {/* <h1 className="text-2xl font-bold mb-4">Counters</h1> */}

      {/* Add Counter - Visible only if no counters exist */}
      {counters.length === 0 && (
        <form className="add-service-form">
          <lable>Project :</lable>

          <input
            type="text"
            placeholder="Project Name"
            value={newCounter.project}
            onChange={(e) =>
              setNewCounter({ ...newCounter, project: e.target.value })
            }
            className="add-service-input"
          />
          <lable>Member :</lable>

          <input
            type="text"
            placeholder="Member"
            value={newCounter.member}
            onChange={(e) =>
              setNewCounter({ ...newCounter, member: e.target.value })
            }
            className="add-service-input"
          />
          <lable>Love Us :</lable>
          <input
            type="text"
            placeholder="Love Us"
            value={newCounter.loveus}
            onChange={(e) =>
              setNewCounter({ ...newCounter, loveus: e.target.value })
            }
            className="add-service-input"
          />
          <lable>Happy Client :</lable>

          <input
            type="text"
            placeholder="Happy Client"
            value={newCounter.happyClient}
            onChange={(e) =>
              setNewCounter({ ...newCounter, happyClient: e.target.value })
            }
            className="add-service-input"
          />
          <button onClick={addCounter} className="p-2 bg-blue-500 rounded">
            Add Counter
          </button>
        </form>
      )}

      {/* Update Counter - Visible only if data exists */}
      {counters.length > 0 && "67b9def91beffea00ddb8e3d" && (
        <form className="add-service-form">
          <lable>Project :</lable>
          <input
            type="text"
            placeholder="Project Name"
            value={updateCounter.project}
            onChange={(e) =>
              setUpdateCounter({ ...updateCounter, project: e.target.value })
            }
            className="add-service-input"
          />
          <lable>Members :</lable>
          <input
            type="text"
            placeholder="Member"
            value={updateCounter.member}
            onChange={(e) =>
              setUpdateCounter({ ...updateCounter, member: e.target.value })
            }
            className="add-service-input"
          />
          <lable>Love Us :</lable>
          <input
            type="text"
            placeholder="Love Us"
            value={updateCounter.loveus}
            onChange={(e) =>
              setUpdateCounter({ ...updateCounter, loveus: e.target.value })
            }
            className="add-service-input"
          />
          <lable>Happy Client :</lable>
          <input
            type="text"
            placeholder="Happy Client"
            value={updateCounter.happyClient}
            onChange={(e) =>
              setUpdateCounter({
                ...updateCounter,
                happyClient: e.target.value,
              })
            }
            className="add-service-input"
          />
          <button
            onClick={updateCounterData}
            className="p-2 bg-yellow-500 rounded"
          >
            Update Counter
          </button>
        </form>
      )}

      {/* Display Counters */}
      {/* <ul className="mb-4">
        {counters.map((counter) => (
          <li key={counter._id} className="mb-2 p-2 bg-gray-800 rounded">
            {counter.project} | {counter.member} | {counter.loveus} |{" "}
            {counter.happyClient}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
