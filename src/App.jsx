import "./App.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { app } from "./firebase";

const firestore = getFirestore(app); // get firebase service in app

const App = () => {
  let inpRef = useRef({});

  const mixedReasons = [
    "other",
    "Lack of communication",
    "Making her laugh",
    "Respecting her boundaries",
    "Comparing her with others",
    "Spending quality time together",
    "Flirting with others",
    "Surprise gifts or gestures",
    "Being too busy for her",
    "Supporting her dreams",
    "Unexpected compliments",
    "Not taking responsibility",
    "Standing up for her",
    "Breaking promises",
    "Sharing your feelings honestly",
    "Disrespecting her feelings",
    "Good communication",
    "Taking her for granted",
    "Forgetting important dates",
    "You remember small details",
    "Lying or hiding things",
  ];
  let mood = [
    "😗",
    "😡",
    "😎",
    "☹️",
    "😙",
    "🤗",
    "😭",
    "😤",
    "😱",
    "😁",
    "😀",
    "😂",
    "😍",
    "🥰",
  ];

  let [isSubmit, setSubmit] = useState(true);
  const handleClick = async () => {
    const form = {
      isSeen: false,
    };
    Object.keys(inpRef.current).forEach((val) => {
      form[val] = inpRef.current[val].value;
    });

    if (form.feedback) {
      setSubmit(false);
    } else {
      alert("what about me 😙");
    }

    try {
      const key = await addDoc(collection(firestore, "Harshita"), form);
      console.log(key);
    } catch (e) {
      console.error("error adding data" + e);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="h-[10vmax] w-[36vmax] text-gray-600 font-bold text-2xl tracking-tighter rounded-2xl mt-5 flex items-center justify-center  bg-white  ">
          Hello Harshita...👋
        </div>

        {isSubmit ? (
          <div className="h-[50vmax] flex flex-col justify-between">
            <div className="h-[40vmax] rounded-2xl w-[38vmax] bg-white  px-5 ">
              <h3 className="text-center text-[14px] text-gray-400 font-bold tracking-tighter mt-4">
                Let me know if I messed something up today 😅
              </h3>
              <div className=" text-gray-400 text-center mt-2">
                <span className="text-xl tracking-tighter">Reason : </span>
                <select
                  ref={(e) => {
                    inpRef.current["reason"] = e;
                  }}
                  className="bg-pink-500 r text-white font-bold uppercase w-[21vmax] outline-none rounded-2xl px-2 py-1 mt-4 "
                >
                  {mixedReasons.map((value, i) => {
                    return <option key={i}>{value}</option>;
                  })}
                </select>
              </div>
              <textarea
                ref={(e) => {
                  inpRef.current["feedback"] = e;
                }}
                className="mt-10  px-2 py-2 h-[10vh] border-pink-300 outline-none border-3 w-full "
                placeholder="Hey, anything I could’ve done better today?"
              ></textarea>
              <div className="mt-5 flex items-center justify-center">
                <span className="mr-2 text-gray-400">Mood : </span>
                <select
                  className="w-30 px-4 py-1 border-2  rounded-2xl  border-pink-400 outline-none"
                  ref={(e) => {
                    inpRef.current["mood"] = e;
                  }}
                >
                  {mood.map((value, i) => {
                    return <option key={i * 30}>{value}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleClick}
                className="bg-white w-fit px-5 py-1 rounded-2xl tracking-tight font-extrabold text-gray-500 active:bg-pink-500 active:text-white "
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div
            className="h-[20vmax] rounded-2xl  w-[38vmax] p-3 bg-white"
            onClick={() => setSubmit(true)}
          >
            <h3 className="text-center font-bold text-gray-600">
              🩷From Sanchit🩷
            </h3>
            <h2 className="text-gray-600 mt-5 font-semibold ">
              Thank you for submitting Reason. Your Handsome Review shortly.
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
