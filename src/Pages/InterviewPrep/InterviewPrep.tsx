import { useState, useEffect } from "react";
import type { Question, Session } from "../../types/types";
import api from "../../api/api";
import { apiPaths } from "../../utils/apiPaths";
import { useParams } from "react-router";
import { fromDate } from "../../utils/utils";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const InterviewPrep = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        console.log("res data: ", res.data);

        const { success, data } = res.data;

        console.log("data: ", data);
        if (success) {
          setSession(data);
          console.log("questions: ", data.questions);
          setQuestion(data.questions);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    get_data();
  }, [id]);

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
      <div className="flex flex-wrap justify-center items-start p-2 md:px-8 md:py-4 gap-4">
        {question.map((q, index) => (
          <div
            key={index}
            className=" group w-full h-[400px] md:h-[600px] mx-auto perspective-1000px cursor-pointer"
          >
            <div className="relative w-full h-full transition-transform duration-1000 transform-3d group-hover:transform-[rotateY(180deg)] ">
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-2xl backface-hidden flex items-center justify-center text-white bg-slate-800  ">
                <h1 className="text-2xl font-bold text-center justify-center items-center">
                  {q.question}
                </h1>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full backface-hidden flex flex-wrap overflow-y-scroll items-center justify-center rounded-md text-white bg-slate-800 border-2 border-orange-400 transform-[rotateY(180deg)]">
                <div className="p-2 md:p-4 justify-start items-start ">
                  <div className="reset-tw">
                    <Markdown>{q.answer}</Markdown>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
