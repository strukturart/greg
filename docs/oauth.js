import { accounts } from "./apps.js";
import localforage from "localforage";

const google_cred = {
  clientId:
    "762086220505-f0kij4nt279nqn21ukokm06j0jge2ngl.apps.googleusercontent.com",
  clientSecret: "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",
};
const authorizationCode = "";
let get_token = function () {
  const code = window.location.href;
  const r = code.split("&code=");
  const b = r[1].split("&");

  //localStorage.setItem("authorizationCode", b[0]);
  authorizationCode = b[0];
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
  // console.log(result);
  //JSON.stringify(result);
  // localStorage.setItem("oauth_auth", JSON.stringify(result));

  accounts.push({
    server_url: "https://apidata.googleusercontent.com/caldav/v2/",
    tokens: result,
    authorizationCode: authorizationCode,
    name: "Google",
    id: uid(32),
    type: "oauth",
  });

  localforage
    .setItem("accounts", accounts)
    .then(function (value) {
      window.close();
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });
});
