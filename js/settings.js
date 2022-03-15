const firebaseConfig = {
    apiKey: "AIzaSyDhVJvvLu-8S40clwOkI9xbbukHHTY7K3M",
    authDomain: "smart-lighting-8d58d.firebaseapp.com",
    databaseURL: "https://smart-lighting-8d58d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smart-lighting-8d58d",
    storageBucket: "smart-lighting-8d58d.appspot.com",
    messagingSenderId: "117872486542",
    appId: "1:117872486542:web:b95cf1f8acbe041c9001df"
  };
  
firebase.initializeApp(firebaseConfig);
var urlSettings="/settings/userSettings"

function updateSettings(){
  var lightThreshold = document.getElementById("lightThreshold").value;
  var desiredLightLevel = document.getElementById("desiredLightLevel").value;
  //var timeLightsOn= document.getElementById("timeLightsOn").value;
  //var timeLightsOff = document.getElementById("timeLightsOff").value;
  if ((lightThreshold>0)&&(lightThreshold<256)){
	  if ((desiredLightLevel>0)&&(desiredLightLevel<256)){
		  //console.log("Pass")
		  var postData = {
			lightThreshold:lightThreshold,
			desiredLightLevel: desiredLightLevel,
			//timeLightsOn: timeLightsOn,
			//timeLightsOff: timeLightsOff
		  };
		  var url = urlSettings
		  //console.log(url);
		  var updates = {};
		  updates[url] = postData;
		  return firebase.database().ref().update(updates);
		  alert("Settings Updated Successfully!")
	  }
	  else{
		  alert("Number must be between 1-255 inclusive")
	  }
  }
  else{
	  alert("Number must be between 1-255 inclusive")
  }
}

function turnOn(){
	var brightness='255';
	var brightness='255';
	var postData = {
		lightThreshold: '255',
		desiredLightLevel: brightness
		};
	var url = urlSettings
	var updates = {};
	updates[url] = postData;
	return firebase.database().ref().update(updates);
	alert("Lights Turned On")
}
function turnOff(){
	var brightness='0';
	var postData = {
		lightThreshold:'255',
		desiredLightLevel: brightness
		};
		var url = urlSettings
		var updates = {};
		updates[url] = postData;
		return firebase.database().ref().update(updates);
		alert("Lights Turned Off")
}
function status(){
	//work in progress
	var CurrentLightLevel = firebase.database().ref("/data/");
	var myDBConn = firebase.database().ref("/settings/");
	
	  myDBConn.on("child_added", function (data) {
              document.getElementById("lightStatus").innerHTML =
               "<br>";
              var datapoint = data.val();
			  let threshold=datapoint.lightThreshold;
			  let desiredLightLevel=datapoint.desiredLightLevel;
              document.getElementById("lightStatus").innerHTML +=
                "Light Threshold" +
                "&emsp;" +
                datapoint.lightThreshold +
                "<br>" +
                "Desired Light Level" +
                "&emsp;" +
                datapoint.desiredLightLevel +
                "<br>";
				
				
				CurrentLightLevel.on("child_added", function (data) {
				var datapoint=data.val();
				let LightLevel=datapoint.CurrentLightLevel;
				document.getElementById("lightStatus").innerHTML+=
				"External Light Level" +
				"&emsp;" +
				datapoint.CurrentLightLevel +
				"<br>";
				
		if (threshold<datapoint.CurrentLightLevel){
			 document.getElementById("lightStatus").innerHTML +=
			 "Lights are Off";
			 console.log(datapoint.CurrentLightLevel);
			 console.log(threshold);
		}
		else{
			if (desiredLightLevel==0){
				document.getElementById("lightStatus").innerHTML +=
				"Lights are Off";
			}
			else{
			document.getElementById("lightStatus").innerHTML +=
			"Lights are On";
			console.log(datapoint.CurrentLightLevel);
			console.log(threshold);
			}
		}
      });
	  });
}