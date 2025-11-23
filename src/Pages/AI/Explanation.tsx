import { useSelector } from "react-redux";
import { MarkdownRender } from "./MarkdownRender";
import type { RootState } from "../../redux/store";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleOpenExplanation } from "../../redux/sidebarSlice";

const Explanation = () => {
  const explanation = useSelector(
    (state: RootState) => state.sidebar.explanation
  );

  const dispatch = useDispatch();

  const closeExplanation = () => {
    dispatch(toggleOpenExplanation());
  };

  return (
    <div className="container w-full p-2 md:p-4">
      <div className="flex flex-wrap flex-col">
        <div className="flex flex-wrap">
          <h1 className="text-2xl font-bold">{explanation.title}</h1>
          <X className="size-8 hover:text-red-500" onClick={closeExplanation} />
        </div>
        <MarkdownRender children={explanation.explanation}></MarkdownRender>
      </div>
    </div>
  );
};

export default Explanation;
