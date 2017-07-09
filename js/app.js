var TODOLIST = (function () {

	var tareas = [
		{ 
			id: 9,
			titulo: "Crear pagina web",
			imagen: "run",
			descripcion: "Crear el html base",
			completado: true
		},
		{ 
			id: 108,
			titulo: "Modificarlo con css",
			imagen: "money",
			descripcion: "Crear el css para estilizar el html",
			completado: false
		},
		{ 
			id: 42,
			titulo: "Crear acciones",
			imagen: "plate",
			descripcion: "Con javascript crear acciones",
			completado: false
		},
		{ 
			id: 37,
			titulo: "Preparar backend",
			imagen: "code",
			descripcion: "Tener listo el backend para el proyecto",
			completado: true
		}
	]

	function eliminar () {
		var deletes = document.getElementsByClassName("botonEliminar");
		for (var i = 0; i < deletes.length; i++) {
			deletes[i].onclick = function (event) {
				var seguro = confirm("Esta seguro que quiere borrar la tarea?");
				if (seguro) {
					var table = this.parentNode.parentNode.parentNode.parentNode;
					for (var i = 0; i < tareas.length; i++) {
						if (tareas[i].id == table.id) {
							tareas.splice(i, 1);
						}
					}
					table.parentNode.removeChild(table)	
				}
			}
		}
	}

	function completar () {
		var done = document.getElementsByClassName("botonRealizado");
		for (var i = 0; i < done.length; i++) {
			done[i].onclick = function (event) {
				var table = this.parentNode.parentNode.parentNode.parentNode;
				for (var i = 0; i < tareas.length; i++) {
					if (tareas[i].id == table.id) {
						tareas[i].completado = true;
						limpiarLista();
						render();
					}
				}
			}
		}
	}

	function limpiarLista () {
		var lisa = document.querySelectorAll(".card");
		for (var i = 0; i < lisa.length; i++) {
			var lisapar = lisa[i].parentNode;
			lisapar.removeChild(lisa[i]);
		}
	}

	
	function render () {
		for (var i = 0; i < tareas.length; i++) {
			renderizarTareas(tareas[i]);
		}
	};


	function crearTarea (titulo, descripcion, imagen) {
		var id = Math.floor(Math.random() * (200 - 1) +1);
		/*var encontrado = 1;
		var contador;
		while (encontrado == 0) {
		 	for (var i = 0; i < tareas.length; i++) {
		 		if (tareas[i].id == id) {
		 			contador = 1;
		 		}
		 	}
		 	if (contador = 1) {
		 		var id = Math.floor(Math.random() * (200 - 1) +1);
		 		contador = 0;
		 	} else {
		 		encontrado = 1;
		 	}
		} */
		var nuevaTarea = {
			id: id,
			titulo: titulo,
			descripcion: descripcion,
			imagen: imagen,
			completado: false
		}
		renderizarTareas(nuevaTarea);
		tareas.push(nuevaTarea);
	};

	function renderizarTareas (original) {
		var contenedor = document.getElementById("lista-de-tareas");
		var icono = document.createElement("i");
		var boton = document.createElement("button")
		var icono2 = document.createElement("i");
		var boton2 = document.createElement("button")
		var iconosub = document.createElement("i");
		var botonsub = document.createElement("button")
		var icono2sub = document.createElement("i");
		var boton2sub = document.createElement("button")
		var columna1 = document.createElement("div");
		var columnasub = document.createElement("div");
		columna1.className = "col-md-1 col-sm-1 col-xs-1 col-1 botones";
		if (original.completado == false) {
			icono.className = "ion-checkmark-round px-1";
			iconosub.className = "ion-checkmark-round px-1";
			boton.className = "btn btn-outline-success btn-sm my-1 botonRealizado";
			botonsub.className = "btn btn-outline-success btn-sm my-1 mx-2 botonRealizado";
			boton.appendChild(icono);
			botonsub.appendChild(iconosub);	
			columna1.appendChild(boton);
			columnasub.appendChild(botonsub);
		}
		icono2.className = "ion-trash-b px-1";
		boton2.className = "btn btn-outline-danger btn-sm my-1 botonEliminar";
		boton2.appendChild(icono2);
		icono2sub.className = "ion-trash-b px-1";
		boton2sub.className = "btn btn-outline-danger btn-sm my-1 mx-2 botonEliminar";
		boton2sub.appendChild(icono2sub);
		columna1.appendChild(boton2);
		var columna2 = document.createElement("div");
		var titulo = document.createElement("h3");
		var descripcion = document.createElement("p");
		titulo.innerHTML = original.titulo;
		titulo.className = "card-title";
		descripcion.innerHTML = original.descripcion;
		descripcion.className = "card-text";
		columna2.className = "col-md-9 col-sm-9 col-xs-8 col-8 pl-4";
		columna2.appendChild(titulo);
		columna2.appendChild(descripcion);
		var badge = document.createElement("span");
		if (original.completado == true) {
			badge.innerHTML = "Realizado";
			badge.className = "badge badge-pill badge-default";	
		} else {
			badge.innerHTML = "No realizado";
			badge.className = "badge badge-pill badge-danger";
		}
		var completo = document.createElement("h6");
		completo.appendChild(badge)
		columna2.appendChild(completo);
		var columna3 = document.createElement("div");
		var imagen = document.createElement("img");
		columna3.className = "col-md-2 col-sm-2 col-xs-3 col-3 d-flex align-items-center";
		imagen.src = "img/" + original.imagen + ".png";
		imagen.className = "img-fluid";
		imagen.width = 80;
		imagen.height = 80;
		columna3.appendChild(imagen);
		var columnarow = document.createElement("div");
		columnarow.className = "row";
		columnarow.appendChild(columna1);
		columnarow.appendChild(columna2);
		columnarow.appendChild(columna3);
		columnasub.className = "col-md-12 text-center";
		columnasub.appendChild(boton2sub);
		var columnarow2 = document.createElement("div");
		columnarow2.className = "row botones-sub";
		columnarow2.appendChild(columnasub);
		var columnablock = document.createElement("div");
		columnablock.className = "card-block";
		columnablock.appendChild(columnarow);
		columnablock.appendChild(columnarow2);
		var columnacard = document.createElement("div");
		columnacard.className = "card my-2 py-2";
		if (original.completado) {
			columnacard.className += " completado";
		}
		columnacard.id = original.id;
		columnacard.appendChild(columnablock);
		contenedor.appendChild(columnacard);
		eliminar();
		completar();
	};

	document.getElementById("agregar-tarea").onclick = function (event) {
		event.preventDefault();
		var titulo = document.getElementById("titulo").value;
		var descripcion = document.getElementById("descripcion").value;
		var imagen = document.getElementById("imagen").value;
		if (titulo == "" || descripcion == "" || imagen == "")
		{
			alert("Faltan igresar datos");
		}else {
			alert("Se creo la tarea");
			crearTarea(titulo, descripcion, imagen);
			document.getElementById("titulo").value = "";
			document.getElementById("descripcion").value = "";
			document.getElementById("imagen").value = "";
		}
	};

	document.getElementById("ordenar-id").onclick = function (event) {
		event.preventDefault();
		var objAux = {};
		for (var i = 0; i < tareas.length; i++) {
			for (var j = i + 1; j < tareas.length; j++) {
				if (tareas[j].id < tareas[i].id) {
					console.log(tareas[i].id + " es mayor a " + tareas[j].id);
					objAux = tareas[i];
					tareas[i] = tareas[j];
					tareas[j] = objAux;
				}
			}
		}
		limpiarLista();
		render() ;
	};

	document.getElementById("ordenar-asc").onclick = function (event) {
		event.preventDefault();
		var objAux = {};
		for (var i = 0; i < tareas.length; i++) {
			for (var j = i + 1; j < tareas.length; j++) {
				if (tareas[j].titulo[0].toUpperCase() < tareas[i].titulo[0].toUpperCase()) {
					objAux = tareas[i];
					tareas[i] = tareas[j];
					tareas[j] = objAux;
				}
			}
		}
		limpiarLista();
		render();
	};


	document.getElementById("ordenar-desc").onclick = function (event) {
		event.preventDefault();
		var objAux = {};
		for (var i = 0; i < tareas.length; i++) {
			for (var j = i + 1; j < tareas.length; j++) {
				if (tareas[j].titulo[0].toUpperCase() > tareas[i].titulo[0].toUpperCase()) {
					objAux = tareas[i];
					tareas[i] = tareas[j];
					tareas[j] = objAux;
				}
			}
		}
		limpiarLista();
		render();
	};

	render();
	return {}
})();