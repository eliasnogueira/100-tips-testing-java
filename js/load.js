/**
 * MIT License
 *
 * Copyright (c) 2021 Elias Nogueira
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
        var dataFiltered = toolToFilter === "ALLTIPS" ? data : data.filter(tip => tip.tool === toolToFilter);
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