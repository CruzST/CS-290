pragma solidity ^0.4.6;
    /*
    The above code specifies what compiler version will be used
    to compile billSplit.sol
    */

contract billTotal {
    // restSum stores the restaurant bill total
    uint public restSum;

    // Constructor only runs when contract is deployed to the blockchain
    function billTotal (uint init) {
        restSum = init;
    }

    // adds a meal to the total restSum
    function addMeal (uint meal) {
        restSum += meal;
    }

    // subtracts a meal from the total restSum
    function subMeal (uint meal) {
        restSum -= meal;
    }

    // multiplies a meal and returns the total
    function mulMeal (uint multi, uint meal) returns (uint) {
        uint total = multi*meal;
        return total;
    }

    // returns restSum
    function getRestSum() public returns (uint) {
        return restSum;
    }
}
