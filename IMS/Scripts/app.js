$(function () {
    var ims=window.Ims = {};
    ims.alert = function (msg) {
        $("#modalAlert div.modal-body").html("<span>"+msg+"</span>");
        $('#modalAlert').modal('show');
    };

    ims.confirm = function (msg) {
        $("#modalConfirm div.modal-body .ims-message").html(msg);
        $("#modalConfirm").modal('show');
        var waitObj=ims.waitObj =$.Deferred();
        $("#modalConfirm button.cfm-yes").off('click');
        $("#modalConfirm button.cfm-yes").one('click', function () {
            waitObj.resolve();
        });
    };

    ims.inform = function (msg) {
        $("#modalInform div.modal-body").html("<span>" + msg + "</span>");
        $('#modalInform').modal('show');
    }

});