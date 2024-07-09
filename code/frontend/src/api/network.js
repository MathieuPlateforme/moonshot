
const url = "https://127.0.0.1:8000/"

const dbLogin = async (data) => {
  const response = await fetch(url + "login", {
    method: "POST",
    body: data,
  });
  return await response.json();
};

const dbGet = async (route, data) => {
    data.append("method", "GET");
    //   data.append("token", localStorage.getItem("token"));
      const response = await fetch(url + route, {
        method: "POST",
        body: data,
      });
      return await response.json();
};

const dbPost = async (route, data) => {
  data.append("method", "POST");
//   data.append("token", localStorage.getItem("token"));
  const response = await fetch(url + route, {
    method: "POST",
    body: data,
  });
  return await response.json();
};

const dbPut = async (route, data) => {
  data.append("method", "PUT");
//   data.append("token", localStorage.getItem("token"));
  const response = await fetch(url + route, {
    method: "POST",
    body: data,
  });
  return await response.json();
};

const dbDelete = async (route, data) => {
  data.append("method", "DELETE");
//   data.append("token", localStorage.getItem("token"));
  const response = await fetch(url + route, {
    method: "POST",
    body: data,
    // headers: {
    //   token: localStorage.getItem("token"),
    // },
  });
  return await response.json();
};

export { dbLogin, dbGet, dbPost, dbPut, dbDelete };
