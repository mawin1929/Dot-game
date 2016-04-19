/**
 * Created by Michael Win on 4/11/2016.
 */
var click = 0; //Counter
var colors =['green','blue','red','aqua','chocolate']; //Array of possible colors
main(); //Calls Main function

function main() {
    // drawPlayer();
    movable();
}
function movable(){
    $(document).ready(function(){
        $('#canvas').mousedown(function(move){
            var offset = $(this).offset();  //On mousedown grab offset
            $('#circle').animate({ //Animate via offset
                'top': move.pageY-offset.top -19,
                'left': move.pageX-offset.left +6
            },175,checkCollisions); //call checkCollision function
        });
    })
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
function checkCollisions(){
    var sphere = $("#dot")[0];
    var pos = getPositions(sphere);
    var circle2 = $("#circle")[0];
    var pos2 = getPositions(circle2);
    var horizontalMatch = comparePositions(pos[0], pos2[0]);
    var verticalMatch = comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;

    if (match){  //Once dot is touched...
        click++;
        $(this).animate({opacity:'.5'},3);
        $(this).animate({opacity:'1.0'},"fast");
        $(this).text(click);

        move();
        color();
        var clone = $("#dot").clone(); //Not sure how to do this yet...
        // $("#dot").fadeTo(150,0.0,function(){});
        // $("#dot").remove(); Maybe not remove, but place somewhere else?
    }
}
function move(){
    $("#dot").css('left',Math.floor((Math.random() * 950) + 30)); //will need to ignore previous position.
    $("#dot").css('top',Math.floor((Math.random() * 400) + 30));
    // $("#dot").css('background-color','green'); //Will need ro randomize
}

function color(){
 var random = colors[Math.floor(Math.random() * colors.length)]; //color array
    $("#dot").css('background-color',random);

}



// function getPositions(circle) {
//     var $circle = $(circle);
//     var pos = $circle.position();
//     var width = $circle.width();
//     var height = $circle.height();
//     return [ [ circle.left, circle.left + width ], [ circle.top, circle.top + height ] ];
// }

// function drawPlayer() {
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.arc(100,75,50,0,2*Math.PI);
//     ctx.stroke();
//     ctx.fillStyle = "#FF0000";
//     ctx.fill();
//     ctx.lineWidth = 3;
//     ctx.strokeStyle = '#003300';
//     ctx.stroke();
// }





