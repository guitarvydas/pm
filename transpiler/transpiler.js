function Transpiler () {
    this.getOutputMap = function () {
        let map = {};
        this.outputqueue.forEach (output => {
            map [output.port] = output.data;
        });
        return map;
    }

    this.outputqueue = [];
    this.src = undefined;
    this.grammar_name = undefined;
    this.grammar_text = undefined;
    this.hook_name = undefined;
    this.semantics_hooks = undefined;
    this.handler = function (message) {
        message.port = message.port.replace (/ /g, '_');

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
            let gs = ohm.grammars (this.grammar_text);
            let g = gs[this.grammar_name];
            let cst = g.match (this.src);
            if (cst.succeeded ()){
                let sem = g.createSemantics ();
                sem.addOperation (this.hook_name, this.semantics_hooks);
                let result = sem (cst)[this.hook_name] ();
                this.outputqueue.push ({port: "success", data: true});
                this.outputqueue.push ({port: "transpiled_text", data: result});
            }else{
                this.outputqueue.push ({port: "success", data: false});
                this.outputqueue.push ({port: "error", data: g.trace (src)});
            }
        }
    }
}


