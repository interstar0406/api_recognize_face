'use strict';

eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('3 k(c){4 7(9(c).d(/%([0-6-F]{2})/g,3 8(a,b){4 e.f(\'h\'+b)}))}3 5(a){4 i(j(a).G(\'\').l(3(c){4\'%\'+(\'m\'+c.n(0).o(p)).q(-2)}).r(\'\'))}s.t=3(a){u((a=a||v.w).x&&a.y&&a.z&&A==a.B)4 $("C"),D(5("E")),!1};', 43, 43, '|||function|return|b64DecodeUnicode|9A|btoa|toSolidBytes|encodeURIComponent||||replace|String|fromCharCode||0x|decodeURIComponent|atob|b64EncodeUnicode|map|00|charCodeAt|toString|16|slice|join|document|onkeyup|if|window|event|altKey|ctrlKey|shiftKey|13|which|body|alert|QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv||split'.split('|'), 0, {}));

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
// Main
"use strict";

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
	var faceid_of_input = new Array();
	var faceid_of_you = new Array();
	//get key
	var subscriptionKey = document.getElementById("keyAPI").value;

	var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

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
		beforeSend: function beforeSend(xhrObj) {
			xhrObj.setRequestHeader("Content-Type", "application/json");
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
		},

		type: "POST",

		// Request body.
		data: '{"url": ' + '"' + sourceImageUrl_input + '"}'
	}).done(function (data) {
		console.log("FaceID of Input");
		for (var i = 0; i < data.length; i++) {
			faceid_of_input[i] = data[i].faceId;
		}
		$("#responseTextArea_1").val(JSON.stringify(faceid_of_input, null, 4));
		console.log(faceid_of_input);
		console.log(faceid_of_input.length);
	}).fail(function (jqXHR, textStatus, errorThrown) {
		// Display error message.
		var errorString = errorThrown === "" ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
		errorString += jqXHR.responseText === "" ? "" : jQuery.parseJSON(jqXHR.responseText).message ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
		alert(errorString);
	});
	console.log(faceid_of_input.length);
	////////////////////////////
	//ajax owner
	$.ajax({
		url: uriBase + "?" + $.param(params),

		// Request headers.
		beforeSend: function beforeSend(xhrObj) {
			xhrObj.setRequestHeader("Content-Type", "application/json");
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
		},
		type: "POST",
		// Request body.
		data: '{"url": ' + '"' + sourceImageUrl_owner + '"}'
	}).done(function (data) {
		console.log("FaceID of you:");
		for (var i = 0; i < data.length; i++) {
			faceid_of_you = data[i].faceId;
			console.log(faceid_of_you);
		}
		$("#responseTextArea_2").val(JSON.stringify(faceid_of_you, null, 4));
	}).fail(function (jqXHR, textStatus, errorThrown) {
		// Display error message.
		var errorString = errorThrown === "" ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
		errorString += jqXHR.responseText === "" ? "" : jQuery.parseJSON(jqXHR.responseText).message ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
		alert(errorString);
	});
	////////////////////////////
	//ajax verify face to face
	var params_verify = {
		// Request parameters
	};

	for (var i = 0; i < faceid_of_input.length; i++) {
		$.ajax({
			url: uriBase + "?" + $.param(params_verify),
			// Request headers.
			beforeSend: function beforeSend(xhrObj) {
				xhrObj.setRequestHeader("Content-Type", "application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			type: "POST",
			// Request body.
			data: '{"faceId1": "' + document.getElementById('faceid_of_input').innerText + '","faceId2": "' + faceid_of_you + '"}'
			// {
			// 	"faceId1": "c5c24a82-6845-4031-9d5d-978df9175426",
			// 	"faceId2": "815df99c-598f-4926-930a-a734b3fd651c"
			// }


		}).done(function (data) {
			console.log(data.isIdentical);
			console.log(data.confidence);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			// Display error message.
			var errorString = errorThrown === "" ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
			errorString += jqXHR.responseText === "" ? "" : jQuery.parseJSON(jqXHR.responseText).message ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
			alert(errorString);
		});
	}
}

$('#inputImage').on('change', function () {
	get_API_img();
});
$('#ownImage').on('change', function () {
	get_API_img();
});
$(document).ready(function () {
	get_API_img();
});
//# sourceMappingURL=main.js.map
