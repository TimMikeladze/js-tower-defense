// Javascript Syntax

// Creating a variable.
var variableOne;

// Creating a function in Javascript that takes in one parameter.
var functionOne = function(paramOne) {
    return paramOne;
}

// Creating an Object in Javascript using a constructor.
var objectOne = new Object();
objectOne.fieldOne = 1; // Creating fields in an object using the dot method.
objectOne.fieldTwo = "Two";
objectOne.fieldThree = [1, true, ["a", "b", "c"]]; // An array of different data types.

// Creating an Object through object literal notation.
var objectTwo = {
    fieldOne: 1, // Adding fields to an Object through properties.
    fieldTwo: "Two",
    fieldThree: objectOne // Nesting objects within objects.
}

// Creating a method within an Object.
ObjectTwo.methodOne = function(paramOne) {
    objectTwo.fieldOne = 2; // Accessing a global field in an object.
};
