$(document).ready(function(){
    PopUpHide();
    UploadTextUpdate();
});
function PopUpShow(){
    $(".popup-add").show();
}
function PopUpHide(){
    $(".popup-add").hide();
}
function UploadTextUpdate()
{
    $("#img-proj").change( function( e ) {
        console.log(e);
        $('div.input').html(this.value);
    } );
}