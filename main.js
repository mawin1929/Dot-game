main();


$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});
function main() {
    drawPlayer();

}

function drawPlayer() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(100,75,50,0,2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}


