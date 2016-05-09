/**
 * Created by Michael Win on 4/11/2016.
 */

var click = 0; //Counter
var newElement = $('#dot').eq(0).clone();
newElement.css('background-color','#85144b');
var colors =['#2ECC40','#0074D9','#85144b','#39CCCC','#FF851B','#001f3f']; //Array of possible colors
main();

function matchy(){
    click++;
    $("#circle").animate({opacity:'.5'},3);
    $("#circle").animate({opacity:'1.0'},"fast");
    $("#circle").text(click*2);
}



function fly() {
    var shadow = circle.cloneNode();
    shadow.classList.add('shadow');
    shadow.style.backgroundColor = 'silver';
    document.body.appendChild(shadow);
    setTimeout(function () {
        shadow.style.backgroundColor = 'white';
    }, 5);

    shadows.push(shadow);
    if (shadows.length > 10) {
        shadows[0].parentNode.removeChild(shadows[0]);
        shadows.shift();
    }
}

function main() {
    $("#dot").css('background-color','yellow');

    movable();
}
function movable(){
    $(document).ready(function(){
        $('#canvas').mousedown(function(move){
            var offset = $(this).offset();  //On mousedown grab offset
            $('#circle').animate({ //Animate via offset
                'top': move.pageY-offset.top -25,
                'left': move.pageX-offset.left -25
            },175,checkCollisions); //call checkCollision function
        });
    })
}
function checkCollisions(){
    checkCollisions2();
    var sphere = $("#dot")[0];
    var pos = getPositions(sphere);
    var circle2 = $("#circle")[0];
    var pos2 = getPositions(circle2);
    var horizontalMatch = comparePositions(pos[0], pos2[0]);
    var verticalMatch = comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;
    if (match){  //Once dot is touched...
        matchy();
        if (click%4==0){
            newElement.appendTo("body");
            newElement.css('left',Math.floor((Math.random() * 950) + 30));
            newElement.css('top',Math.floor((Math.random() * 480) + 30));
        }
        move();
        color();
        var clone = $("#dot").clone(); //Not sure how to do this yet...
    }

function getPositions(sphere) {
    var $sphere = $(sphere);
    var pos = $sphere.position();
    var width = $sphere.width();
    var height = $sphere.height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];  //Grabs perimeter
}
function comparePositions(p1, p2) {
    var x1 = p1[0] < p2[0] ? p1 : p2;
    var x2 = p1[0] < p2[0] ? p2 : p1;
    return !!(x1[1] > x2[0] || x1[0] === x2[0]);  //Simplified thanks to IDE
}
// dont touch this one ^^^^^^^^
}

function move(){
    $("#dot").css('left',Math.floor((Math.random() * 950) + 30)); //will need to ignore previous position.
    $("#dot").css('top',Math.floor((Math.random() * 480) + 30));
    // $("#dot").css('background-color','green'); //Will need ro randomize
}

function color(){
    var random = colors[Math.floor(Math.random() * colors.length)]; //color array
    $("#dot").css('background-color',random);


}

function color2(){
    var random = colors[Math.floor(Math.random() * colors.length)]; //color array
    newElement.css('background-color',random);

}


function checkCollisions2() {
    var pos = getPositions2(newElement);
    var circle2 = $("#circle")[0];
    var pos2 = getPositions2(circle2);
    var horizontalMatch = comparePositions2(pos[0], pos2[0]);
    var verticalMatch = comparePositions2(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;
    if(match){
        matchy();
        newElement.css('left',Math.floor((Math.random() * 950) + 30));
        newElement.css('top',Math.floor((Math.random() * 480) + 30));
        color2();

    }
}
function comparePositions2(p1, p2) {
    var x1 = p1[0] < p2[0] ? p1 : p2;
    var x2 = p1[0] < p2[0] ? p2 : p1;
    return !!(x1[1] > x2[0] || x1[0] === x2[0]);  //Simplified thanks to IDE
}
function getPositions2(newElement) {
    var pos = $(newElement).position();
    var width = $(newElement).width();
    var height = $(newElement).height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];  //Grabs perimeter
}
