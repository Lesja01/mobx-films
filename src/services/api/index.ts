import http from "./http";

//const BASEURL = "https://kinopoiskapiunofficial.tech/";
const BASEURL = "http://jsonplaceholder.typicode.com/users";

export function getUsers(data?: object): Promise<any> {
  return http.get!("", data || {}, BASEURL);
}
