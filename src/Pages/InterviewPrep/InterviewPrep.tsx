import { useState, useEffect } from "react";
import type { Question, Session } from "../../types/types";
import api from "../../api/api";
import { apiPaths } from "../../utils/apiPaths";
import { useParams } from "react-router";
import { fromDate } from "../../utils/utils";
import {
  Check,
  Eye,
  LightbulbIcon,
  Loader2,
  Loader2Icon,
  PenBoxIcon,
  RotateCw,
  X,
} from "lucide-react";
import { MarkdownRender } from "../AI/MarkdownRender";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [saveNoteLoading, setSaveNoteLoading] = useState(false);
  const [show, setShow] = useState("");
  const [showNote, setShowNote] = useState("");
  const [note, setNote] = useState("");
  const [question, setQuestion] = useState<Question[]>([]);
  const [session, setSession] = useState<Session>();
  const { id } = useParams();

  useEffect(() => {
    const get_data = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(
          apiPaths.SESSIONS.GET_BY_ID.replace(":id", id ? id : "")
        );
        // console.log("res data: ", res.data);

        const { success, data } = res.data;

        console.log("data: ", data);
        if (success) {
          setSession(data);
          // console.log("questions: ", data.questions);
          setQuestion(data.questions);
        }
      } catch (error) {
        console.log({ error });
      }
      setIsLoading(false);
    };

    get_data();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-wrap container min-h-screen justify-center items-center">
        <Loader2 className="size-15 text-orange-400 animate-spin" />
      </div>
    );
  }

  const handle_load_more = async () => {
    try {
      setQuestionsLoading(true);
      const res = await api.post(apiPaths.AI.GENERATE_QUESTIONS, {
        role: session?.role,
        experience: session?.experience,
        topicToFocus: session?.topicToFocus,
        numberOfQuestions: 3,
      });

      const { success, data } = res.data;
      // console.log("questions: ", data);
      if (success) {
        // console.log("adding questions: ", data);

        await api.post(apiPaths.QUESTION.ADD, {
          session_id: session?._id,
          questions: data,
        });
        setQuestion((prev) => [...prev, ...data]);
        toast.success("Questions added successfully");
      }
    } catch (error) {
      console.log(error);
    }
    setQuestionsLoading(false);
  };

  const handle_save_note = async (q_id: string, note: string) => {
    try {
      setSaveNoteLoading(true);
      console.log("note: ", note);
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

  return (
    <div className="text-white min-h-screen overflow-hidden">
      <div className="border-b border-b-orange-400">
        <div className="px-2 py-2 md:px-16 md:py-8 space-y-2">
          <h2 className="text-2xl font-bold">{session?.role}</h2>
          <p className="text-md font-semibold text-slate-300 px-1">
            {session?.topicToFocus}
          </p>
          <div className="flex flex-wrap mt-4 gap-4">
            <p className="text-md font-bold p-2 rounded-full bg-white text-black border border-white">
              Experience: {session?.experience}
            </p>
            <p className="text-md font-bold p-2 rounded-full bg-white text-black border border-white">
              {session?.questions.length} Q&A
            </p>
            <p className="text-md font-bold p-2 rounded-full bg-white text-black border border-white">
              Last Updated:{" "}
              {fromDate(new Date(session?.updatedAt as unknown as string))}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-start p-4 md:px-8 md:py-4 gap-4 ">
        {question.map((q, index) => (
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
                  <LightbulbIcon className="size-10 rounded-full p-2 bg-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center mb-6">
        <button
          disabled={questionsLoading}
          className="btn btn-primary btn-sm lg:btn-xl py-4 px-20 bg-linear-to-r from-orange-700 to-orange-400 hover:from-orange-600 hover:to-orange-300 duration-100 transition-all hover:scale-105 active:scale-100"
          onClick={() => handle_load_more()}
        >
          {questionsLoading ? (
            <div className="flex flex-wrap justify-center items-center gap-2">
              <Loader2Icon className="animate-spin size-8" /> Loading...
            </div>
          ) : (
            "Load More"
          )}
        </button>
      </div>
    </div>
  );
};

export default InterviewPrep;
