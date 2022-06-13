const fmtGrammar = String.raw`
formatSCN {
  semantics = ws* semanticsStatement+
  semanticsStatement = ruleName ws* "[" ws* parameters "]" ws* "=" ws* code? rewrites ws*

  ruleName = letter1 letterRest*
  
  parameters = parameter*
  parameter = treeparameter | flatparameter
  flatparameter = fpws | fpd
  fpws = pname ws+
  fpd = pname delimiter
  treeparameter = "@" tflatparameter
  tflatparameter = tfpws | tfpd
  tfpws = pname ws+
  tfpd = pname delimiter

  pname = letterRest letterRest*
  rewrites = rw1 | rw2
  rw1 = "[[" ws* code? rwstringWithNewlines "]]" ws*
  rw2 = rwstring

  letter1 = "_" | "a" .. "z" | "A" .. "Z"
  letterRest = "0" .. "9" | letter1

  comment = "%%" notEol* eol
  notEol = ~eol any
  
  eol = "\n"
  ws = comment | eol | " " | "\t" | "," 
  delimiter = &"]" | &"="

  rwstring = stringchar*
  stringchar = ~"\n" any

  rwstringWithNewlines = nlstringchar*
   nlstringchar = ~"]]" ~"}}" any
  code = "{{" ws* codeString "}}" ws* 
  codeString = rwstringWithNewlines

}
`;


var fmt_hooks = {	
    semantics: function (_1s, _2s) { 
	var __1s = _1s.fmt ().join (''); 
	var __2s = _2s.fmt ().join (''); 
	return `
{
${__2s}
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.fmt ()); }
}`; 
    },
    semanticsStatement: function (_1, _2s, _3, _4s, _5, _6, _7s, _8, _9s, _10s, _11, _12s) {
	varNameStack = [];
	var __1 = _1.fmt ();
	var __2s = _2s.fmt ().join ('');
	var __3 = _3.fmt ();
	var __4s = _4s.fmt ().join ('');
	var __5 = _5.fmt ();
	var __6 = _6.fmt ();
	var __7s = _7s.fmt ().join ('');
	var __8 = _8.fmt ();
	var __9s = _9s.fmt ().join ('');
	var __10s = _10s.fmt ().join ('');
	var __11 = _11.fmt ();
	var __12s = _12s.fmt ().join ('');
	return `
${__1} : function (${__5}) { 
_ruleEnter ("${__1}");
${__10s}
${varNameStack.join ('\n')}
var _result = \`${__11}\`; 
_ruleExit ("${__1}");
return _result; 
},
            `;
    },
    ruleName: function (_1, _2s) { var __1 = _1.fmt (); var __2s = _2s.fmt ().join (''); return __1 + __2s; },
    parameters: function (_1s) {  var __1s = _1s.fmt ().join (','); return __1s; },
    
    parameter: function (_1) { 
	var __1 = _1.fmt ();
	return `${__1}`;
    },
    flatparameter: function (_1) { 
	var __1 = _1.fmt (); 
	varNameStack.push (`var ${__1} = _${__1}.fmt ();`);
	return `_${__1}`;
    },
    fpws: function (_1, _2s) { var __1 = _1.fmt (); var __2s = _2s.fmt ().join (''); return __1; },
    fpd: function (_1, _2) { var __1 = _1.fmt (); var __2 = _2.fmt (); return __1; },
    
    treeparameter: function (_1, _2) { 
	var __1 = _1.fmt (); 
	var __2 = _2.fmt (); 
	varNameStack.push (`var ${__2} = _${__2}.fmt ().join ('');`);
	return `_${__2}`; 
    },
    tflatparameter: function (_1) { 
	var __1 = _1.fmt (); 
	return `${__1}`;
    },
    tfpws: function (_1, _2s) { var __1 = _1.fmt (); var __2s = _2s.fmt ().join (''); return __1; },
    tfpd: function (_1, _2) { var __1 = _1.fmt (); var __2 = _2.fmt (); return __1; },

    pname: function (_1, _2s) { var __1 = _1.fmt (); var __2s = _2s.fmt ().join (''); return __1 + __2s;},
    rewrites: function (_1) { var __1 = _1.fmt (); return __1; },
    rw1: function (_1, _2s, codeQ, _3, _4, _5s) {
	var __2 = _2s.fmt ().join ('');
	var code = codeQ.fmt ();
	var __3 = _3.fmt ();
	if (0 === code.length) {
  	    return `${__2}${__3}`;
	} else {
	    process.stderr.write ('code is NOT empty\n');
	    throw "code in rw1 NIY";
  	    return `${code}${__3}`;
	}
    },
    rw2: function (_1) { var __1 = _1.fmt (); return __1; },
    letter1: function (_1) { var __1 = _1.fmt (); return __1; },
    letterRest: function (_1) { var __1 = _1.fmt (); return __1; },

    ws: function (_1) { var __1 = _1.fmt (); return __1; },
    delimiter: function (_1) { return ""; },

    rwstring: function (_1s) { var __1s = _1s.fmt ().join (''); return __1s; },
    stringchar: function (_1) { var __1 = _1.fmt (); return __1; },
    rwstringWithNewlines: function (_1s) { var __1s = _1s.fmt ().join (''); return __1s; },
    nlstringchar: function (_1) { var __1 = _1.fmt (); return __1; },

    code: function (_1, _2s, _3, _4, _5s) { return _3.fmt (); },
    codeString: function (_1) { return _1.fmt (); },

    // Ohm v16 requires ...children, previous versions require no ...
    _iter: function (...children) { return children.map(c => c.fmt ()); },
    _terminal: function () { return this.sourceString; }
};

function fmt (sem, rewriteRulesObject) {
    sem.addOperation ('fmt ()', rewriteRulesObject);
	let treeWalker = sem (matchObject);
	let transpiled = treeWalker.fmt ();
	return [true, transpiled];
    } else {
	var err = sem;
	return [false, err];
    }
}
