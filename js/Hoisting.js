// const radius = [1,5,8,3,2];

// const area = function (radius){
//   return Math.PI * radius * radius;
// }
 
// const circum = function (radius){
//   return 2 * Math.PI * radius;
// }

// const diameter = function (radius){
//   return 2 * radius;
// }

// Array.prototype.calculate = function(logic){
//   const output = [];
//   for(let i=0; i<this.length; i++){
//     output.push(logic(this[i]));
//   }
//   return output;
// }

// console.log(radius.calculate(area))
// console.log(radius.map(circum))
// console.log(radius.map(diameter))
// console.log(radius.map(area))




// const persons = [
//   { name: 'john', age: 30 },
//   { name: 'abc', age: 30 },
//   { name: 'xyz', age: 30 },
//   { name: 'abc', age: 30 },
//   { name: 'john', age: 30 },
// ];


// function remove(obj, index){
//   return index === persons.findIndex(o => obj.name === o.name);
// }

// console.log(persons.filter(remove));

// const cookieText = "name=value; expires=2-july-2024 12:37:00 GMT; path=domainPath; domain=domainName; secure"
// document.cookie = cookieText;
// const str = document.cookie;
// console.log(str)



// const arr = [9, 10, 12, 15];

// console.log(
//   arr.reduce(function (max, curr){
//     if(curr > max){
//       max = curr;
//     }
//     return max;
//   }, arr[0])
// );