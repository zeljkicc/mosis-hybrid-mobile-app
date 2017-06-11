//dodato proba
document.addEventListener("deviceready", init, false);
function init() {


				function notifikacija(){
					navigator.notification.alert(
						"proba - notifikacija", null, "Obavestenje", "OK!");
						}

//alert("proba2);
function onSuccess(imageData) {
console.log('success');
var image = document.getElementById('myImage');
image.src = imageData;
}
function onFail(message) {
navigator.notification.alert(
message, null, "Camera Failure");
}
//Use from Camera
document.querySelector("#takePicture").addEventListener("touchend", function() {
alert("proba");
navigator.camera.getPicture(onSuccess, onFail, {
quality: 50,
sourceType: Camera.PictureSourceType.CAMERA,
destinationType: Camera.DestinationType.FILE_URI
});
});
//Use from Library
document.querySelector("#usePicture").addEventListener("touchend", function() {
navigator.camera.getPicture(onSuccess, onFail, {
quality: 50,
sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
destinationType: Camera.DestinationType.FILE_URI
});
});
}
/*
 
document.addEventListener("deviceready", init, false);

function init() {
    alert("usli smo ovde !!!")
	function onSuccess(imageData) {
		console.log('success');
		var image = document.getElementById('myImage');
		image.src = imageData;
	}

	function onFail(message) {
		navigator.notification.alert(
			message, null, "Camera Failure");
	}	

	//Use from Camera
	document.querySelector("#takePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.CAMERA,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});

	//Use from Library
	document.querySelector("#usePicture").addEventListener("touchend", function() {
		navigator.camera.getPicture(onSuccess, onFail, { 
			quality: 50,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: Camera.DestinationType.FILE_URI
		});

	});

}


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		alert("proba");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
 */
 
 
 
 //postavljeno za kavnas - logo aplikacije
 var sirinaKanvasa = 267;
var visinaKanvasa = 200;
var sirina = 125;
var visina = 105;
var padding = 25;
var sirinaLinije = 8;
var border = 5;
var boja1 = "#0000FF";
var boja2 = "#000000";

window.onload = windowReady;

function windowReady()
{

	var element = document.getElementById("logoKanvas");
	var kanvas = document.createElement('canvas');
	kanvas.setAttribute("width", sirinaKanvasa);
	kanvas.setAttribute("height", visinaKanvasa);
	kanvas.setAttribute("id", "logoKanvasa");
	element.appendChild(kanvas);
	if (typeof G_vmlCanvasManager != 'undefined') {
		kanvas = G_vmlCanvasManager.initElement(kanvas);
	}	
	var kontext = kanvas.getContext("2d");
	iscrtajLogo(kontext);
	kontext.save();
}


function iscrtajLogo(kontext)
{
	var phi = Math.tan((sirina/2) / visina);
	var x = border / Math.cos(phi);
	var y = x / Math.tan(phi);
	var gamma = Math.sqrt(Math.abs(border*border - x*x));

	kontext.beginPath();
	// Gornji ugao
	kontext.moveTo(sirinaKanvasa/2 - x, padding);	
	kontext.quadraticCurveTo(sirinaKanvasa/2, padding - y, sirinaKanvasa/2 + x, padding);

	// Desni ugao
	kontext.lineTo((sirinaKanvasa + sirina)/2 + gamma, padding + visina - gamma);	
	kontext.quadraticCurveTo((sirinaKanvasa + sirina)/2 + y, padding + visina + border, (sirinaKanvasa + sirina)/2, padding + visina + border);
	
	// Levi ugao
	kontext.lineTo((sirinaKanvasa - sirina)/2, padding + visina + border);
	kontext.quadraticCurveTo((sirinaKanvasa - sirina)/2 - y, padding + visina + border, (sirinaKanvasa - sirina)/2 - gamma, padding + visina - gamma);

	kontext.lineTo(sirinaKanvasa/2 - x, padding);
	kontext.closePath();
	

	var gradient = kontext.createLinearGradient(0, padding, 0, padding + visina);
	gradient.addColorStop(0.5, boja1);
	gradient.addColorStop(1, boja1);
	kontext.shadowBlur = 10;
	kontext.shadowColor = "black";
	kontext.fillStyle = "white";
	kontext.fill();	
	kontext.shadowBlur = 0;
	kontext.shadowColor = "transparent";
	kontext.fillStyle = gradient;
	kontext.fill();
	
	kontext.beginPath();
	kontext.moveTo(sirinaKanvasa/2, padding + sirinaLinije);
	kontext.lineTo((sirinaKanvasa + sirina)/2 - sirinaLinije, padding + visina - sirinaLinije/2);
	kontext.lineTo((sirinaKanvasa - sirina)/2 + sirinaLinije, padding + visina - sirinaLinije/2);
	kontext.lineTo(sirinaKanvasa/2, padding + sirinaLinije);
	kontext.closePath();

  	gradient = kontext.createLinearGradient(0, padding, 0, padding + visina);
	gradient.addColorStop(0, "#AAAAAA");
	gradient.addColorStop(1, "#AAAAAA");
	
	kontext.lineWidth = sirinaLinije;
  	kontext.lineJoin = "round";	
  	kontext.strokeStyle = gradient;
	kontext.stroke();

	kontext.beginPath();
	kontext.arc(sirinaKanvasa/2, 110, 5, 0, Math.PI*2, true);
	kontext.moveTo(sirinaKanvasa/2 - 3, 95);
	kontext.quadraticCurveTo(sirinaKanvasa/2, 105, sirinaKanvasa/2 + 3, 95);
	kontext.lineTo(sirinaKanvasa/2 + 8, 75);
	kontext.bezierCurveTo(sirinaKanvasa/2 + 10, 65, sirinaKanvasa/2 - 10, 65, sirinaKanvasa/2 - 8, 75, 5);
	kontext.lineTo(sirinaKanvasa/2 - 3, 95);
	kontext.closePath();
	kontext.fillStyle = "#AAAAAA";
	kontext.fill();
	
	kontext.font = "30px Arial";
    kontext.fillText("Navigator",70,165);
}


/**/
