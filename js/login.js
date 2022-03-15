function check() {
  var user = document.getElementById("adminUsername").value;
  var pass = document.getElementById("adminPass").value;
  var ref = firebase.database().ref("admin/logins/" + user);
  if (user == adminLogin) {
    ref
      .orderByChild("username")
      .equalTo(adminLogin)
      .on("child_added", function (snapshot) {
        ref
          .orderByChild("password")
          .equalTo(pass)
          .on("child_added", function (snapshot) {
            var admin = true;
            document.getElementById("dashboard").innerHTML =
            //Update Stats
        //      '<h2>Admin Dashboard</h2><br><br><input type=text id="usernameIn" placeholder="Enter Username"></input><br><input id="passwordIn" input="text" placeholder="Enter Password"></input><br><button onclick="addUser()">Add User</button><br><input type=text id="Team" placeholder="Enter Opponent"></input><br><input type=text id="playerUsername" placeholder="Enter Player Username"></input><br><input type="number" id="turnoversWon" placeholder="Turnovers Won"></input><br><input id="turnoversLost" input="number" placeholder="Turnovers Lost"></input><br><input type=text id="dateIn" placeholder="Enter Date of Match"></input><br><button onclick="updateStats()">Add Stats</button><br><br><br><h3><strong>Sample Format for Adding Stats</strong><br><input readonly placeholder="Fingallians"></input><br><input readonly placeholder="Player11"></input><br><input readonly placeholder="5"></input><br><input readonly placeholder="4"></input><br><input readonly placeholder="February 12th 2022"></input>';
        //Add Stats
              '<h2>Admin Dashboard</h2><br><br><input type=text id="usernameIn" placeholder="Enter Username"></input><br><input id="passwordIn" input="text" placeholder="Enter Password"></input><br><button onclick="addUser()">Add User</button><br><input type=text id="Team" placeholder="Enter Opponent"></input><br><input type=text id="playerUsername" placeholder="Enter Player Username"></input><br><input type="number" id="turnoversWon" placeholder="Turnovers Won"></input><br><input id="turnoversLost" input="number" placeholder="Turnovers Lost"></input><br><input type=text id="dateIn" placeholder="Enter Date of Match"></input><br><button onclick="addStats()">Add Stats</button><br><br><br><h3><strong>Sample Format for Adding Stats</strong><br><input readonly placeholder="Fingallians"></input><br><input readonly placeholder="Player11"></input><br><input readonly placeholder="5"></input><br><input readonly placeholder="4"></input><br><input readonly placeholder="February 12th 2022"></input>';
          });
      });
  } else {
    alert("Not authorised!");
    var admin = false;
  }
}


function submit() {
  var adminLogin="admin123";
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  var select = document.getElementsByName("Select Game").value;
  var date= document.getElementById("game").value;
  var teamName = document.getElementById("game").value;
  var ref = firebase.database().ref("admin/logins/" + user);
    ref
      .orderByChild("username")
      .equalTo(user)
      .on("child_added", function () {
        ref
          .orderByChild("password")
          .equalTo(pass)
          .on("child_added", function () {
//Read the Stats if the stats were UPDATED to Firebase.
            var myDBConn = firebase.database().ref(`/test/${user}/${date}`);
      });
  }
}



function updateSettings() {
  var usernameIn = document.getElementById("playerUsername").value;
  var turnoversWon = document.getElementById("turnoversWon").value;
  var turnoversLost = document.getElementById("turnoversLost").value;
  var Team = document.getElementById("Team").value;
  var dateIn = document.getElementById("dateIn").value;
  var postData = {
    date:dateIn,
    turnoversWon: turnoversWon,
    turnoversLost: turnoversLost
  };
  //var url = "/stats/" + usernameIn +"/" + Team +"/" + dateIn;
  var url = "/test/" + usernameIn +"/" + dateIn;
  console.log(url);
  var updates = {};
  updates[url] = postData;
  return firebase.database().ref().update(updates);
  alert("Stats Updated Successfully!");
}
