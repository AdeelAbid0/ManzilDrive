import { useParams } from "react-router-dom";
const EditAd = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>edit ad</h1>
    </div>
  );
};

export default EditAd;
