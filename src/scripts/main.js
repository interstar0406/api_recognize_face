// Main
"use strict";

$('#inputImage').on('change', function () {
	get_API_img();
})
$('#ownImage').on('change', function () {
	get_API_img();
})
$(document).ready(function () {
	get_API_img();
});




///////////////////////////////////////
///////////////FUNCTION/////////////////
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
	var faceid_of_input = "";
	var faceid_of_you = "";
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
			console.log("input");
			for (var i = 0; i < data.length; i++) {
				faceid_of_input = data[i].faceId;
				console.log(faceid_of_input);
			}
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
	$
		.ajax({
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
			console.log("FaceID of you:");
			for (var i = 0; i < data.length; i++) {
				faceid_of_you = data[i].faceId;
				console.log(faceid_of_you);
				
			}
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
	var params_verify= {
		// Request parameters
	};
	$(function () {
		$.ajax({
				url: uriBase+ "?" + $.param(params_verify),
				// Request headers.
				beforeSend: function (xhrObj) {
					xhrObj.setRequestHeader("Content-Type", "application/json");
					xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
				},
				type: "POST",
				// Request body.
				data: '{"faceId1": "' + faceid_of_input + '","faceId2": "' + faceid_of_you + '"}',
			})
			.done(function (data) {
				console.log(data.isIdentical);
				console.log(data.confidence);
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
	});
}
