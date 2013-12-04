if (window.location.hash) {
    var hash = window.location.hash.replace('#', '');
    $('#dashboardID').val(hash);
}

$('#sendBackground').submit(function(event){
    event.preventDefault();
    
    var type = $('#choice').val();
    var dashboardID = $('#dashboardID').val();
    
    if (type == 'background') {
        var background = $('#backgroundImg');
        
        if (background[0].files) {
            var FR = new FileReader();
            var backgroundBase64 = FR.readAsDataURL( background[0].files[0] );

            FR.onload = function (event) {
                var params = {};
                params[dashboardID] = 'url('+ event.target.result +')';

                chrome.storage.local.set(params);
                alert('Bien ajouté le fond');
                addList(dashboardID, event.target.result, 'image');
            }
        }
    } else {
        var background = $('#backgroundColor').val(); 
        var params = {};
        params[dashboardID] = background;
        
        chrome.storage.local.set(params);
        alert('Bien ajoutée la couleur');
        addList(dashboardID, background, 'color');
    }
    
});

$('#deleteBackground').submit(function(event){
    event.preventDefault();
    
    var dashboardID = $('#deleteID').val();
    
    chrome.storage.local.remove(dashboardID);
    alert('Le fond d\'écran a bien été supprimé');
    $('#'+ dashboardID).remove();
});

$('#clear').click(function(){
    chrome.storage.local.clear();
    alert('Tous les fonds d\'écrans ont bien été supprimés');
    $('#list').html('');
});

function addList(bg, bgImg, type) {
    if (type == 'image') {
        $('#list').append('<tr id="'+ bg +'">'+
        '<td>'+ bg +'</td>'+
        '<td><center><img src="'+ bgImg +'" width=100 height=100></center></td>'+
        '</tr>');
    } else {
        $('#list').append('<tr id="'+ bg +'">'+
        '<td>'+ bg +'</td>'+
        '<td><center><div style="background:'+ bgImg +';width:100px;height:100px;"></div></center></td>'+
        '</tr>');
    }
}

chrome.storage.local.get(function(result){
    for (var bg in result) {
        var bgImg = ''+ result[bg];
        var type = 'image';
        bgImg = bgImg.replace('url(', '');
        bgImg = bgImg.replace(')', '');
        
        if (bgImg.length < 8) {
            type = 'color';
        }
        
        addList(bg, bgImg, type);
    }
});

$('#choice').change(function() {
   var value = $(this).val();
   
   if (value == 'background') {
       $('#backgroundColor').fadeOut(400, 'swing', function () {
           $('#backgroundImg2').fadeIn();
       });
   } else {
       $('#backgroundImg2').fadeOut(400, 'swing', function () {
           $('#backgroundColor').fadeIn();
       });
   }
});