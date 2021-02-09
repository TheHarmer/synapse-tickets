// ==UserScript==
// @name         Synapse Ticket Manager
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Harmer
// @match        https://synapsesupport.io/tickets/
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

function logs() {
    var tickets = document.getElementsByClassName("box")
    var now = new Date().getTime()

    for(let ticket of tickets) {
        try{
            if(ticket.children[4].lastElementChild.innerHTML === "N/A") continue

            var time = ticket.children[3].lastElementChild.innerHTML

            if(time.endsWith("ET")) {
                var last_message = new Date(time.slice(0,-2)).getTime()
                now = now - ((300 - new Date().getTimezoneOffset()) * 60000)
            }
            else {
                var last_message = new Date(time).getTime()
            }

            if((now - last_message) < 259200000) continue
            console.log(ticket.children[0].firstElementChild.innerHTML)
        }
        catch{
            continue
        }
    }
}
if(!unsafeWindow.logs)
{
    unsafeWindow.logs = logs;
}
})();