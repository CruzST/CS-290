
// the location of the "selected" cell
//var location = 0;

function buildTable(rows,columns) {

    // get reference for html body
    var body = document.body;

    // create table element
    var table = document.createElement("table");

    // create tbody element
    var tableBody = document.createElement("tbody");

    // create table header row
    var headerRow = document.createElement("tr");

    for (var j = 1; j <= columns; j++) {

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
    for (var k = 1; k < rows; k++) {

        // cell counter
        //var cellCounter = 0;

        // create a table row
        var row = document.createElement("tr");

        for (var l = 1; l <= columns; l++) {

            // create td element and text node
            // make text node the contents of td
            // put td at end of table row
            var cell = document.createElement("td");
            cell.setAttribute("align", "center");
            //cell.setAttribute("id", "cell "+cellCounter);
            var cellText = document.createTextNode(l + "," + k);
            cell.appendChild(cellText);
            row.appendChild(cell);

            //cellCounter++;
        }

        // add row to end of table body
        tableBody.appendChild(row);

        //cellCounter++;
    }

    // put tableBody in the table
    table.appendChild(tableBody);

    // append table to body
    body.appendChild(table);

    // set border attribute of table to 2;
    table.setAttribute("border", "2");

    // set location border to solid
    //document.getElementsByTagName("td")[location].style.border = "solid";
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


function createButtons() {

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
function move() {

    // create boundary arrays
    var leftBoundary = [0,4,8];
    var rightBoundary = [3,7,11];

    if (this.id == "Up") {

        //if (location)

    }

    if (this.id == "Down") {

    }

    if (this.id == "Right") {

    }

    if (this.id == "Left") {

    }
}
*/
//console.log(location);
//document.getElementById("Right").addEventListener("click", move);