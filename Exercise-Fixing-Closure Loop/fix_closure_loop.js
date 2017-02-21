function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        (function(x) {
            var item = 'item' + list[x];
            result.push(function() {
                alert(item + ' ' + list[x])
            });

        })(i);
    }
    return result;
}

function testList() {
    var fnlist = buildList([1, 2, 3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();

// I spent a lot of spent time review the article below and the above code reflects it.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures