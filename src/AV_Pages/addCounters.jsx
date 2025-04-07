import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function AddAvCounter() {
  const [counters, setCounters] = useState([]);
  const [newCounter, setNewCounter] = useState({
    build: "",
    identity: "",
    growth: "",
  });
  const [updateCounter, setUpdateCounter] = useState({
    id: "",
    build: "",
    identity: "",
    growth: "",
  });

  useEffect(() => {
    fetchCounters();
  }, []);

  useEffect(() => {
    if (counters.length > 0) {
      setUpdateCounter({ ...counters[0], id: counters[0]._id || "" });
    }
  }, [counters]);

  const fetchCounters = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/get-all-avcounters`);
      setCounters(response.data.data || []);
    } catch (error) {
      console.error("Error fetching counters:", error);
    }
  };

  const addCounter = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.API_URL}/add-avcounters`, newCounter);
      alert("Counters Added");
      fetchCounters();
      setNewCounter({ build: "", identity: "", growth: "" });
    } catch (error) {
      console.error("Error adding counter:", error);
    }
  };

  const updateCounterData = async (e) => {
    e.preventDefault();
    if (!"67c07f109e5cfb687169cbd1") return;

    try {
      await axios.put(
        `${config.API_URL}/update-avcounters/${"67c07f109e5cfb687169cbd1"}`,
        updateCounter
      );
      alert("Counters Updated");
      fetchCounters();
    } catch (error) {
      console.error("Error updating counter:", error);
    }
  };

  return (
    <div className="add-service-container">
      {/* Add Counter - Visible only if no counters exist */}
      {counters.length === 0 && (
        <form className="add-service-form" onSubmit={addCounter}>
          <label>Website Build :</label>
          <input
            type="text"
            placeholder="Website Build"
            value={newCounter.build}
            onChange={(e) =>
              setNewCounter({ ...newCounter, build: e.target.value })
            }
            className="add-service-input"
          />
          <label>Build Brand Identity :</label>
          <input
            type="text"
            placeholder="Build Brand Identity"
            value={newCounter.identity}
            onChange={(e) =>
              setNewCounter({ ...newCounter, identity: e.target.value })
            }
            className="add-service-input"
          />
          <label>Your Startup Growth :</label>
          <input
            type="text"
            placeholder="Your Startup Growth"
            value={newCounter.growth}
            onChange={(e) =>
              setNewCounter({ ...newCounter, growth: e.target.value })
            }
            className="add-service-input"
          />
          <button type="submit" className="p-2 bg-blue-500 rounded">
            Add Counter
          </button>
        </form>
      )}

      {/* Update Counter - Visible only if data exists */}
      {counters.length > 0 && "67c07f109e5cfb687169cbd1" && (
        <form className="add-service-form" onSubmit={updateCounterData}>
          <label>Website Build :</label>
          <input
            type="text"
            placeholder="Website Build"
            value={updateCounter.build}
            onChange={(e) =>
              setUpdateCounter({ ...updateCounter, build: e.target.value })
            }
            className="add-service-input"
          />
          <label>Build Brand Identity :</label>
          <input
            type="text"
            placeholder="Build Brand Identity"
            value={updateCounter.identity}
            onChange={(e) =>
              setUpdateCounter({ ...updateCounter, identity: e.target.value })
            }
            className="add-service-input"
          />
          <label>Your Startup Growth :</label>
          <input
            type="text"
            placeholder="Your Startup Growth"
            value={updateCounter.growth}
            onChange={(e) =>
              setUpdateCounter({ ...updateCounter, growth: e.target.value })
            }
            className="add-service-input"
          />
          <button type="submit" className="p-2 bg-yellow-500 rounded">
            Update Counter
          </button>
        </form>
      )}
    </div>
  );
}
