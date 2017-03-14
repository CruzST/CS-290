document.addEventListener("DOMContentLoaded", loadTable);

function loadTable() {
    console.log('DOM loaded and table gotten')

    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/get-workouts",
        success: function (workouts) {
            console.log('Success!', workouts);
            drawRows(workouts);
        }
    })

}

 $(document).ready(function() {
      if (window.location.pathname == '/edit-row') {
        var id = Number(window.location.search.substring(4, window.location.search.length));
        console.log(typeof(id));
        $.ajax({
            type: 'GET',
            url: "http://localhost:3000/get-a-workout?id=" + id,
            success: function (data) {
                console.log('Success! The edit page should be up',data);
                var rowData = JSON.parse(data)[0];
                document.getElementById("name").value = rowData.name;
                document.getElementById("weight").value = rowData.weight;
                document.getElementById("lbs").value = rowData.lbs;
                document.getElementById("reps").value = rowData.reps;
                document.getElementById("date").value = rowData.date;
                document.getElementsByTagName("div").id = id;
            }
        })
    }
 })


function drawRows(workouts) {
    console.log('drawing rows with data:', workouts);
    var obj = JSON.parse(workouts.results);

    if (workouts != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr id=" + obj[i].id + "/>");
        $("#table").append(row);
        row.append($("<td>" + obj[i].name + "</td>"));
        row.append($("<td>" + obj[i].weight + "</td>"));
        row.append($("<td>" + obj[i].lbs + "</td>"));
        row.append($("<td>" + obj[i].reps + "</td>"));
        row.append($("<td>" + obj[i].date + "</td>"));
        row.append($('<td><input type="submit" value="Edit" onclick="edit(' + obj[i].id + ')"/>' +
        '<input type="submit" value="Delete" onclick="deleteRow(' + obj[i].id + ')"/></td>'));
        }
    }

}

function submit () {
    console.log('submit clicked')

    // parse values from form
    var name = $('#name').val();
    var weight = $('#weight').val();
    var weightUnit = $('#weightUnit').val();
    var reps = $('#reps').val();
    var date = $('#date').val();
    // create JavaScript object
    var data = { id: null, name: name, weight: weight, weightUnit: weightUnit, reps: reps, date: date };

    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/submit?name=" + name + "&weight=" + weight + "&weightUnit=" + weightUnit + "&reps=" + reps + "&date=" + date,
        success: function (id) {
            console.log('Success!', id);
            data.id = id;
            drawRow(data);
        }
    })
}

function drawRow(rowData) {
    console.log('drawing row with data:', rowData);
    var row = $("<tr id=" + rowData.id + "/>");
    $("#table").append(row);
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td>" + rowData.weight + "</td>"));
    row.append($("<td>" + rowData.weightUnit + "</td>"));
    row.append($("<td>" + rowData.reps + "</td>"));
    row.append($("<td>" + rowData.date + "</td>"));
    row.append($('<td><input type="submit" value="Edit" onclick="edit(' + rowData.id + ')"/>' +
        '<input type="submit" value="Delete" onclick="deleteRow(' + rowData.id + ')"/></td>'));
}

function save() {
    console.log('save clicked and will save updated form');

    // parse values from form
    var name = $('#name').val();
    var weight = $('#weight').val();
    var lbs = $('#lbs').val();
    var reps = $('#reps').val();
    var date = $('#date').val();
    var id = document.getElementsByTagName('div').id;
    console.log(id);

    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/edit-save?id=" + id + "&name=" + name + "&weight=" + weight + "&lbs=" + lbs + "&reps=" + reps + "&date=" + date,
        success: function () {
            console.log('Success! The edits should be saved and the home page should render!');
            window.location = "http://localhost:3000/";
        }
    });

    //     $.ajax({
    //     type: 'GET',
    //     url: "http://localhost:3000/hello",
    //     success: function () {
    //         console.log('back from hello');
    //     }
    // });
}

function edit(id) {

    console.log('edit clicked and will edit tr with id=', id);
    //window.location = "http://localhost:3000/workout/" + rowData.id + "?name=" + rowData.name + "&weight=" + rowData.weight + "&lbs=" + rowData.weightUnit + "&reps=" + rowData.reps + "&date=" + rowData.date;
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/get-a-workout?id=" + id,
        success: function (data) {
            console.log('Success! The edit page should be up',data);
            var rowData = JSON.parse(data)[0];            
            window.location = "http://localhost:3000/edit-row?id=" + rowData.id;
            
        }
    })
}

function deleteRow(id) {
    console.log('delete clicked and will delete tr with id=', id);

    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/delete?id=" + id,
        success: function () {
            console.log('Success! row of id=' + id + "was deleted");
            $("#" + id).remove();
        }
    });

}