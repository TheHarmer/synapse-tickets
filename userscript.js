// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*.synapsesupport.io/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant        none
// ==/UserScript==

if(document.URL === "https://synapsesupport.io/tickets/"){
    let button = `<a class="button" href="https://synapsesupport.io/ticketmanager/">Ticket Management</a><br>`
    $(button).appendTo('.buttons')
}
else if(document.URL === "https://synapsesupport.io/ticketmanager/"){
    document.body.innerHTML=''
    $(document).ready(function(){
        $.get('../tickets/',function(result){
            let a = $(result).find('h5').get(0)
            const name = a.innerHTML.slice(13,-1)
            document.getElementsByTagName("html")[0].innerHTML = `<head>
            <link rel="icon" href="../static/synapselogonew_transparent_w.ico" type="image/ico" sizes="16x16">
            <title>Synapse Support</title>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
            <link href="https://synapsesupport.io/static/darkly.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <style>

                hr {

                    width: 90%;
                    margin-left: auto;
                    margin-right: auto;
                    background-color: rgb(26, 26, 26);
                    border-radius: 4px;

                }

                hr.thick {

                    height: 5px;

                }

                hr.light {

                    height: 3px;

                }

                .S { display: inline; }


                input.T {

                    border-radius:7px

                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                ::-webkit-scrollbar {
                    width: 5px;
                    background: transparent;
                    z-index: 1;
                }


                html, body {
                    overflow: overlay;
                }


                /* Track */

                /* .body {overflow: overlay} */

                ::-webkit-scrollbar-track {
                    background: transparent;
                    z-index: 1;
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.575);
                    border-radius: 4px;
                    z-index: 1;
                }

                .content h5{
                    font-weight: 400
                }
            </style>
        </head>
        <body>
            <section class="section">
                <div class="container">
                    <img height="133" width="300" src="../static/Synapse_Fourm_Logo_white.png">
                    <div class="content">
                        <strong style=font-size:1.25rem;>Welcome back, ${name}!</strong>
                        <div class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <div class="buttons">
                                        <a class="button" href="../tickets/">Back</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5 class="title is-3" style="display: flex; justify-content: center;font-weight: 500;">Claimed Tickets</h5>
                        <hr class="thick">
                        <div class="columns is-mobile is-multiline" id="A" style="justify-content:center;font-weight: 500;">
                        </div>
                        <h5 class="title is-3" style="display: flex; justify-content: center;font-weight: 500;">Overdue Tickets</h5>
                        <hr class="thick">
                        <div class="columns is-mobile is-multiline" id="B" style="justify-content:center">
                        </div>
                        <h5 class="title is-3" style="display: flex; justify-content: center;font-weight: 500;">Leaderboard (coming soon)</h5>
                        <hr class="thick">
                        <div class="columns is-mobile is-multiline" id="C" style="justify-content:center">
                        </div>
                </div>
            </section>
        </body>`
        })
        GetTickets()
    })

    function GetTickets(){
        $.get('../tickets/',function(result){
            let tickets = $(result).find('div.column.is-one-third-desktop.is-half-tablet.is-fullwidth-mobile')
            for(let ticket of Array.from(tickets)){
                let box = $(ticket).find("div.box")
                if($(box).find("h5").get(4).children[0].innerHTML === "N/A") continue
                let ticketID = $(box).find("h5").get(0).innerHTML
                let ticketType = $(box).find("h5").get(1).children[0].innerHTML
                let ticketOpened = $(box).find("h5").get(2).children[0].innerHTML
                let ticketLastMessage = $(box).find("h5").get(3).children[0].innerHTML
                let ticketAgent = $(box).find("h5").get(4).children[0].innerHTML
                let ticketelement = `
                <div class="column is-one-third-desktop is-half-tablet is-fullwidth-mobile" id="${ticketID}" style="width:auto;flex:auto;flex-grow:.1;">
                    <div class="box" style="display: flex;flex-basis: auto;flex-direction: column;">
                        <h5 class="h5">${ticketID}</h5>
                        <h5 class="h5">Ticket Type: <strong>${ticketType}</strong></h5>
                        <h5 class="h5">Opened: <strong>${ticketOpened}</strong></h5>
                        <h5 class="h5">Last message: <strong>${ticketLastMessage}</strong></h5>
                        <h5 class="h5">Agent: <strong>${ticketAgent}</strong></h5><br>
                        <a class="button is-info" href="../agent/?id=${ticketID.slice(8,20)}" style="margin-bottom:7px">View</a>`
                $(ticketelement).appendTo('#A')
                var last_message = new Date(ticketLastMessage.slice(0,-2)).getTime()
                now = new Date().getTime() - ((300 - new Date().getTimezoneOffset()) * 60000)
                if((now - last_message) < 345600000) continue
                $(ticketelement).appendTo('#B')
            }
        })
    }
}
