function Automobile(year, make, model, type) {
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(x) {
        if (x == true) {
            console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
        } else {
            console.log(this.year + " " + this.make + " " + this.model);
        }
    }
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator
 and an array of objects appropriate for that comparator and it will return a new array
 which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
    var sortedArray = array;
    var length = sortedArray.length;
    for (var i = (length - 1); i >= 0; i--) {
        for (var j = (length - 1); j > 0; j--) {
            if (comparator(sortedArray[j], sortedArray[j - 1])) {
                var temp = sortedArray[j];
                sortedArray[j] = sortedArray[j - 1];
                sortedArray[j - 1] = temp;
            }
        }
    }

    return sortedArray;
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order
 of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2) {
    return auto1.year > auto2.year;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes
 which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2) {
    var make1 = auto1.make.toLowerCase();
    var make2 = auto2.make.toLowerCase();

    return make1 < make2;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least"
 is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case
 insensitive. If two cars are of equal type then the newest one by model year should be
 considered "greater".*/
function typeComparator(auto1, auto2) {
    var type1 = auto1.type.toLowerCase();
    var type2 = auto2.type.toLowerCase();
    var types = ["roadster", "pickup", "suv", "wagon"];
    
    if (type1 == type2) {
        return auto1.year > auto2.year;
    }

    var type1Rank = 4;
    var type2Rank = 4;

    for (var i = 0; i < types.length; i++) {
        if (type1 == types[i]) {
            type1Rank = i;
        }

        if (type2 == types[i]) {
            type2Rank = i;
        }
    }

    return type1Rank < type2Rank;
}

var printResults = function() {
    console.log("*****");
    console.log("The cars sorted by year are:");
    var sortedByYear = sortArr(yearComparator, automobiles);

    for (var i = 0; i < sortedByYear.length; i++) {
        sortedByYear[i].logMe(false);
    }

    console.log("\nThe cars sorted by make are:");
    var sortedByMake = sortArr(makeComparator, automobiles);

    for (var j = 0; j < sortedByMake.length; j++) {
        sortedByMake[j].logMe(false);
    }

    console.log("\nThe cars sorted by type are:");
    var sortedByType = sortArr(typeComparator, automobiles);

    for (var k = 0; k < sortedByType.length; k++) {
        sortedByType[k].logMe(true);
    }
    console.log("*****");

};

printResults();

/*Your program should output the following to the console.log, including the opening and closing
 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a
 separate call to console.log.

 Each line representing a car should be produced via a logMe function. This function should be added
 to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints
 "year make model type" with the year, make, model and type being the values appropriate for the automobile.
 If the argument is 'false' then the type is omitted and just the "year make model" is logged.

 *****
 The cars sorted by year are:
 (year make model of the 'greatest' car)
 (...)
 (year make model of the 'least' car)

 The cars sorted by make are:
 (year make model of the 'greatest' car)
 (...)
 (year make model of the 'least' car)

 The cars sorted by type are:
 (year make model type of the 'greatest' car)
 (...)
 (year make model type of the 'least' car)
 *****

 As an example of the content in the parenthesis:
 1990 Ford F-150 */
