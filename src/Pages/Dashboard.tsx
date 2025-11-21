import { useEffect, useState } from "react";
import api from "../api/api";
import { apiPaths } from "../utils/apiPaths";
import { Album, Trash2 } from "lucide-react";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const res = await api.get(apiPaths.SESSIONS.GET_ALL);
        console.log("res data: ", res.data);

        setSessions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSessions();
  }, []);

  return (
    <div className="min-h-screen p-1 md:p-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="card border p-2 hover:cursor-pointer hover:scale-105 hover:shadow-md hover:shadow-orange-800 hover:border-orange-500  border-orange-500">
          <div className="card-title bg-green-950 p-2 rounded-xl ">
            <Album className="size-10 text-orange-500" />
            <div>
              <h3 className="font-bold">Front-end Developer</h3>
              <p className="text-xs text-slate-300">
                React,JavaScript, HTML, CSS{" "}
              </p>
            </div>
            <Trash2 className="hover:btn-outline hover:border-red-500 size-5 text-red-500 absolute bottom-4 right-4" />
          </div>
          <div className="card-body">bottom</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
