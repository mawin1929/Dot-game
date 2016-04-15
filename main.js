/**
 * Created by Michael Win on 4/11/2016.
 */
var click = 0;
main();

function main() {
    // drawPlayer();
    movable();
}
function movable(){
    $(document).ready(function(){
        $('#canvas').mousedown(function(move){
            var offset = $(this).offset();
            $('#circle').animate({
                'top': move.pageY-offset.top -19,
                'left': move.pageX-offset.left +6
            },180,checkCollisions);
        });
    })
}
function getPositions(sphere) {
    var $sphere = $(sphere);
    var pos = $sphere.position();
    var width = $sphere.width();
    var height = $sphere.height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
}
function comparePositions(p1, p2) {
    var x1 = p1[0] < p2[0] ? p1 : p2;
    var x2 = p1[0] < p2[0] ? p2 : p1;
    return !!(x1[1] > x2[0] || x1[0] === x2[0]);
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

    if (match){
        click++;
        $(this).text("....." + click +"....");
        move();
        // $("#dot").fadeTo(150,0.0,function(){});
        // $("#dot").remove(); Maybe not remove, but place somewhere else?
    }
}
function move(){
    $("#dot").css('left',Math.floor((Math.random() * 950) + 30));
    $("#dot").css('top',Math.floor((Math.random() * 400) + 30));
    $("#dot").css('background-color','green')
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





