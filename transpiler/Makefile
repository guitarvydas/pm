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
	${prep} "." '$$' ${grammar} js-${format} --stop=1 --fmt=${here}/fmt.js --grammarname=${grammarname} --errorview <${src} >/tmp/js-comp
	${prep}  '❲' '❳' name.ohm js-name.fmt --inclusive --grammarname=name --errorview --fmt=${here}/name-fmt.js </tmp/js-comp

dev:
	${prep}  '❲' '❳' name.ohm js-name.fmt --split --inclusive --grammarname=name --fmt=${here}/name-fmt.js </tmp/js-comp

