import { useRef, useState } from "react";
import { Loader2, User2 } from "lucide-react";
import api from "../../api/api";
import { apiPaths } from "../../utils/apiPaths";

const UploadImage = () => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const inputFile = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = new FormData();

  const handle_click = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handle_image_upload = async (e: File) => {
    setLoading(true);

    try {
      form.append("image", e);

      const res = await api.post(apiPaths.IMAGE.UPLOAD, form);

      console.log("res: ", res);

      const { success, image } = res.data;
      if (success) {
        setImgUrl(image);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-4 ">
      <input
        onChange={(e) => {
          if (e.target.files) {
            handle_image_upload(e.target.files[0]);
          }
        }}
        type="file"
        accept="/image"
        className="hidden"
        ref={inputFile}
      />
      <div
        className={`rounded-full cursor-pointer ${
          loading ? "" : "border border-white p-0"
        }`}
        onClick={handle_click}
      >
        {" "}
        {loading ? (
          <Loader2 className="animate-spin w-15" />
        ) : imgUrl ? (
          <img
            src={imgUrl}
            alt="profile image"
            className="size-15 object-cover rounded-full"
          ></img>
        ) : (
          <User2 className="size-15 text-white " />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
