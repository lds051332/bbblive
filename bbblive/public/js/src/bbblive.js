/* Javascript for BBBLiveXBlock. */
function BBBLiveXBlock(runtime, element) {

    //function updateCount(result) {
    //    $('.count', element).text(result.count);
    //}
	//
    //var handlerUrl = runtime.handlerUrl(element, 'increment_count');
	//
    //$('p', element).click(function(eventObject) {
    //    $.ajax({
    //        type: "POST",
    //        url: handlerUrl,
    //        data: JSON.stringify({"hello": "world"}),
    //        success: updateCount
    //    });
    //});
	var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
	
	function responseSuccess() {
		runtime.notify('cancel', {});
		window.location.reload(false);
    }
	
	$('#save-button', element).click(function(eventObject){
		var reg = RegExp(/http/);
        var rUsername = $('#redlightUsername', element).val();
		var rPassword = $('#redlightPassword', element).val();
		var bURL = $('#bbbURL', element).val();
		var bPassword = $('#bbbPassword', element).val();
		var tURL = $('#thirdURL', element).val();
		if(bURL.length != 0 && !bURL.match(reg)){ //不包含http，手动加上https://
			bURL = "https://" + bURL;
		}
		if(tURL.length != 0 && !tURL.match(reg)){ //不包含http，手动加上https://
			tURL = "https://" + tURL;
		}
		newData = {
          liveName: $('#liveName', element).val(),
          redlightUsername: rUsername,
          redlightPassword: rPassword,
          bbbURL: bURL,
		  bbbPassword: bPassword,
          thirdURL: tURL,
		  description: $('#description', element).val()
		};
		//console.log(JSON.stringify(newData));
		$.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify(newData),
            success: responseSuccess
        });
	});
	
	$('#cancel-button', element).click(function(eventObject){
		runtime.notify('cancel', {});
	});
	
	//$(element).find('.save-button').bind('click', function() 
	//{
    //    var data = {
    //      liveName: $(element).find('input[name=liveName]').val(),
    //      bbbURL: $(element).find('input[name=bbbURL]').val(),
    //      thirdURL: $(element).find('input[name=thirdURL]').val()
	//	  description: $(element).find('input[name=description]').val(),
    //    };
    //    $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
    //      window.location.reload(false);
    //    });
    //});
	//
    //$(element).find('.cancel-button').bind('click', function() 
	//{
    //  //runtime.notify('cancel', {});
    //});
	
    $(function ($) {
		
    });

}
