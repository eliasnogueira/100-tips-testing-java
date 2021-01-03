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
            appendText(dataFiltered[i]);
        }

    }).fail(function () {
        console.log("Error to load the data from JSON file");
    });
}

// function appendText(number, tool, tip, link) {
function appendText(data) {
    var template = $("#template").html();
    var output = Mustache.render(template, data);

    $("#cardList").append(output);
}