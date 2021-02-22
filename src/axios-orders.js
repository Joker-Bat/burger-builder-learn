import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burgerbuilder-9efb2-default-rtdb.firebaseio.com/",
});

export default instance;
