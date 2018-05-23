// JavaScript Document

function proyecto(elemento,opciones){
	
var defecto={
	max_score:100,reporta_calif:true
	};	

var parametros=$.extend(defecto,opciones);

var _this=$(elemento);

var slides=_this.find(".principal>div");
var contenido=_this.find(".contenido");
var intro=_this.find(".intro");
var diapositiva_actual;
var transicion=false;
var valido=true;
var calificacion1=0;
var realizado=0;
var revision=false;



function init(){

	$( "#dialog" ).dialog({
		autoOpen: false,
		 height: 515,
		  width: 450
	});
	
	var color_verde = '#C0F1B4';
	var color_rojo = '#FFBFBF';
	$("#respuesta-1, #respuesta-2").draggable({containment: '#contenedor', scroll: false});
	$("#caja-1").droppable({
			drop: function(event, ui) {
				var el_id = ui.draggable.attr("id");

				if(el_id=="respuesta-1"){
					valido=true;
					ui.draggable.css({'background-color' : color_verde});
					calificacion1+=33.33;
					realizado++;		
					alert("Felicidades, seleccionaste la respuesta correcta.");	
					}
					else{
						realizado++;
						alert("Tu respuesta fue incorrecta, te recomiendo volver a revisar el contenido de esta Lección.");
						ui.draggable.css({'background-color' : color_rojo});
						}
						
				
			}
		});
	
	
	$(".btnStart").click(iniciar);
	$(".siguiente").click(siguiente);
	$(".anterior").click(anterior);	
	
	$(".btnEjercicio1").click(guardarEjercicio1);
	$(".btnEjercicio2").click(guardarEjercicio2);
	$(".btnEjercicio3").click(guardarEjercicio3);
	
	//inicio ejercicio
	$(".btnRevisar").click(revisar);	
	//inicio leccion
	$(".btnLeccion").click(leccion);	
	$(".btnInicio").click(leccion);	
	//referencias
	$(".btnSalir").click(salir);
	

	
	diapositiva_actual=0;
	
	mover_diapositiva(diapositiva_actual);
}

function guardarEjercicio1(){



if(revision==false){
	var respuestaRadios=0;
	
if($(".ejercicio1 input[name='pregunta1']:radio").is(':checked')){
	
	valido=true;
	if($("input:radio[name=pregunta1]:checked").val()==1){
		calificacion1+=33.33;
		respuestaRadios++;
		$(".ejercicio1 input[name='pregunta1']:checked").parent().addClass("bien");
		alert("Felicidades, seleccionaste la respuesta correcta.");		
	}else{
		alert("Tu respuesta fue incorrecta, te recomiendo volver a revisar el contenido de esta Lección.");
		$(".ejercicio1 input[name='pregunta1']:checked").parent().addClass("mal");
	}
	
	$(".ejercicio1 input[name='pregunta1']:radio").attr('disabled','disabled');
	
	
}else{
	valido=false;
		alert("Elige una respuesta antes de enviarla.");		
		//break;
}
}
siguiente();

}

function guardarEjercicio2(){

if(revision==false){
var respuestaRadios=0;

if($(".ejercicio2 input[name='pregunta2']:radio").is(':checked')){
	
	valido=true;
	if($("input:radio[name=pregunta2]:checked").val()==1){
		calificacion1+=33.33;
		respuestaRadios++;		
		$(".ejercicio2 input[name='pregunta2']:checked").parent().addClass("bien");
		alert("Felicidades, seleccionaste la respuesta correcta.");	
	}else{
		alert("Tu respuesta fue incorrecta, te recomiendo volver a revisar el contenido de esta Lección.");
		$(".ejercicio2 input[name='pregunta2']:checked").parent().addClass("mal");
	}
	
	$(".ejercicio2 input[name='pregunta2']:radio").attr('disabled','disabled');
	
}else{
	valido=false;
		alert("Elige una respuesta antes de enviarla.");		
		//break;
}
}
siguiente();


}

function guardarEjercicio3(){
	
if(revision==false){
		
if(realizado==0){
	valido=false;
	alert("Elige una respuesta antes de enviarla.");
	}
	else{
		
			$("#respuesta-1").draggable({ disabled: true });  
	$("#respuesta-2").draggable({ disabled: true });  
	$("#caja-1").droppable({ disabled: true });
		
		$("#calificacion").append("Calificación: <br>"+Math.round(calificacion1));
	}
		
}



siguiente();

}


function iniciar(){
	mover_diapositiva(1);	
}

function revisar(){
	revision=true;
	mover_diapositiva(5);	
}
function leccion(){
	reiniciar();
	revision=false;
	mover_diapositiva(1);	
}
function salir(){
	mover_diapositiva(9);	
}

function reiniciar(){
	
//reinicia todos los elementos
	reiniciarElemntos();
	calificacion1=0;
	mover_diapositiva(0);
	
}

function reiniciarElemntos(){
	
	
	//$( ":radio").removeAttr('checked');
	$(":radio").each(function(index, element) {
        element.checked=false;
		element.disabled=false;
		
    });
	
	$("#respuesta-1").draggable({ disabled: false });  
	$("#respuesta-2").draggable({ disabled: false });  
	$("#caja-1").droppable({ disabled: false });
	
	$("#respuesta-1").css('top',0);
	$("#respuesta-1").css('left',0);
	$("#respuesta-1").css('background-color','');
	
	$("#respuesta-2").css('top',0);
	$("#respuesta-2").css('left',0);
	$("#respuesta-2").css('background-color','');
	
	$(".ejercicio1 input[name='pregunta1']:radio").parent().removeClass("bien");
	$(".ejercicio1 input[name='pregunta1']:radio").parent().removeClass("mal");
	
	$(".ejercicio2 input[name='pregunta2']:radio").parent().removeClass("bien");
	$(".ejercicio2 input[name='pregunta2']:radio").parent().removeClass("mal");
	
	
	
	$("#calificacion").html("");
	
	
	
}


function siguiente(){
	if((diapositiva_actual<slides.length-1) && (valido)){
		mover_diapositiva(diapositiva_actual+1);
		
	}
}

function mover_diapositiva(diapositiva){
	if(!transicion){
		transicion=true;
	slides.eq(diapositiva_actual).fadeOut(500,function(){
			slides.eq(diapositiva).fadeIn(500,function(){
					diapositiva_actual=diapositiva;
					transicion=false;
				});	
		});
	}
}
	
function anterior(){
if(diapositiva_actual>0){
		mover_diapositiva(diapositiva_actual-1);		
	}
}	
	
	init();
	
}
