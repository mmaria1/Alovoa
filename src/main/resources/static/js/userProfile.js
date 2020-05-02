var locationFound = false;

function likeUser(idEnc) {
	$.ajax({
		type : "POST",
		url : "/user/like/" + idEnc,
		headers : {
			"X-CSRF-TOKEN" : $("input[name='_csrf']").val()
		},
		success : function() {
			location.reload();
		},
		error : function(e) {
			console.log(e);
			alert(getGenericErrorText());
		}
	});

}

function hideUser(idEnc) {
	$.ajax({
		type : "POST",
		url : "/user/hide/" + idEnc,
		headers : {
			"X-CSRF-TOKEN" : $("input[name='_csrf']").val()
		},
		success : function() {
			location.reload();
		},
		error : function(e) {
			console.log(e);
			alert(getGenericErrorText());
		}
	});
}

function blockUser(idEnc) {

	var r = confirm(getText("userprofile.js.block-user"));
	if (r == true) {

		$.ajax({
			type : "POST",
			url : "/user/block/" + idEnc,
			headers : {
				"X-CSRF-TOKEN" : $("input[name='_csrf']").val()
			},
			success : function() {
				location.reload();
			},
			error : function(e) {
				console.log(e);
				alert(getGenericErrorText());
			}
		});
	}
}

function unblockUser(idEnc) {

	var r = confirm(getText("userprofile.js.block-user"));
	if (r == true) {
		$.ajax({
			type : "POST",
			url : "/user/unblock/" + idEnc,
			headers : {
				"X-CSRF-TOKEN" : $("input[name='_csrf']").val()
			},
			success : function() {
				location.reload();
			},
			error : function(e) {
				console.log(e);
				alert(getGenericErrorText());
			}
		});
	}
}

function reportUser() {
	openModal("report-user-modal");
}

function reportUserSubmit() {
	$.ajax({
		type : "POST",
		url : "/user/report/" +  $("#id-enc").val() + "/" + $("#captcha-id").val() + "/" + $("#captcha").val() ,
		headers : {
			"X-CSRF-TOKEN" : $("input[name='_csrf']").val()
		},
		success : function() {
			alert(getText("userprofile.js.success.report-user"));
			location.reload();
		},
		error : function(e) {
			refreshCaptcha();
			alert(getGenericErrorText());
		}
	});
}