import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const HeroManager = () => {
  const [alt, setAlt] = useState("images");
  const [images, setImages] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [editingHero, setEditingHero] = useState(null);

  const fetchHeroes = async () => {
    const res = await axios.get(`${config.API_URL}/heroes`);
    setHeroes(res.data);
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${config.API_URL}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      uploadedImages.push(res.data.file_url);
    }

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const resetForm = () => {
    setAlt("");
    setImages([]);
    setEditingHero(null);
  };

  const handleSubmit = async () => {
    const data = { alt, images };

    try {
      if (editingHero) {
        await axios.put(`${config.API_URL}/heroes/${editingHero.id}`, data);
      } else {
        await axios.post(`${config.API_URL}/heroes`, data);
      }
      fetchHeroes();
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (hero) => {
    setEditingHero(hero);
    setAlt(hero.alt);
    setImages(hero.images);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the Sample Category?`
    );

    if (!isConfirmed) return;

    await axios.delete(`${config.API_URL}/heroes/${id}`);
    fetchHeroes();
  };

  const handleImageDelete = (indexToRemove) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // console.log("editingHero", editingHero ? true : false);
  return (
    <div className="mt-10 p-4 bg-white shadow-lg rounded border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Banner Images</h2>

      {(editingHero || heroes.length === 0) && (
        <>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <div className="flex overflow-x-auto gap-2 mb-4">
            {images.map((img, index) => (
              <div key={index} className="relative min-w-[450px] h-40">
                <img
                  src={img}
                  alt="hero"
                  className="w-[100%] h-40 object-cover border border-gray-300"
                />
                <span
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 bg-pink-600 text-white text-xs px-2 py-1 cursor-pointer rounded-bl"
                >
                  ✕
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={handleSubmit}
              disabled={images.length === 0}
            >
              {editingHero ? "Update" : "Create"}
            </button>

            {editingHero && (
              <button className="ml-2 text-red-500" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </>
      )}

      {heroes.length > 0 &&
        heroes.map((hero) => (
          <div
            key={hero.id}
            className={`border ${
              editingHero ? "hidden" : ""
            }  border-gray-300 p-4 mb- rounded shadow flex flex-col gap-2 mt-4`}
          >
            <div className="flex gap-2 overflow-x-auto ">
              {hero.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="hero"
                  className="w-[100%] h-40 border border-gray-300 "
                />
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(hero)}
                className="bg-yellow-400 px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(hero.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HeroManager;
