$(document).ready(function(){
    UploadTextUpdate();
});

function UploadTextUpdate()
{
    $("#img-proj").change( function( e ) {
        console.log(e);
        $('div.input').html(this.value);

    } );
}

var myModule=(function(){
    var inputFileName="cover_image";
    var inputFileSelector="#img-proj";
    /**
     * функцмя, которая инициализирует объект
     */
    var init=function(){
        _setUpLisners()
    };

    /**
     * Устанавливаем обработчики событий
     * @private
     */
    var _setUpLisners=function(){
        //показывает окно добавления нового проекта на странице "Мои Работы"
        $("#showPopup").click(_showModal);

        //перехватываем событие отправки формы и заменяем на собственное действие
        $(".form-add-project").submit(_addProject);

        //при вводе данных в поля формы добавления нового проекта, проверяем значение
        //в случае ошибки - показываем тултип
        //если ошибки нет = прячем тултип
        $(".input").live("keyup", function(){

            //получаем контейнер с классом input-group
            //в которм находится инпут, вызвавший событие
            //closest - выберет ближайшего родителя, с соответствующим селектором
            var box = $(this).closest(".input-group");

            if($(this).val() !== "") {
                _hideErrors(box);
            } else {
                var errors;
                _showErrors(errors, box);
            }
        });

        //при закрытии окна добавления нового проекта,
        //- вызываем событие очистки формы
        //- убираем все тултипы
        $('.button-close').click(function(){
            $('.form-add-project').trigger('reset');
            var box = $('.error-box');
            _hideErrors(box);
        });

        $('.success ').click(function(event){
            if($(event.target).hasClass("button-close")){
                _closeSuccessAlert();
            }
        });
    };
    var _showModal= function (event) {
        event.preventDefault();
        var divPopUp=$(".popup-add");
           divPopUp.bPopup({
            speed: 400,
            transition: 'slideUp'

        });

    };

    var _hideErrors=function(obj){
        var box = obj || $(".input-group");
        box.removeClass('error-box');
    };

    var _showErrors=function(errors, box){
        if(box) {
            box.addClass("error-box");
        } else {
            for(var i = 0; i < errors.length; i++ ) {
                if(errors[i]===inputFileName){
                    $(".input-group").has(inputFileSelector).addClass("error-box");
                }else{
                    $(".input-group").has('[name="' + errors[i] + '"]').addClass("error-box");
                }
            }
        }
    };

    var _showErrorAlert = function() {
        $(".error-add").show("fast");
    }

    var _hideErrorAlert = function() {
        $(".error-add").hide();
    }

    var _showSuccessAlert = function() {
        $('.success').show('fast');
    }

    var _closeSuccessAlert = function() {
        $('.success').hide('fast');
    };

    var _parseForm = function() {
        var $inputImg = $(inputFileSelector);
        var fd = new FormData($('form[name="form-add-project"]')[0]);
        fd.append(inputFileName, $inputImg.prop('files')[0]);
       return fd;
    }

    var _addProject=function(event){
        event.preventDefault();

        var url="add_project.php";
        var formData = _parseForm();

        $.ajax({
            url:url,
            type:"POST",
            processData: false,
            contentType: false,
            dataType:"json",
            data:formData
        })
        .done(function(ans){
            _hideErrors();
            if(ans.errors.length>0){
                _showErrors(ans.errors);
                _showErrorAlert();
            } else {
                _showSuccessAlert();
                _hideErrorAlert();
            }
        })
        .fail(function(){
            console.log("error")

        });

    };
    return{
        init:init
    }

})();
myModule.init();