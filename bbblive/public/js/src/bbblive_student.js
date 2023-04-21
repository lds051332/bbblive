/* Javascript for BBBLiveXBlock. */
function BBBLiveXBlock(runtime, element, imageURL) {

	var userName = "null";
	var SessionCode = "null";
	var is_staff = false;
	var bbb_url_host = "https://live.bigedx.com:9000/";

	function teacherLogin(redUser, redPassword) {
		var xhr = new XMLHttpRequest();
		var params = {techID: redUser, passwd: redPassword};
		var url = bbb_url_host + "api/v1/signin?techID=" + redUser + "&passwd=" + redPassword;
		xhr.open("GET", url, false);
		xhr.onload = function (e) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				SessionCode = data.session;
			} else {
				console.error(xhr.statusText);
				alert(xhr.status);
			}
			if(data.errCode != 0)
			{
				alert(data.errMsg);
			}
		};
		xhr.onerror = function (e) {
			console.error(xhr.status);
			alert(xhr.status);
		};
		xhr.send(JSON.stringify(params));
	}

	function getUserName()
	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/user/v1/me", false);
		xhr.onload = function (e) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				userName = data.username;
			} else {
				console.error(xhr.statusText);
				alert(xhr.status);
			}
		};
		xhr.onerror = function (e) {
			console.error(xhr.status);
			alert(xhr.status);
		};
		xhr.send(null);
	}

	function getUserIs_Staff()
	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/user/v1/is_staff", false);
		xhr.onload = function (e) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				if(data.is_staff == true)
				{
					is_staff = true;
				}
				else
				{
					is_staff = false;
				}
			} else {
				console.error(xhr.statusText);
				alert(xhr.status);
			}
		};
		xhr.onerror = function (e) {
			console.error(xhr.status);
			alert(xhr.status);
		};
		xhr.send(null);
	}

	function GetStudentEnterHref() {
		getUserName();
		var userID = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
		//https://w03.bbbdev.cf:8000/zha-7b4d76ec11    red light中的分享url
		//https://w03.bbbdev.cf:8000/api/v1/start?meetingURL=zha-7b4d76ec11 实际使用的api
		//var bbb_API_URl = "https://w03.bbbdev.cf:8000/api/v1/start?meetingURL=zha-7b4d76ec11&userName=das&passwd=295661&userID=46";
		var bbbLiveUrl = $('#bbbURLLable', element).text();
		var bbbPassword = $('#bbbPasswordLable', element).text();
		bbbLiveUrl = bbbLiveUrl.replace(bbb_url_host, bbb_url_host + "api/v1/start?meetingURL=");		
		var bbb_API_URl = bbbLiveUrl + "&userName=" + userName + "&passwd=" + bbbPassword + "&userID=" + userID;
		console.log(bbb_API_URl);
		//alert("bbb_API_URl " + bbb_API_URl);
		fetch(bbb_API_URl)
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (myJson.errCode != 0) {
					console.log(myJson.errCode);
					alert(myJson.errMsg);
				}
				else {
					//alert(myJson.joinURL);
					$('#enter-href', element).attr("href", myJson.joinURL);
					$('#enter-img-href', element).attr("href", myJson.joinURL);
				}
			});
	}

	function GetTeacherEnterHref() {
		var redlightUsername = $('#redlightUsername', element).text();
		var redlightPassword = $('#redlightPassword', element).text();
		teacherLogin(redlightUsername, redlightPassword);
		var bbbLiveUrl = $('#bbbURLLable', element).text();
		bbbLiveUrl = bbbLiveUrl.replace(bbb_url_host, bbb_url_host + "api/v1/start?meetingURL=");
		var bbb_API_URl = bbbLiveUrl + "&session=" + SessionCode;
		console.log(bbb_API_URl);
		//alert("bbb_API_URl " + bbb_API_URl);
		fetch(bbb_API_URl)
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (myJson.errCode != 0) {
					console.log(myJson.errCode);
					alert(myJson.errMsg);
				}
				else {
					//alert(myJson.joinURL);
					$('#teacher-enter-href', element).attr("href", myJson.joinURL);
				}
			});
	}

	$(document).ready(function () {
		getUserIs_Staff();
		GetStudentEnterHref();
		if(is_staff)
		{
			$('#teacher-only-li', element).attr("style", "");
			GetTeacherEnterHref();
		}		
		/*var xhr = new XMLHttpRequest();
		xhr.open("GET", bbb_API_URl, true);
		xhr.onload = function (e) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var data = JSON.parse(xhr.responseText);
					alert(xhr.responseText);
					if(data.errCode != 0)
					{
						console.log(data.errCode);
						alert(data.errMsg);
					}
					else{
						console.log(data.joinURL);
						$('#enter-href', element).attr("href",data.joinURL);
					}
				} else {
					console.error(xhr.statusText);
				}
			}
		};
		xhr.onerror = function (e) {
			console.error(xhr.statusText);
			alert("onerror readyState " + xhr.readyState);
			alert("onerror status " + xhr.status);
		};
		xhr.send(null);*/
	});

	$(function ($) {
		$('#enter-img', element).attr("src", imageURL);
	});

}
