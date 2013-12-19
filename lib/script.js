function Verif(bg) {
    //console.log(bg);
    
    if (bg.length > 7) {
        if ($('.board-canvas').css('background') != bg) {  
            $('.board-canvas').css({
                'background': bg,
                'background-align': 'center',
                'background-size': 'cover'
            });
            
            //console.log('Changement de fond pour '+ bg);
        }
    } else {
        if ($('body').css('background') != bg) {
            $('body').css({
               'background': bg,
               'background-align': 'center',
               'background-size': 'cover'
            });
            
            $('.board-canvas').css({
                'background': bg,
                'background-align': 'center',
                'background-size': 'cover'
            });
           
           //console.log('Changement de fond pour '+ bg);
        }
    }
}


$(document).ready(function(){
    var urlString = ''+ location;
    var dashboardId = urlString.split(/\//)[4];
    var background = '#eee';
    
    if (!dashboardId) {
        dashboardId = 'default';
    }
    
    
    //$('.header-logo').html('<span><center>ADDWEB</center></span>');
    $('#header').append('<a class="header-btn" target="_blank" href="chrome-extension://'+ chrome.runtime.id +'/view/background.html#'+ dashboardId +'"><span>&nbsp;&nbsp;Ajouter un background&nbsp;&nbsp;</span></a>');
    
    
    /////////////////////////////
    // STOCKAGE DE NOUVELLE CLES
    /////////////////////////////
    //var params = {};
    //params[dashboardId] = 'url(http://chichajasmin.net/wp-content/uploads/2013/05/elegant-grey-illumination-background-presentations-powerpoint-backgrounds1.jpg)';
    //chrome.storage.local.set(params);
    
    
    chrome.storage.local.get(dashboardId, function(result){
        background = result[dashboardId];
        Verif(background);
    });
    
    setInterval(Verif(background), 1000);
});