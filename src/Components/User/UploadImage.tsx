import { useState } from "react";
import { User2 } from "lucide-react";

const UploadImage = () => {
  const [imgUrl, setImgUrl] = useState<string>("");

  return (
    <div className="flex flex-wrap justify-center items-center mt-4 ">
      <div className="rounded-full border border-white p-1 cursor-pointer">
        {imgUrl ? (
          <img src={imgUrl} alt="profile image" className="size-10"></img>
        ) : (
          <User2 className="size-15 text-white " />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
