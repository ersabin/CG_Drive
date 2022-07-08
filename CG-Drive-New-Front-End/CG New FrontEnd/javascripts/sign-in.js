
function checkUser() { 
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;  
    var request = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      fetch("http://localhost:63552/api/login", request)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => showstorage(data));
    } catch (error) {
      alert("you are not valid");
    }
  }
  function showstorage(data) {
    if (data.token != null && data.token != undefined && data.token != "") {
      sessionStorage.setItem("Token", data.token);
      sessionStorage.setItem("UserID", data.id);
      sessionStorage.setItem("Name", data.name);
    }
    loc();
  }
  function loc() {
    if (sessionStorage.getItem("Token") != null) {
      window.location.href = "dashboard.html";
    } else {
      alert("Login Credentials are wrong");
    }
  }


  function addData() {
    let user = document.getElementById("r-username").value;
    let password = document.getElementById("r-password").value;
    var curr = new Date();
    var DateTime =
      curr.getFullYear() +
      "-" +
      curr.getMonth() +
      "-" +
      curr.getDay() +
      " " +
      curr.getHours() +
      ":" +
      curr.getMinutes() +
      ":" +
      curr.getSeconds();
    console.log(DateTime);

    var request = {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({
        Username: user,
        Password: password,
        createdAt: DateTime,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    fetch("http://localhost:63552/api/Users", request)
      .then((response) => response.text())
      .then((result) => sesstorage(result))
      .catch((error) => alert("error", error));
  }

  function sesstorage(result) {
    sessionStorage.setItem("token", result.token);
    sessionStorage.setItem("UserID", result.id);
    sessionStorage.setItem("Name", result.name);
    show();
  }

  function show() {
    if (sessionStorage.getItem("token") != null) {
      window.location.href = "Sign_In.html";
    } else {
      alert("Login Credentials are wrong");
    }
  }