img = '';
status = "";
objetos = [];

function preload(){
    img = loadImage('vai.jpg');
}

function setup(){
    canvas = createCanvas(800,500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Começando a detectar"
}

function draw(){
    image(img,0,0,800,500);
    
    if(status != ''){
        for(i = 0; i < objetos.length; i++){
            document.getElementById('status').innerHTML = objetos.length +' Objetos Detectados';
            fill('blue');
            porcentagem = floor(objetos[i].confidence * 100);
            text(objetos[i].label + " " + porcentagem + '%', objetos[i].x + 15, objetos[i].y + 20) 
            noFill();
            stroke('blue');
            rect(objetos[i].x, objetos[i].y, objetos[i].width , objetos[i].height);
        }
    }

}


function modelLoaded(){
    console.log('Carreguei');
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objetos = results;
    }
}