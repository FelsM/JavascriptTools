const header = {
	title: 'Some title',
	size: 'x-large'
}

function buildHeader(config){
	return `${config.title} ${config.size}`
}

buildHeader(header);
console.log('hello world')
const someLongVariable = 'Hello world'
function logLongVariable(message){
	return message;
}

logLongVariable(someLongVariable);