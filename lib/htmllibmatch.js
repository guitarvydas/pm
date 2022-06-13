function ohmMatch (src, grammarname, grammarsrc) {
    // use Ohm-JS to match src with grammarsrc (both strings)
    // "grammarname" is a string name of the grammar to be used
    // return an array, containing
    // [0] the matchObject created by Ohm, and,
    // [1] a semantics object if the parse succeeded, else a trace object
    const grammar = ohm.grammars(grammarsrc)[grammarname];
    var matchObject = grammar.match (src);
    if (matchObject.succeeded ()) {
	return [matchObject, grammar.createSemantics ()];
    } else {
	return [matchObject, grammar.trace (src)];
    }
}

    
