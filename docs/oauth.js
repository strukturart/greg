const google_cred = {
  authorizationCode: "",
  clientId:
    "762086220505-f0kij4nt279nqn21ukokm06j0jge2ngl.apps.googleusercontent.com",
  clientSecret: "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",
  email: "strukturart@gmail.com",
  url: "https://accounts.google.com/o/oauth2/v2/auth?client_id=762086220505-f0kij4nt279nqn21ukokm06j0jge2ngl.apps.googleusercontent.com&response_type=code&state=state_parameter_passthrough_value&scope=https://www.googleapis.com/auth/calendar&redirect_uri=https://strukturart.github.io/greg/&access_type=offline&prompt=consent",
};
let get_token = function () {
  const code = window.location.href;
  const r = code.split("&code=");
  const b = r[1].split("&");
  alert(b[0]);

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
  //window.close();
});
