import axios from "axios";
export const BASEURL = "https://agile-lowlands-91596.herokuapp.com";
// export const BASEURL = "http://localhost:5000";

export default axios.create({
  baseURL: BASEURL,
});
