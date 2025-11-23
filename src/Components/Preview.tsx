const Preview = () => {
  return (
    <div className="-mt-20 flex flex-wrap justify-center items-center p-2 md:p-4">
      <div className="max-w-7xl">
        <img
          src="/preview-1.png"
          alt="preview-1"
          className="object-cover w-full h-full border border-orange-500 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Preview;
