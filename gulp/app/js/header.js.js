const header = {
	title: 'Some title',
	size: 'x-large'
}

function buildHeader(config){
	return `${config.title} ${config.size}`
}

buildHeader(header);