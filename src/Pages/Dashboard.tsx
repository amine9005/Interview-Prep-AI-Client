import { useEffect, useState, type MouseEvent } from "react";
import api from "../api/api";
import { apiPaths } from "../utils/apiPaths";
import { Album, Loader2Icon, Plus, Trash2 } from "lucide-react";
import type { Session } from "../types/types";
import { fromDate } from "../utils/utils";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthModal } from "../redux/authSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  // const handleDelete = async (id: string) => {};

  const dispatch = useDispatch();

  const dispatch_create_session = () => {
    dispatch(setAuthModal("CreateSession"));
  };

  const handle_delete = async (e: MouseEvent, id: string) => {
    e.preventDefault();

    try {
      const res = await api.delete(apiPaths.SESSIONS.DELETE.replace(":id", id));
      const { success } = res.data;
      if (success) {
        toast.success("Session deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getSessions = async () => {
      setLoading(true);
      try {
        const res = await api.get(apiPaths.SESSIONS.GET_ALL);
        const { data } = res.data;

        // console.log({ success, data });

        setSessions(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getSessions();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-4">
      {loading ? (
        <div className="flex flex-wrap min-h-screen justify-center items-center">
          <Loader2Icon className="animate-spin size-20 text-orange-500" />
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <button
            onClick={() => dispatch_create_session()}
            className="z-10 absolute bottom-10 justify-self-center md:bottom-30 md:right-30 btn btn-primary btn-lg px-8 hover:shadow-amber-400 hover:shadow-2xl"
          >
            <Plus />
            add New
          </button>

          {/* Session Card */}
          {sessions.length === 0 ? (
            <div className="min-h-screen p-4">
              <div className="flex flex-wrap justify-center items-center">
                <h1 className="font-bold text-white">
                  Welcome!, Start By Creating A New Session By Using The Button
                  Bellow
                </h1>
              </div>
            </div>
          ) : (
            sessions.map((session) => (
              <Link
                to={`/Interview-prep/${session._id}`}
                key={session._id}
                className="card bg-slate-800  p-2 hover:cursor-pointer hover:scale-105 hover:shadow-md hover:shadow-slate-400 hover:border-slate-400 border-r-4"
              >
                <div className="card-title bg-linear-to-r from-blue-900 to-blue-400 p-2 py-4 rounded-xl ">
                  <Album className="size-10" />
                  <div>
                    <h3 className="font-bold">{session.role}</h3>
                    <p className="text-xs text-slate-300">
                      {session.topicToFocus}
                    </p>
                  </div>
                </div>
                <div className="card-body  p-0 pt-2">
                  <div className="flex flex-wrap mt-2 gap-2">
                    <div className="border border-white rounded-full p-2 font-semibold text-center">
                      Experience: {session.experience.split(" ")[0]} years
                    </div>
                    <div className="border border-white rounded-full p-2 font-semibold text-center">
                      {session.questions.length} Q&A
                    </div>
                  </div>
                  <div className="p-2 font-semibold">{session.description}</div>
                </div>
                <div className="flex flex-wrap justify-between p-1 mt-1">
                  <p className="text-slate-300/80 p-1 text-end">
                    {fromDate(new Date(session.updatedAt))}
                  </p>
                  <button
                    className="btn btn-ghost btn-circle hover:border-red-500"
                    onClick={(e) => handle_delete(e, session._id)}
                  >
                    <Trash2 className="hover:btn-outline hover:border-red-500 size-5 text-red-500 " />
                  </button>{" "}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
