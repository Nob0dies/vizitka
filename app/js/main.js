var myModule = (function () {
    var init = function () {
        _setUpLisners()
    };
    var _setUpLisners = function () {

        $(".feedback").submit(_addFeedback);
        $(".input").live("keyup", function () {
            if ($(this).val() !== "") {
                $(this).closest(".input-group").removeClass("error-box");
            } else {
                $(this).closest(".input-group").addClass("error-box");
            }
        });
        $(".reset").click(_hideErrors);




    };



    var _hideErrors = function () {
        $(".input-group").removeClass('error-box');
    };
    var _showErrors = function (errors) {
        for (var i = 0; i < errors.length; i++) {
            $(".input-group").has('[name="' + errors[i] + '"]').addClass("error-box");

        }
    };

//показывать и скрывать меню
    $(function() {
        $('.menu_button').toggle(function(){
        $(this).siblings(".vkladki.vkladki_pad").show();
        $(this).addClass('red');
    }, function(){
        $('.menu_button').siblings(".vkladki.vkladki_pad").hide();
        $(this).removeClass('red');
    });
});


    var _addFeedback = function (event) {
        event.preventDefault();

        var form = $(this),
            data = form.serialize(),
            url = "feedback.php";
        console.log(data);

        $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: data
            })
            .done(function (ans) {
                console.log(ans);
                _hideErrors();
                if (ans.errors.length > 0) {
                    _showErrors(ans.errors);
                }
            })
            .fail(function () {
                console.log("error")

            });

    };
    return {
        init: init
    }

})();
myModule.init();