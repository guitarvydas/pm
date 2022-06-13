grammar=comp.ohm
grammarname="comp"
prep=../prep/prep
format=comp.fmt
src=transpiler.tbx
here=`pwd`

all: js

identity:
	${prep} "." '$$' ${grammar} identity-${format} --stop=1 --fmt=${here}/fmt.js --grammarname=${grammarname} --errorview <${src}

js:
	${prep} "." '$$' ${grammar} js-${format} --stop=1 --fmt=${here}/fmt.js --grammarname=${grammarname} --errorview <${src} >/tmp/js-comp1
	${prep}  '❲' '❳' name.ohm js-name.fmt --inclusive --grammarname=name --errorview --fmt=${here}/name-fmt.js </tmp/js-comp1 >/tmp/js-comp2
	${prep}   '⟪' '⟫'  verbatim.ohm verbatim.fmt --inclusive --grammarname=verbatim --errorview --fmt=${here}/name-fmt.js </tmp/js-comp2 >transpiler.js

dev1:
	${prep}  '❲' '❳' name.ohm js-name.fmt --split --inclusive --grammarname=name --fmt=${here}/name-fmt.js </tmp/js-comp

dev:
	${prep}   '⟪' '⟫'  verbatim.ohm verbatim.fmt --split --inclusive --grammarname=verbatim --errorview --fmt=${here}/name-fmt.js </tmp/js-comp2

