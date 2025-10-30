import { ClipLoader } from "react-spinners";

const SpinerLoading = () => {
  return (
    <div className="backdrop-blur-xs fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <ClipLoader color="#0077ff" size={40} />
    </div>
  );
};

export default SpinerLoading;
