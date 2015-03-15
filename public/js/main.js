$(function() {

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }

    Parse.$ = jQuery;
    Parse.initialize("3VYFRciY4tMgYwEwVYq2veNGbqq7CjJvQUp85IAo", "d9JmmEd28tBUnAe1bXIM5KacnUaEmxtIVhnowxsw");

    Globals = {}
    UI = {}
    Globals.eventId = getUrlParameter('e');
    Globals.userId = getUrlParameter('u');

    UI.loading = $('.loading');
    UI.container = $('.container').hide();

    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    query.equalTo("fbId", Globals.eventId);
    query.find({
        success: function(results) {
            event = results[0];

            if (!event) return

            Globals.event = event;
            Globals.eventName = event.get('name');
            Globals.eventDesc = event.get('description');
            Globals.eventPayment = event.get('amountPer');


            UI.loading.hide();
            UI.container.show();

            UI.button = $('.btn')
            UI.field = $('#payment').val(Globals.eventPayment)
            UI.name = $('#event_name').text(Globals.eventName)
            UI.desc = $('#event_desc').text(Globals.eventDesc)

            UI.button.click(function() {
                UI.loading.show();
                UI.container.hide();
            });

        },
        error: function(error) {
            // do nothing.
        }
    });
});