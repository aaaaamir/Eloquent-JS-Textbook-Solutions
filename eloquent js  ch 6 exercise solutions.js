// (Note -- These textbook solutions begin from chaptor 6)

// CHAPTER 6 SOLUTIONS
/* Ch6, Q1:
Write a class Vec that represents a vector in two-dimensional space. It takes x and y parameters (numbers), 
which it should save to properties of the same name.Give the Vec prototype two methods, plus and minus, 
that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ 
(this and the parameter) x and y values. Add a getter property length to the prototype that computes the length of 
the vector—that is, the distance of the point (x, y) from the origin (0, 0).
*/
class Vec {

  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  
  get length() {
    return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
  }
  
  plus (inputVec) {
    return new Vec(inputVec.x + this.x, inputVec.y + this.y);
  }
  
  minus(inputVec) {
    return this.plus(this.negate(inputVec));
  }
  
  negate(inputVec) {
    return new Vec(-inputVec.x, -inputVec.y)
  }
  
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5



/* Ch6, Q2
Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. 
Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), 
delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument
 -is a member of the group. Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.
Give the class a static from method that takes an iterable object as argument and creates a group that contains all the
 -values produced by iterating over it.
*/
// Notes after completion -- I could have used the indexOf and includes array methods to clean up the implementation
class Group {
  
  constructor () {
    this.elements = [];
  }
  
  static from (iterableObject) {
	let outputGroup = new Group();
  for (let element of iterableObject) 
    outputGroup.add(element);
  return outputGroup;
  }
  
  add (inputElement) {
  	if (!this.has(inputElement))
      this.elements.push(inputElement);
  }
  
  has (inputElement) {
    if (this.elements === [])
      return true;
    for (let element of this.elements) {
      if (inputElement === element)
        return true;
    }
    return false;
  }
  
  delete (inputElement) {
  	for (let arrayIndex = 0; arrayIndex < this.elements.length; arrayIndex++) {
      let currentElement = this.elements[arrayIndex];
      if (inputElement === currentElement) {
        this.elements.splice(arrayIndex);
        return; 
      }
    }
  }
  
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false



/* Ch6. Q3
Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.
If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.
It is okay if your iterator behaves strangely when the group is modified during iteration.
*/
// Extra idea -- To accommodate a Group with a variable length to protect from elements being deleted, this would have to be
// -modified to copy the initial array containing the Group elements and *then* grabbing elements from that copy.
Group[Symbol.iterator] = function () {
  return new GroupIterator(this);
}

class GroupIterator {

  constructor(inputGroup) {
  	this.GroupDS = inputGroup;
    this.iterationIndex = 0;
  }
  
  next () {
    let elementValue = this.GroupDS.elements[this.iterationIndex];
    this.iterationIndex++;
    if (elementValue == null)
      return {done: true, value: undefined};
    return {done: false, value: elementValue}
  }
  
}


for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c



/* Ch6. Q4
Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used as a more robust alternative to the in operator when you want to ignore the prototype’s properties. But what if your map needs to include the word "hasOwnProperty"? You won’t be able to call that method anymore because the object’s own property hides the method value.
Can you think of a way to call hasOwnProperty on an object that has its own property by that name?
*/

