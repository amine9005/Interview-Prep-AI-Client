import { useState } from "react";
import type { Question } from "../../types/types";
import {
  Check,
  Eye,
  LightbulbIcon,
  Loader2,
  PenBoxIcon,
  RotateCw,
  X,
} from "lucide-react";
import { MarkdownRender } from "../AI/MarkdownRender";
import { apiPaths } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import {
  setExplanation,
  toggleOpenExplanation,
  toggleSidebar,
} from "../../redux/sidebarSlice";

const InterviewPrepCard = ({ q, index }: { q: Question; index: number }) => {
  const [saveNoteLoading, setSaveNoteLoading] = useState(false);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [show, setShow] = useState("");
  const [showNote, setShowNote] = useState("");
  const [note, setNote] = useState("");

  const dispatch = useDispatch();

  const handle_save_note = async (q_id: string, note: string) => {
    if (!note) {
      toast.error("Please enter a note");
      return;
    }

    try {
      setSaveNoteLoading(true);
      // console.log("note: ", note);
      const res = await api.put(
        apiPaths.QUESTION.UPDATE_NOTE.replace(":id", q_id),
        {
          note,
        }
      );

      const { success } = res.data;
      if (success) {
        toast.success("Note saved successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setSaveNoteLoading(false);
  };

  const handle_generate_explanation = async (question: string) => {
    setExplanationLoading(true);
    try {
      const res = await api.post(apiPaths.AI.GENERATE_EXPLANATION, {
        question,
      });

      const { success, data } = res.data;
      if (success) {
        // console.log("data: ", data);
        dispatch(setExplanation(data));
        dispatch(toggleOpenExplanation());
        dispatch(toggleSidebar());
      } else {
        toast.error("Failed to generate explanation, please try again later");
      }
    } catch (error) {
      console.log(error);
    }
    setExplanationLoading(false);
  };

  return (
    <div
      key={index}
      className=" group w-full h-[400px] md:h-[500px] mx-auto perspective-1000px"
    >
      <div
        className={`relative w-full h-full transition-transform duration-1000 transform-3d ${
          show === q._id ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full rounded-2xl backface-hidden flex flex-wrap flex-col text-white bg-slate-800 p-2 md:px-8 md:py-4">
          <div
            className={`flex flex-wrap flex-col justify-start items-start mt-4 overflow-y-scroll h-10/12 ${
              showNote === q._id ? "" : "hidden"
            }`}
          >
            <h1 className="hidden 2xl:block text-lg font-bold text-center">
              {q.question}
            </h1>
            <textarea
              onChange={(e) => setNote(e.target.value)}
              value={q.note}
              placeholder="Take notes and save them for later"
              className="text-md rounded-2xl w-full h-3/4 mt-6 font-semibold bg-base-100 text-slate-300 p-4"
            ></textarea>
          </div>
          <div
            className={`flex flex-wrap justify-center items-center mt-4 h-10/12 ${
              showNote === q._id ? "hidden" : ""
            }`}
          >
            <h1 className="text-md md:text-xl 2xl:text-2xl font-bold text-center ">
              {q.question}
            </h1>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:mt-2">
            {/* <Check className="size-10 rounded-full p-2 bg-green-500 cursor-pointer" />
                  <X
                    className="size-10 rounded-full p-2 bg-red-500 cursor-pointer"
                    onClick={() => setShow(q._id)}
                  /> */}

            {showNote === q._id ? (
              <>
                <X
                  className="size-10 rounded-full p-2 bg-red-500 cursor-pointer"
                  onClick={() => setShowNote("")}
                />
                {saveNoteLoading ? (
                  <>
                    <button className="btn bg-green-500 btn-circle">
                      <Loader2 className="size-5 text-white rounded-full  animate-spin" />
                    </button>
                  </>
                ) : (
                  <Check
                    className="size-10 rounded-full p-2 bg-green-500 cursor-pointer"
                    onClick={() => handle_save_note(q._id, note)}
                  />
                )}
              </>
            ) : (
              <>
                <Eye
                  className="size-10 rounded-full p-2 bg-yellow-500 cursor-pointer"
                  onClick={() => setShow(q._id)}
                />
                <PenBoxIcon
                  className="size-10 rounded-full p-2 bg-blue-500 cursor-pointer"
                  onClick={() => setShowNote(q._id)}
                />
              </>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full h-full backface-hidden flex flex-wrap  overflow-x-hidden items-center justify-center rounded-md text-white bg-slate-800 border-2 border-orange-400 transform-[rotateY(180deg)]`}
        >
          <div className="p-2 md:p-4 justify-start items-start h-10/12 overflow-y-scroll">
            <MarkdownRender children={q.answer} />
          </div>
          <div className="p-2 flex flex-wrap justify-center items-center gap-4">
            <RotateCw
              className="size-10 rounded-full p-2 bg-yellow-500 cursor-pointer"
              onClick={() => setShow("")}
            />
            {/* {explanationLoading ? (
              <>
                <button className="btn bg-blue-500 btn-circle">
                  <Loader2 className="size-5 text-white rounded-full  animate-spin" />
                </button>
              </>
            ) : (
              <LightbulbIcon
                className="size-10 rounded-full p-2 bg-blue-500 cursor-pointer"
                onClick={() => handle_generate_explanation(q.question)}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepCard;
