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
        $('#canvas').mousedown(function(e){
            var offset = $(this).offset();
            $('#circle').animate({
                'top': e.pageY-offset.top,
                'left': e.pageX-offset.left
            },180);
        })
    })


}

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





