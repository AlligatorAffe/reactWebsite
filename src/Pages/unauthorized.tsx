import { useNavigate } from "react-router-dom";


const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <p>
      Unathorized
      </p>
      <div>
        <button onClick={goBack}> go back</button>
      </div>
    </div>
  );
}

export default Unauthorized;
