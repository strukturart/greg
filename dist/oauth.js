import { google_cred } from "./assets/js/google_cred.js";

let get_token = function () {
  const code = window.location.href;
  const r = code.split("&code=");
  const b = r[1].split("&");
  alert(b[0]);
  //localStorage.setItem("authorizationCode", encodeURI(b[0]));

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("code", b[0]);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("redirect_uri", "https://strukturart.github.io/greg/");
  urlencoded.append("client_id", google_cred.clientId);
  urlencoded.append("client_secret", google_cred.clientSecret);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch("https://oauth2.googleapis.com/token", requestOptions).then(
    (response) => response.json()
  );
};

get_token().then((result) => {
  console.log(result);
  JSON.stringify(result);
  localStorage.setItem("oauth_auth", JSON.stringify(result));
  window.close();
});
