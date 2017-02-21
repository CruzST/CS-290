function deepEqual(a, b)
{
    if (a === b)
    {
        return true;
    }

    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object")
    {
        return false;
    }

    var propsInA = 0, propsInB = 0;

    for (var prop in a)
    {
        propsInA += 1;
    }

    for (var prop in b)
    {
        propsInB += 1;
        if (!(prop in a) || !deepEqual(a[prop], b[prop]))
        {
            return false;
        }
    }

    return propsInA == propsInB;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

/**
 FULL DISCLOSURE: The above code is the solution given by the book's github. See link below.
 https://github.com/marijnh/Eloquent-JavaScript/blob/master/code/solutions/04_4_deep_comparison.js

 I understand the goal of this activity is to learn about objects and I have done just that. My initial
 idea and ideas after that were no where near the correct solution and were frankly a mess of noodles. My
 last idea was to create an array of all the keys of each object and use that array to drill down to the
 final values that corresponded to that key. That could have worked but I also noticed that the number
 of levels, how many keys were in a key, matched how many brackets. So then I had to figure out how to add
 brackets to the object for the number of levels down I had to go. For example, to get to "an", one would
 have to do the following: obj["here"]["is"]; There are two bracket sets and two levels. I was moving
 towards trying to find a way to drill down to the final value and it was a struggle.


 I have figured out and understand what is going on in the above code. Below is my explanation.

 Lines 3 thru 6 tests to see if the arguments a and b are precisely equal, meaning that there will be
 no automatic type conversion happening.

 Lines 8 thru 12 tests to see if the arguments a and b are not objects.

 Line 14 creates variables to count the number of properties that reside in objects a and b.

 Lines 16 thru 19 loops through the properties in a and counts them.

 In lines 21 thru 28 many things happen. First, a "for in loop" executes to count the number of
 properties in object b. While still in the "for in loop" for object b, lines 24 thru 27 tests to
 see if the same property that was in b is also in a. It also recursively calls deepEqual to test
 to see if the values corresponding to the property are equal for both object a and b.

 This line of code is the heart of the function:
 if (!(prop in a) || deepEqual(a[prop], b[prop]))
 {
     return false;
 }

 If prop is not in a then it will return a false but because of the !, it will evaluate to true and
 this will get to the return false.

 When deepEqual(a[prop], b[prop]) is called only two things can possibly be passed as parameters. One,
 a[prop] is a value or it is an object. The same goes for b[prop]. Due to this being a recursive call
 it runs through the whole function again. It will again test to see if the two arguments are matching
 values, are objects or need to again call deepEqual again.

 Line 30 returns true if a and b have the same number of properties and false if they don't.

 I like how the tests start out being simple and then get more complicated and specific. The first test
 is to see if a and b are both, for example, equal to 10. It will also test to see if they are both
 pointing to the same object or the same object all together. The next test is to see if they are both
 not objects. Since the test for a and b being equal to values or pointing to the sme object already
 occurred, then if either a or b are not an object then it fails the test. At this point a and b are
 both confirmed to be objects. Now the only test left is to do is to confirm each key and value are
 equal. This is accomplished by the recursive call to deepEqual.
 **/