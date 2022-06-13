grammar=comp.ohm
grammarname="comp"
prep=../prep/prep
format=comp.fmt
src=transpiler.tbx
here=`pwd`

all:
	${prep} "." '$$' ${grammar} ${format} --stop=1 --fmt=${here}/fmt.js --grammarname=${grammarname} --erroview --errorview <${src}
