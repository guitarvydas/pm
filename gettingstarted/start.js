// usage:
// npm install ohm-js
// node start.js


const fs = require ('fs')
const ohm = require ('ohm-js')
const grammar = ohm.grammar(String.raw`
baseline {
  main = "a"
}
`);
const input = 'a';

const result = grammar.match(input)

if (result.succeeded()) {
    console.log("Matching Succeeded")
} else {
    console.log("Matching Failed")
}
