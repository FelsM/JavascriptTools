const obj = {
	name: 'Jhon',
	sname: 'Doe'
}

function sayName({name} = {name:'Default'}){
	alert(name);
}

sayName(obj);



