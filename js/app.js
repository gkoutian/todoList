var TODOLIST = (function () {

	var tareas = [
	];

	var diccionario = [
		{
			code: "ART",
			keyword: ["PINTURA", "ARTE", "DIBUJO", "DIBUJOS", "PINTURAS"]	
		},
		{
			code: "BASKETBALL",
			keyword: ["BASKET", "BASKETBALL"]
		},
		{
			code: "BBQ",
			keyword: ["ASADO", "ASADITO", ]
		},
		{
			code: "BEER",
			keyword: ["CERVEZA", "CERVEZAS", "BIRRA", "BIRRAS", "OCTOBERFEST"]
		},
		{
			code: "BILLIARD",
			keyword: ["POOL"]
		},
		{
			code: "BOWLING",
			keyword: ["BOWLING"]
		},
		{
			code: "BOOKCLUB",
			keyword: ["LIBRO", "LIBROS", "LIBRERIA"]
		},
		{
			code: "CAMPING",
			keyword: ["CAMPING", "CAMPAMENTO"]
		},
		{
			code: "CINEMA",
			keyword: ["CINE"]
		},
		{
			code: "BREAKFAST",
			keyword: ["DESAYUNO", "MERIENDA"]
		},
		{
			code: "dinner",
			keyword: ["ALMUERZO", "COMIDA", "CENA"]
		},
		{
			code: "CLEAN",
			keyword: ["LIMPIEZA", "LIMPIAR"]
		},
		{
			code: "CODE",
			keyword: ["PROGRAMAR", "PROGRAMA", "HACKATON"]
		},
		{
			code: "COFFEE",
			keyword: ["CAFE", "CAFES", "CAFETERIA", "STARBUCKS"]
		},
		{
			code: "CONCERT",
			keyword: ["CONCIERTO", "RECITAL"]
		},
		{
			code: "CYCLING",
			keyword: ["BICICLETA", "BICI"]
		},
		{
			code: "DANCING",
			keyword: ["BAILAR", "BAILE", ""]
		},
		{
			code: "DENTIST",
			keyword: ["DENTISTA", "ODONTOLOGO", "ODONTOLOGA"]
		},
		{
			code: "GOLF",
			keyword: ["GOLF"]
		},
		{
			code: "GYM",
			keyword: ["GIMNASIO", "GIM", "GYM"]
		},
		{
			code: "HAIRCUT",
			keyword: ["PELO", "PELUQUERIA", "PELUQUERO", "PELUQUERO"]
		},
		{
			code: "HALLOWEEN",
			keyword: ["HALLOWEEN"]
		},
		{
			code: "LEARNINSTRUMENT",
			keyword: ["PIANO", "CANTAR", "CANTO", "FLAUTA", "ORQUESTA", "OBOE", "CLARINETE", "SAXOFON", "SAXO", "TROMPETA", "MUSICA"]
		},
		{
			code: "LEARNLANGUAGE",
			keyword: ["FRANCES", "ALEMAN", "INGLES"]
		},
		{
			code: "MANICURE",
			keyword: ["MANICURA", "PEDICURA", "MANICURAS", "PEDICURAS"]
		},
		{
			code: "MASSAGE",
			keyword: ["MASAJE"]
		},
		{
			code: "OILCHANGE",
			keyword: ["ACEITE"]
		},
		{
			code: "READ",
			keyword: ["LEER", "DIARIO"]
		},
		{
			code: "REPAIR",
			keyword: ["REPARAR", "ARREGLAR", "REPARADO"]
		},
		{
			code: "RUNNING",
			keyword: ["CORRER"]
		},
		{
			code: "SOCCER",
			keyword: ["FUTBOL", "PELOTA"]
		},
		{
			code: "SWIMMING",
			keyword: ["PILETA", "NADAR", "NATACION", "PILE"]
		},
		{
			code: "TENNIS",
			keyword: ["TENIS"]
		},
		{
			code: "WALK",
			keyword: ["CAMINAR", "CAMINATA"]
		},
		{
			code: "YOGA",
			keyword: ["YOGA"]
		}
	]

	function asignarImagen (texto) {
		texto = texto.replace(","," ");
		texto = texto.replace("."," ");
		texto = texto.toUpperCase();
		var arrstr = texto.split(" ");
		var encontrado;
		for (var i in arrstr) {
			for (var j in diccionario) {
				for (var k in diccionario[j].keyword){
					if (arrstr[i] == diccionario[j].keyword[k]) {
						encontrado = diccionario[j].code;
						break;
					}
				}
				if (encontrado) {
						break;
					}
			}
			if (encontrado) {
						break;
					}
		}
		if (!encontrado) {
			encontrado = "BASE"
		}
		return encontrado;
	}

	function recuperarDatos () {
		var listTareas = localStorage.getItem("listaTareas");
		if (listTareas) {
			tareas = JSON.parse(listTareas);	
		}
	};

	function guardarDatos() {
		localStorage.setItem("listaTareas", JSON.stringify(tareas));
	};

	function limpiarLista () {
		document.getElementById("lista-de-tareas").innerHTML = "";	
	}

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
							guardarDatos();
							limpiarLista();
							render();
						}
					}
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
						guardarDatos();
						limpiarLista();
						render();
					}
				}
			}
		}
	}


	function render () {
		var saludo = document.getElementById("saludo");
		if (tareas.length == 0){
			saludo.style.display = "inline-block";
		} else {
			for (var i = 0; i < tareas.length; i++) {
				saludo.style.display = "none";
				renderizarTareas(tareas[i]);
			}
		}
	};


	function crearTarea (titulo, descripcion) {
		var id = Math.floor(Math.random() * (200 - 1) +1);
		var nuevaTarea = {
			id: id,
			titulo: titulo,
			descripcion: descripcion,
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
			icono.className = "flaticon-checked px-1";
			iconosub.className = "flaticon-checked px-1";
			boton.className = "btn btn-outline-success btn-sm my-1 botonRealizado";
			botonsub.className = "btn btn-outline-success btn-sm my-1 mx-2 botonRealizado";
			boton.appendChild(icono);
			botonsub.appendChild(iconosub);	
			columna1.appendChild(boton);
			columnasub.appendChild(botonsub);
		}
		icono2.className = "flaticon-trash px-1";
		boton2.className = "btn btn-outline-danger btn-sm my-1 botonEliminar";
		boton2.appendChild(icono2);
		icono2sub.className = "flaticon-trash px-1";
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
		imagen.src = "img/" + asignarImagen(original.titulo) + ".jpg";
		imagen.className = "img-fluid rounded-circle";
		imagen.width = 120;
		imagen.height = 120;
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
		columnablock.className = "card-block text-left";
		columnablock.appendChild(columnarow);
		columnablock.appendChild(columnarow2);
		var columnacard = document.createElement("div");
		columnacard.className = "card my-2 py-2 ";
		if (original.completado) {
			columnacard.className += " completado";
		}
		columnacard.id = original.id;
		columnacard.appendChild(columnablock);
		contenedor.appendChild(columnacard);
		var saludo = document.getElementById("saludo");
		saludo.style.display = "none";
		eliminar();
		completar();
	};

	document.getElementById("agregar-tarea").onclick = function (event) {
		event.preventDefault();
		apretar();
	};

	function apretar () {
		var titulo = document.getElementById("titulo").value;
		var descripcion = document.getElementById("descripcion").value;
		if (titulo == "" || descripcion == "")
		{
			alerta("danger");
		}else {
			alerta("success");
			crearTarea(titulo, descripcion);
			document.getElementById("titulo").value = "";
			document.getElementById("descripcion").value = "";
		}
		var boton = document.getElementById("navbarSupportedContent");
		boton.className = "navbar-collapse collapse";
		guardarDatos();
	};

	function ordenarTareas(arrayaOrdenar, forma, prop) {
		arrayaOrdenar.sort( function (a, b) {
			if (forma == "asc") {
				if (a[prop] > b[prop]) {
					return 1;
				} else {
					return -1;
				}
			} else if (forma == "desc") {
				if (a[prop] < b[prop]) {
					return 1;
				} else {
					return -1;
				}
			}
		})
	}

	document.getElementById("ordenar-id").onclick = function (event) {
		event.preventDefault();
		ordenarTareas(tareas, "asc", "id");
		guardarDatos();
		limpiarLista();
		render() ;
	};

	document.getElementById("ordenar-asc").onclick = function (event) {
		event.preventDefault();
		ordenarTareas(tareas, "asc", "titulo");
		guardarDatos();
		limpiarLista();
		render();
	};

	document.getElementById("ordenar-desc").onclick = function (event) {
		event.preventDefault();
		ordenarTareas(tareas, "desc", "titulo");
		guardarDatos();
		limpiarLista();
		render();
	};

	function alerta (tipo) {
		var span = document.createElement("span");
		span.innerHTML = "&times;";
		span.setAttribute("aria-hidden", "true");
		var boton = document.createElement("button");
		boton.type = "button";
		boton.className = "close";
		boton.setAttribute("data-dismiss", "alert");
		boton.setAttribute("aria-label", "Close");
		boton.appendChild(span);
		var area = document.createElement("div");
		if (tipo == "danger") {
			area.className = "alert alert-danger alert-dismissible fade show";
			area.appendChild(boton);
			area.innerHTML += "Faltan datos para crear la tarea"
		} else {
			area.className = "alert alert-success alert-dismissible fade show";
			area.appendChild(boton);
			area.innerHTML += "Se creo la tarea";
		}
		area.setAttribute("role", "alert");
		var alerta = document.getElementById("alertas");
		alerta.appendChild(area);
	};

	document.getElementById("descripcion").onkeypress = function (event) {
		var dato = document.getElementById("titulo").value;
		if (event.keyCode == 13) {
			event.preventDefault();
			if (dato) {
				apretar();
			}
		}
	}

	recuperarDatos();
	render();
	return {};
})();