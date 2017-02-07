(function() { // Begin scoping function
    var place = 0; // Global to your code, invisible outside the scoping function

function buildTable(rows,columns){

    // get reference for html body
    var body = document.body;

    // create table element
    var table = document.createElement("table");

    // create tbody element
    var tableBody = document.createElement("tbody");

    // create table header row
    var headerRow = document.createElement("tr");

    for (var j = 1; j <= columns; j++){

        // create th element and text node
        // make text node the contents of th
        // put th at end of table row
        var headerCell = document.createElement("th");
        headerCell.setAttribute("align", "center");
        var headerText = document.createTextNode("Header "+j);
        headerCell.appendChild(headerText);
        headerRow.appendChild(headerCell);
    }

    // add header row to end of table body
    tableBody.appendChild(headerRow);

    // create data cells
    for (var k = 1; k < rows; k++){

        // create a table row
        var row = document.createElement("tr");

        for (var l = 1; l <= columns; l++){

            // create td element and text node
            // make text node the contents of td
            // put td at end of table row
            var cell = document.createElement("td");
            cell.setAttribute("align", "center");

            var cellText = document.createTextNode(l + "," + k);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add row to end of table body
        tableBody.appendChild(row);
    }

    // put tableBody in the table
    table.appendChild(tableBody);

    // append table to body
    body.appendChild(table);

    // set border attribute of table to 2;
    table.setAttribute("border", "2");

    // set top left cell to "selected" with solid border
    document.getElementsByTagName("td")[0].style.border = "solid";

    // set id of selected td
    document.getElementsByTagName("td")[0].setAttribute("id", "selected");
}
buildTable(4,4);


// Full disclosure: I researched how to build the table by reviewing the following materials:
//                  1) lecture content and lecture videos
//                  2) text book chapters 13 and 14
//                  3) Mozilla Dev website https://developer.mozilla.org

// The link below was very helpful and my code closely reflects theirs.
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces

// I attempted to build the array from memory and from the simple examples in the lectures but was
// going the wrong path and it wouldn't work. I was trying to append the new row to the body
// each time. It was not good. I found the above link and it all made sense and I was able to step
// through the code and understand what was happening.


function createButtons(){

    // create array of directions
    var directions = ["Up", "Down", "Left", "Right", "Mark Cell"];

    // create each button
    for (var i = 0; i < directions.length; i++){

        var button = document.createElement("button");
        var text = document.createTextNode(directions[i]);
        button.appendChild(text);
        button.setAttribute("id", directions[i]);

        // append each button to the html body
        document.body.appendChild(button);
    }
}
createButtons();

/*
var location = function(){
    var tableCellText = ["1,1", "2,1", "3,1", "4,1",
        "1,2", "2,2", "3,2", "4,2",
        "1,3", "2,3", "3,3", "4,3"];

    var selectedCell = document.getElementById("selected").textContent;

    var position;

    for (var i = 0; i < tableCellText.length; i++){
        if (selectedCell == tableCellText[i]){
            position = i;
        }
    }

    return position;
};
*/

function move(){

    // create boundary arrays
    var leftBoundary = [0,4,8];
    var rightBoundary = [3,7,11];

    // bool variable
    var onBoundary;

    if (this.id == "Up") {

        if (place - 4 >= 0){
            // remove border
            document.getElementsByTagName("td")[place].style.border = "thin solid";

            // set new location
            place = place - 4;

            // add border
            document.getElementsByTagName("td")[place].style.border = "solid";
        }
    }
    else if (this.id == "Down"){

        if (place + 4 <= 11){
            // remove border
            document.getElementsByTagName("td")[place].style.border = "thin solid";

            // set new location
            place = place + 4;

            // add border
            document.getElementsByTagName("td")[place].style.border = "solid";
        }

    }
    else if (this.id == "Right"){

        for (var i = 0; i < rightBoundary.length; i++){

            if (place == rightBoundary[i]){
                onBoundary = 1
                i = leftBoundary.length;
            } else {
                onBoundary = 0;
            }
        }

        if (!onBoundary){

            // remove border
            document.getElementsByTagName("td")[place].style.border = "thin solid";

            // set new location
            place++;

            // add border
            document.getElementsByTagName("td")[place].style.border = "solid";
        }
    }
    else if (this.id == "Left"){

        for (var j = 0; j < leftBoundary.length; j++){

            if (place == leftBoundary[j]){
                onBoundary = 1
                j = leftBoundary.length;
            } else {
                onBoundary = 0;
            }
        }

        if (!onBoundary){

            // remove border
            document.getElementsByTagName("td")[place].style.border = "thin solid";

            // set new location
            place--;

            // add border
            document.getElementsByTagName("td")[place].style.border = "solid";
        }
    }
}


function markCell(){
    document.getElementsByTagName("td")[place].style.background = "yellow";
}

document.getElementById("Up").addEventListener("click", move);
document.getElementById("Down").addEventListener("click", move);
document.getElementById("Right").addEventListener("click", move);
document.getElementById("Left").addEventListener("click", move);
document.getElementById("Mark Cell").addEventListener("click", markCell);

})();