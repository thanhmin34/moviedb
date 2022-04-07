import { collection, deleteDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMovie from "../../Component/HeaderMovie";

import { db } from "../../firebase/Config";

const History = () => {
  const [history, setHistory] = useState([]);
  const [test, setTest] = useState([]);
  const navigate = useNavigate();

  const a = history.filter((his, index) => {
    const _his = JSON.stringify(his.id);
    return (
      index ===
      history.findIndex((obj) => {
        return JSON.stringify(obj.id) === _his;
      })
    );
    setTest(a);
  });

  // useEffect(() => {
  //   const colRef = collection(db, "flim");
  //   onSnapshot(colRef, (snapshot) => {
  //     let ids = [];
  //     snapshot.docs.forEach((doc) =>
  //       ids.push({
  //         ...doc.data(),
  //       })
  //     );

  //     setHistory(ids);
  //   });
  // }, []);
  const hanldeDelete = async (id) => {
    // const deleteRef = collection(db, "flim");
    // await deleteCollection(deleteRef);
  };
  if (!a) return <div>loading....</div>;

  return (
    <>
      <div className=" items-stretch mx-[7vw] h-screen">
        <HeaderMovie />

        <div className="w-full  mx-auto mt-4 h-screen flex flex-col">
          <div className="flex justify-between  my-4">
            <h3 className="text-xl font-medium">Watch History</h3>
            <button onClick={hanldeDelete} className="text-primary">
              clear
            </button>
          </div>
          <div className="w-full grid grid-cols-2 gap-5  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xlmin:grid-cols-6">
            {a.map((his, index) => (
              <div
                key={index}
                className="text-center cursor-pointer bg-basic rounded-lg relative items-movie"
                onClick={() => navigate(`/movie/${his.id}`)}
              >
                <div className="relative pt-[125%]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${his.poster_path}`}
                    className="w-full h-full absolute inset-0 object-cover rounded-top"
                  />
                </div>
                <span className="py-1 text-overflow-1 text-[14px] px-2">
                  {his.title || his.name}
                </span>
                <div className="play">
                  <div>
                    <span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
