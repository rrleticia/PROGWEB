var numeros = document.getElementById("txtNumeros").value;
numeros = numeros.split(",");
numeros = numeros.map((num) => parseInt(num));
numeros.sort();
