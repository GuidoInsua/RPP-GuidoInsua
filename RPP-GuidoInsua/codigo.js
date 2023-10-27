//RPP Guido Insua

class Persona 
{
  constructor(p_id, p_nombre, p_apellido, p_edad) 
  {
    this.id = p_id;
    this.nombre = p_nombre;
    this.apellido = p_apellido;
    this.edad = p_edad;
  }
}

class Heroe extends Persona
{
  constructor(p_id, p_nombre, p_apellido, p_edad, p_alterEgo, p_ciudad, p_publicado) 
  {
    super(p_id, p_nombre, p_apellido, p_edad);
    this.alterEgo = p_alterEgo;
    this.ciudad = p_ciudad;
    this.publicado = p_publicado;
  }
}

class Villano extends Persona
{
  constructor(p_id, p_nombre, p_apellido, p_edad, p_enemigo, p_robos, p_asesinatos) 
  {
    super(p_id, p_nombre, p_apellido, p_edad);
    this.enemigo = p_enemigo;
    this.robos = p_robos;
    this.asesinatos = p_asesinatos;
  }
}

const jsonString = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterEgo":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterEgo":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterEgo":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]'

const arrayObjetos = JSON.parse(jsonString);

function crearObjetoDeClase(unObjeto)
{
  if (unObjeto.hasOwnProperty('alterEgo') && unObjeto.hasOwnProperty('ciudad') && unObjeto.hasOwnProperty('publicado')) 
  {
    return new Heroe(unObjeto.id, unObjeto.nombre, unObjeto.apellido, unObjeto.edad, unObjeto.alterEgo, unObjeto.ciudad, unObjeto.publicado);
  } 
  else if (unObjeto.hasOwnProperty('enemigo') && unObjeto.hasOwnProperty('robos') && unObjeto.hasOwnProperty('asesinatos')) 
  {
    var unVillano = new Villano(unObjeto.id, unObjeto.nombre, unObjeto.apellido, unObjeto.edad, unObjeto.enemigo, unObjeto.robos, unObjeto.asesinatos);
    return unVillano
  } 
}

const listaPersonas = arrayObjetos.map(crearObjetoDeClase);

var ultimoArray = new Array();

ultimoArray = listaPersonas;

const tablaCuerpo = document.getElementById('tablaCuerpo');

function actualizarTabla(listaPersonas)
{
  while (tablaCuerpo.firstChild)
  {
    tablaCuerpo.removeChild(tablaCuerpo.firstChild);
  }

  mantenerColumnas();

  listaPersonas.forEach((persona) => 
  {
      const nuevaFila = document.createElement('tr');
      nuevaFila.id = `fila_con_id-${persona.id}`; 
      nuevaFila.innerHTML = `
          <td class="colId">${persona.id}</td>
          <td class="colNombre">${persona.nombre}</td>
          <td class="colApellido">${persona.apellido}</td>
          <td class="colEdad">${persona.edad}</td>
          <td class="colAlterEgo">${persona.alterEgo === undefined ? '' : persona.alterEgo}</td>
          <td class="colCiudad">${persona.ciudad === undefined ? '' : persona.ciudad}</td>
          <td class="colPublicado">${persona.publicado === undefined ? '' : persona.publicado}</td>
          <td class="colEnemigo">${persona.enemigo === undefined ? '' : persona.enemigo}</td>
          <td class="colRobos">${persona.robos === undefined ? '' : persona.robos}</td>
          <td class="colAsesiatos">${persona.asesinatos === undefined ? '' : persona.asesinatos}</td>
      `;
      tablaCuerpo.appendChild(nuevaFila);
  });

  mantenerColumnas();
}

actualizarTabla(listaPersonas);

function filtrarPersonasPorTipo(tipo, personas) 
{
  if(tipo === "todos")
  {
    return personas;
  }

  if (tipo === "heroe" || tipo === "villano") 
  {
    return personas.filter((persona) => 
    {
      if (tipo === "heroe" && persona instanceof Heroe) 
      {
        return true;
      } 
      else if (tipo === "villano" && persona instanceof Villano) 
      {
        return true;
      } 
      else 
      {
        return false;
      }
    });
  } 
}

var filtros = document.getElementById("filtros");

filtros.addEventListener("change", function()
{
  var filtro = filtros.value;

  let nuevoArray = filtrarPersonasPorTipo(filtro, listaPersonas);

  ultimoArray = nuevoArray;

  actualizarTabla(ultimoArray);
})

var btnCalcular = document.getElementById("calcular");

var txtPromedio = document.getElementById("txtPromedio");

btnCalcular.addEventListener("click", function()
{
  var sumaEdades = ultimoArray.reduce((acumulador, persona) => 
  {
    return parseInt(acumulador) + parseInt(persona.edad);
  }, 0);

  var promedioEdad = sumaEdades / ultimoArray.length;

  txtPromedio.value = promedioEdad.toFixed(2);
})

var btnAgregar = document.getElementById("agregar");
var btnAgregarAbm = document.getElementById("agregarAbm");
var btnModificar = document.getElementById("modificarAbm");
var btnEliminar = document.getElementById("eliminarAbm");
var btnCanelar = document.getElementById("cancelarAbm");
var primerForm = document.getElementById("primerForm");
var abm = document.getElementById("ABM");

abm.style.display = 'none';

function cambiarDeFormulario()
{
  if(primerForm.style.display != 'none')
  {
    primerForm.style.display = 'none';
    abm.style.display = 'block';
  }
  else
  {
    primerForm.style.display = 'block';
    abm.style.display = 'none';
  }
}

var idAbm = document.getElementById("idAbm");
var nombreAbm = document.getElementById("nombreAbm");
var apellidoAbm = document.getElementById("apellidoAbm");
var edadAbm = document.getElementById("edadAbm");
var alterEgoAbm = document.getElementById("alterEgoAbm");
var ciudadAbm = document.getElementById("ciudadAbm");
var publicadoAbm = document.getElementById("publicadoAbm");
var enemigoAbm = document.getElementById("enemigoAbm");
var robosAbm = document.getElementById("robosAbm");
var asesinatosAbm = document.getElementById("asesinatosAbm");
var tipoAbm = document.getElementById("tipoAbm");
var datosHeroe = document.getElementById("datosHeroe");
var datosVillano = document.getElementById("datosVillano");

function vaciarDatosAbm()
{
  idAbm.value = '';
  nombreAbm.value = '';
  apellidoAbm.value = '';
  edadAbm.value = '';
  tipoAbm.value = "heroe";
  alterEgoAbm.value = '';
  ciudadAbm.value = '';
  publicadoAbm.value = '';
  enemigoAbm.value = '';
  robosAbm.value = '';
  asesinatosAbm.value = '';
}

btnAgregar.addEventListener('click', function()
{
  vaciarDatosAbm();
  cambiarDeFormulario();
  filtarParametrosAbm();

  btnAgregarAbm.style.display = 'inline-block';
  btnModificar.style.display = 'none';
  btnEliminar.style.display = 'none';
});

btnCanelar.addEventListener('click', cambiarDeFormulario);

function filtarParametrosAbm()
{
  if (tipoAbm.value == "heroe")
  {
    datosHeroe.style.display = 'block';
    datosVillano.style.display = 'none';
  }
  else
  {
    datosHeroe.style.display = 'none';
    datosVillano.style.display = 'block';
  }
}

function completarDatosAbm(datosFila)
{
  idAbm.value = datosFila[0];
  nombreAbm.value = datosFila[1];
  apellidoAbm.value = datosFila[2];
  edadAbm.value = datosFila[3];

  if(datosFila[4] != '')
  {
    tipoAbm.value = "heroe";
    alterEgoAbm.value = datosFila[4];
    ciudadAbm.value = datosFila[5];
    publicadoAbm.value = datosFila[6];
    enemigoAbm.value = '';
    robosAbm.value = '';
    asesinatosAbm.value = '';
  }
  else
  {
    tipoAbm.value = "villano";
    alterEgoAbm.value = '';
    ciudadAbm.value = '';
    publicadoAbm.value = '';
    enemigoAbm.value = datosFila[7];
    robosAbm.value = datosFila[8];
    asesinatosAbm.value = datosFila[9];
  }

  filtarParametrosAbm();
}

$(document).ready(function() 
{
  $('#tablaCuerpo').on('dblclick', 'tr', function() 
  {
    var datosFila = $(this).children('td').map(function() 
    {
        return this.textContent;
    }).get();

    completarDatosAbm(datosFila);
    cambiarDeFormulario();
    btnAgregarAbm.style.display = 'none';
    btnModificar.style.display = 'inline-block';
    btnEliminar.style.display = 'inline-block';
  });
});

tipoAbm.addEventListener('change',filtarParametrosAbm);

function eliminarPersona(id)
{
  for (let i = 0; i < listaPersonas.length; i++) 
  {
    if (listaPersonas[i].id == id)
    {
        listaPersonas.splice(i, 1);
    }
  }
}

btnEliminar.addEventListener('click', function()
{
  eliminarPersona(idAbm.value);
  actualizarTabla(listaPersonas);
  cambiarDeFormulario();
});

function validarDatosAbm()
{
  if(nombreAbm.value != null && apellidoAbm.value != null && edadAbm.value != null && !isNaN(edadAbm.value))
  {
    if(nombreAbm.value && apellidoAbm.value && edadAbm.value)
    {
      switch(tipoAbm.value)
      {
        case "heroe":
          if(alterEgoAbm.value != null && ciudadAbm.value != null && !isNaN(publicadoAbm.value) && publicadoAbm.value > 1940)
          {
            if(alterEgoAbm.value && ciudadAbm.value)
            {
                return true;
            }
          }
        break;

        case "villano":
          if(enemigoAbm.value != null && !isNaN(robosAbm.value) && robosAbm.value > 0 && !isNaN(asesinatosAbm.value) && asesinatosAbm.value > 0)
          {
            if(enemigoAbm.value)
            {
                return true;
            }
          }
        break;
      }
    }
  }
  return false;
}

function modificarPersona(id)
{
  if (validarDatosAbm())
  {
    listaPersonas.forEach(function(persona)
    {
      if (persona.id == id)
      {
        persona.nombre = nombreAbm.value;
        persona.apellido = apellidoAbm.value;
        persona.edad = edadAbm.value;

        switch(tipoAbm.value)
        {
          case "heroe":
            persona.alterEgo = alterEgoAbm.value;
            persona.ciudad = ciudadAbm.value;
            persona.publicado = publicadoAbm.value;
            persona.enemigo = '';
            persona.robos = '';
            persona.asesinatos = '';
          break;
  
          case "villano":
            persona.alterEgo = '';
            persona.ciudad = '';
            persona.publicado = '';
            persona.enemigo = enemigoAbm.value;
            persona.robos = robosAbm.value;
            persona.asesinatos = asesinatosAbm.value;
          break;
        }
      }
    });
  }
  else
  {
    alert("Parametos incorrectos");
  }
}

btnModificar.addEventListener('click', function()
{
  modificarPersona(idAbm.value);
  actualizarTabla(listaPersonas);
  cambiarDeFormulario();
})

function generarNuevoId(listaPersonas)
{
  var nuevoId = listaPersonas.reduce((max, persona) => 
  {
    return persona.id > max ? persona.id : max;
  }, 0) + 1;
  
  return nuevoId;
}

function agregarPersona()
{
  if (validarDatosAbm())
  {
    var nuevoId = generarNuevoId(listaPersonas);

    switch(tipoAbm.value)
    {
      case "heroe":
        var persona = new Heroe(nuevoId);
        persona.alterEgo = alterEgoAbm.value;
        persona.ciudad = ciudadAbm.value;
        persona.publicado = publicadoAbm.value;
        persona.enemigo = '';
        persona.robos = '';
        persona.asesinatos = '';
      break;

      case "villano":
        var persona = new Villano(nuevoId);
        persona.alterEgo = '';
        persona.ciudad = '';
        persona.publicado = '';
        persona.enemigo = enemigoAbm.value;
        persona.robos = robosAbm.value;
        persona.asesinatos = asesinatosAbm.value;
      break;
    }
    
    persona.nombre = nombreAbm.value;
    persona.apellido = apellidoAbm.value;
    persona.edad = edadAbm.value;

    listaPersonas.push(persona);
  }
  else
  {
    alert("Parametos incorrectos");
  }
}

btnAgregarAbm.addEventListener("click", function()
{
  agregarPersona();
  actualizarTabla(listaPersonas);
  cambiarDeFormulario();
})

var checkBoxes = document.getElementById("checkboxes");

function OcultarClase(clase)
{
  var descripcion = "." + clase;
  var ocultables = document.querySelectorAll(descripcion);

  ocultables.forEach(function(elemento)
  {
    if(elemento.style.display == "none")
    {
      elemento.style.display = "table-cell";
    }
    else
    {
      elemento.style.display = "none";
    }
  });
}

checkBoxes.addEventListener('change', function(event)
{
  var clase = event.target.getAttribute('columna')
  OcultarClase(clase)
})

function mantenerColumnas()
{
  var checkboxesDiv = document.getElementById("checkboxes");
  var listaCheckBoxes = checkboxesDiv.getElementsByTagName("input");

  for (var i = 0; i < listaCheckBoxes.length; i++) 
  {
    if(listaCheckBoxes[i].checked == false)
    {
      var event = new Event("change", { bubbles: true });
      listaCheckBoxes[i].dispatchEvent(event);
    }
  }
}

function ordenarPorAtributo(array, atributo) 
{
    array.sort((a, b) => 
    {
        const valorA = a[atributo];
        const valorB = b[atributo];
        
        if (valorA === undefined) return 1;
        if (valorB === undefined) return -1;
        
        if (valorA < valorB) return -1;
        if (valorA > valorB) return 1;
        
        return 0;
    });
}

$(document).ready(function() 
{
    $('#tablaHeader th').on('dblclick', function()
    {
        var atributo = this.id; 
        ordenarPorAtributo(ultimoArray, atributo);
        actualizarTabla(ultimoArray);
    });
});