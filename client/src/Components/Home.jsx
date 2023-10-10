import axios from "axios";
import { useEffect } from "react";

function Home() {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/home")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}

export default Home;
