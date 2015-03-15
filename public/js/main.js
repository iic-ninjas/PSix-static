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
    Globals.eventId = getUrlParameter('e');
    Globals.userId = getUrlParameter('u');

    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    query.equalTo("fbId", Globals.eventId);
    query.find({
        success: function(results) {
            event = results[0]
            Globals.event = event
            Globals.eventName = event.get('name')
            Globals.eventDesc = event.get('description')
            Globals.eventPayment = event.get('amountPer')
        },
        error: function(error) {
            // do nothing.
        }
    });
});