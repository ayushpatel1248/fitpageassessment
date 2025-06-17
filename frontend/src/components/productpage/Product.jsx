"use client";

import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import product from "../../assets/jsondata/product.json";
import { useParams } from "react-router";
import axios from "axios";

export default function Product() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .post("https://fitpageassessment.onrender.com/reviews/get", { product_id: id })
      .then((res) => {
        if (res.data.status === "OK") {
          setReviews(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  const handleSubmit = async () => {
    if (!reviewText || !rating) return alert("Please enter review and rating");

    let base64Image = "";

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        base64Image = reader.result;

        const payload = {
          product_id: id,
          review: reviewText,
          rating: rating,
          image: base64Image,
        };

        try {
          const res = await axios.post("https://fitpageassessment.onrender.com/reviews", payload);
          if (res.data.status === "OK") {
            alert("review submited!");
            setReviewText("");
            setRating(0);
            setImageFile(null);

            const fresh = await axios.post("https://fitpageassessment.onrender.com/reviews/get", {
              product_id: id,
            });
            setReviews(fresh.data.data);
          } else {
            alert("failed to submit review");
          }
        } catch (err) {
          console.error("submit error", err);
        }
      };
      reader.onerror = () => {
        alert("Failed to read image");
      };
    } else {
      const payload = {
        product_id: id,
        review: reviewText,
        rating: rating,
        image: "",
      };

      try {
        const res = await axios.post("https://fitpageassessment.onrender.com/reviews", payload);
        if (res.data.status === "OK") {
          alert("review submited!");
          setReviewText("");
          setRating(0);
          setImageFile(null);

          const fresh = await axios.post("https://fitpageassessment.onrender.com/reviews/get", {
            product_id: id,
          });
          setReviews(fresh.data.data);
        } else {
          alert("Failed to submit review");
        }
      } catch (err) {
        console.error("Submit Error:", err);
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          <img
            alt={product[id - 1].image}
            src={product[id - 1].image}
            className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
          />
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product[id - 1].name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">
              {product[id - 1].price}
            </p>
            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4 mt-20">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Reviews
            </h1>

            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Write your review
              </label>
              <textarea
                cols="30"
                rows="5"
                placeholder="review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border border-gray-300 p-3 text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Upload image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="border w-full text-sm text-gray-500"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="p-3 border hover:bg-black hover:text-white"
            >
              Submit review
            </button>

            <div className="pt-10">
              {reviews.length > 0 ? (
                reviews.map((rev, idx) => (
                  <div key={idx} className="mb-4 border-b pb-3">
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            rev.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{rev.review}</p>
                    {rev.image && (
                      <img
                        src={rev.image}
                        alt="review"
                        className="mt-2 h-24 rounded-md object-cover"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
