function Transpiler () {
{
this.outputqueue = [];
this.src = undefined;
this.grammar_name = undefined;
this.grammar_text = undefined;
this.hook_name = undefined;
this.semantics_hooks = undefined;
this.handler = function (self, message) {

if (message.port === "src") {

this.src = message.data;
}
if (message.port === "grammar_name") {

this.grammar_name = message.data;
}
if (message.port === "grammar_text") {

this.grammar_text = message.data;
}
if (message.port === "hook_name") {

this.hook_name = message.data;
}
if (message.port === "semantics_hooks") {

this.semantics_hooks = message.data;
}
if (message.port === "go") {

let grammar = ohm.grammars[grammar_text,grammar_name];
let cst = grammars.match (src);
if (cst.succeeded ()){
let sem = grammar.createSemantics ();
sem.addOperation (hook_name, semantics_hooks) 
let result = sem (cst)[hook name];
this.outputqueue.push ({"transpiled_text", result});
}else{
this.outputqueue.push ({"error", grammars.trace (src)});
}
}
}}
}
