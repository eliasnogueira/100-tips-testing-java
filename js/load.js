/**
 * Copyright Elias Nogueira. Licensed under MIT
 * See license text at https://opensource.org/licenses/MIT
 */

var toolToFilter = "ALLTIPS";

$(document).ready(function () {
    $("input:radio").click(function () {
        toolToFilter = $("input[type='radio'].form-check-input:checked").val().toUpperCase();
        filterContent(toolToFilter);
    });

    filterContent(toolToFilter);
});

function filterContent(tool) {
    $.getJSON("data/tips.json", function (data) {
        var dataFiltered = toolToFilter == "ALLTIPS" ? data : data.filter(tip => tip.tool == toolToFilter);
        var cardsToRemove = document.querySelectorAll(".cardItem");

        $(cardsToRemove).remove();

        for (i in dataFiltered) {
            appendText(dataFiltered[i].number, dataFiltered[i].tool, dataFiltered[i].tip, dataFiltered[i].link);
        }

    }).fail(function () {
        console.log("Error to load the data from JSON file");
    });
}

function appendText(number, tool, tip, link) {
    content = "<div class='col-sm d-flex mt-4 cardItem'>" +
        "<div class='card' style='width: 18rem;'>" +
        "<div class='card-body flex-fill'>" +
        "<h5 id='number' class='card-title'>Tip # " + number + "</h5>" +
        "<h6 id='tool' class='card-subtitle mb-2 text-muted'>" + tool.toUpperCase() + "</h6>" +
        "<p id='tip' class='card-text'>" + tip + "</p>" +
        "<a id='link' href='" + link + "' target='blank' class='card-link'>Reference</a>" +
        "</div>" +
        "</div>" +
        "</div>"

    $("#cardList").append(content);
}