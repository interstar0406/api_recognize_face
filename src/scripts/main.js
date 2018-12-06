// Main
"use strict";






///////////////////////////////////////
///////////////FUNCTION////////////////
///////////////////////////////////////
function setKey() {
	var subscriptionKey = document.getElementById("keyAPI").value;
	if (subscriptionKey === "") {
		document.getElementById("keyAPI").style.borderColor = "red";
		document.getElementById("keyAPI").focus();
	} else {
		document.getElementById("keyAPI").style.borderColor = document.getElementById("inputImage").style.borderColor;
	}
}

function get_API_img() {
	var faceid_of_input = new Array();
	var faceid_of_you = new Array();
	//get key
	var subscriptionKey = document.getElementById("keyAPI").value;

	var uriBase =
		"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

	// Request parameters.
	var params = {
		"returnFaceId": "true",
		"returnFaceLandmarks": "false",
		"returnFaceAttributes": ""
	};
	// Display the image.
	var sourceImageUrl_input = document.getElementById("inputImage").value;
	document.querySelector("#sourceImage_1").src = sourceImageUrl_input;
	var sourceImageUrl_owner = document.getElementById("ownImage").value;
	document.querySelector("#sourceImage_2").src = sourceImageUrl_owner;

	///////////////////////////////////
	// Perform the REST API call.
	// ajax input
	$.ajax({
			url: uriBase + "?" + $.param(params),
			// Request headers.
			beforeSend: function (xhrObj) {
				xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},

			type: "POST",

			// Request body.
			data: '{"url": ' + '"' + sourceImageUrl_input + '"}',
		})

		.done(function (data) {
			for (var i = 0; i < data.length; i++) {
				faceid_of_input[i] = data[i];
			}
			$("#responseTextArea_1").text(JSON.stringify(faceid_of_input, null, 4));
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			// Display error message.
			var errorString = (errorThrown === "") ?
				"Error. " : errorThrown + " (" + jqXHR.status + "): ";
			errorString += (jqXHR.responseText === "") ?
				"" : (jQuery.parseJSON(jqXHR.responseText).message) ?
				jQuery.parseJSON(jqXHR.responseText).message :
				jQuery.parseJSON(jqXHR.responseText).error.message;
			alert(errorString);
		});
	////////////////////////////
	//ajax owner
	$.ajax({
			url: uriBase + "?" + $.param(params),

			// Request headers.
			beforeSend: function (xhrObj) {
				xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			type: "POST",
			// Request body.
			data: '{"url": ' + '"' + sourceImageUrl_owner + '"}',
		})
		.done(function (data) {
			for (var i = 0; i < data.length; i++) {
				faceid_of_you = data[i].faceId;
			}
			$("#responseTextArea_2").text(JSON.stringify(faceid_of_you, null, 4));
		})

		.fail(function (jqXHR, textStatus, errorThrown) {
			// Display error message.
			var errorString = (errorThrown === "") ?
				"Error. " : errorThrown + " (" + jqXHR.status + "): ";
			errorString += (jqXHR.responseText === "") ?
				"" : (jQuery.parseJSON(jqXHR.responseText).message) ?
				jQuery.parseJSON(jqXHR.responseText).message :
				jQuery.parseJSON(jqXHR.responseText).error.message;
			alert(errorString);
		});
	////////////////////////////
	//ajax verify face to face
	var params_verify = {
		// Request parameters
	};


	$.ajax({
			url: uriBase + "?" + $.param(params_verify),
			// Request headers.
			beforeSend: function (xhrObj) {
				xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			type: "POST",
			// Request body.
			data: '{"faceId1": "12892ed8-ff96-4192-bcba-59d25771801a","faceId2": "d60ede49-e9b5-48e4-9d2b-6f426c2f3df3"}',
			// {
			// 	"faceId1": "c5c24a82-6845-4031-9d5d-978df9175426",
			// 	"faceId2": "815df99c-598f-4926-930a-a734b3fd651c"
			// }


		})
		.done(function (data) {
			$('#isIdentical').text = data.isIdentical;
			$('#confidence').text = data.confidence;
		})

		.fail(function (jqXHR, textStatus, errorThrown) {
			// Display error message.
			var errorString = (errorThrown === "") ?
				"Error. " : errorThrown + " (" + jqXHR.status + "): ";
			errorString += (jqXHR.responseText === "") ?
				"" : (jQuery.parseJSON(jqXHR.responseText).message) ?
				jQuery.parseJSON(jqXHR.responseText).message :
				jQuery.parseJSON(jqXHR.responseText).error.message;
			alert(errorString);
		});

	// //get obj
	// var obj = JSON.parse($("#responseTextArea_2").text())
	// console.log(obj);
}





$('#inputImage').on('change', function () {
	get_API_img();
})
$('#ownImage').on('change', function () {
	get_API_img();
})
$(document).ready(function () {
	get_API_img();
});
