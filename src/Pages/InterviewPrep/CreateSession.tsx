import { Loader2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setAuthModal } from "../../redux/authSlice";
import api from "../../api/api";
import toast from "react-hot-toast";
import { apiPaths } from "../../utils/apiPaths";
import { useNavigate } from "react-router";
const CreateSession = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [topicToFocus, setTopicToFocus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(apiPaths.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicToFocus,
        numberOfQuestions: 5,
      });

      const { success, data } = res.data;
      console.log("questions: ", data);
      if (success) {
        const addRes = await api.post(apiPaths.SESSIONS.CREATE, {
          role,
          experience,
          topicToFocus,
          description,
          questions: data,
        });

        const { success, message } = addRes.data;
        if (success) {
          toast.success(message);
          dispatchCloseModal();
          navigate("/dashboard");
        } else {
          toast.error(message);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const dispatch = useDispatch();

  const dispatchCloseModal = () => {
    dispatch(setAuthModal("Closed"));
  };
  return (
    <div className="card w-xs md:w-xl bg-slate-800 absolute shadow-2xl p-2 md:px-8 md:py-4 shadow-slate-400">
      {/* <div className="flex flex-wrap justify-end pt-1"></div> */}
      <div className="card-title p-2 text-xl items-center justify-start text-gray-50">
        <div className="flex flex-wrap w-full p-2">
          <div className="flex flex-wrap w-full justify-between">
            <h2 className="text-sm md:text-xl">
              Start a New Interview Journey
            </h2>
            <X
              className="size-6 text-gray-50 hover:cursor-pointer hover:text-red-500 "
              onClick={dispatchCloseModal}
            />
          </div>
          <p className="text-xs mt-4 text-slate-300">
            fill out a few details and unlock a personalized set of interview
            questions
          </p>
        </div>
      </div>
      <div className="card-body p-2">
        <form
          className="form fieldset space-y-2 gap-2"
          onSubmit={(e) => handelSubmit(e)}
        >
          <div>
            <span className="text-gray-300 mt-2 p-2 text-[1rem] font-semibold">
              Target Role
            </span>
            <label className="input w-full mt-2 input-md">
              <input
                type="text"
                required
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="grow"
                placeholder="(ex Frontend Developer, UI/UX Designer, etc.)"
              />
            </label>
          </div>

          <div>
            <span className="text-gray-300 mt-2 p-2 text-[1rem] font-semibold">
              Years of Experience
            </span>
            <label className="input w-full mt-2 input-md">
              <input
                type="text"
                required
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="grow"
                placeholder="(e.g. 1 year,2 years,5+ years, etc.)"
              />
            </label>
          </div>

          <div>
            <span className="text-gray-300 mt-2 p-2 text-[1rem] font-semibold">
              Topic to focus on
            </span>
            <label className="input w-full mt-2 input-md">
              <input
                type="text"
                required
                onChange={(e) => setTopicToFocus(e.target.value)}
                value={topicToFocus}
                className="grow"
                placeholder="(Comma separated variables like HTML, CSS, JS, etc.)"
              />
            </label>
          </div>

          <div>
            <span className="text-gray-300 mt-2 p-2 text-[1rem] font-semibold">
              Description
            </span>
            <label className="input w-full mt-2 input-md">
              <input
                type="text"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="grow"
                placeholder="(Any specific goals or notes for this session)"
              />
            </label>
          </div>

          <button
            className="btn bg-linear-to-r from-orange-700 to-orange-400  mt-4"
            disabled={loading}
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
