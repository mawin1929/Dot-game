/**
 * Created by Michael Win on 4/11/2016.
 */
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
            },180);
        })
    })
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





