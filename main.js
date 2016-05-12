/**
 * Created by Michael Win on 4/11/2016.
 */


AudioFX=function(){var f="0.4.0";var c=false,e=document.createElement("audio"),a=function(j){var i=e.canPlayType(j);return(i==="probably")||(i==="maybe")};if(e&&e.canPlayType){c={ogg:a('audio/ogg; codecs="vorbis"'),mp3:a("audio/mpeg;"),m4a:a("audio/x-m4a;")||a("audio/aac;"),wav:a('audio/wav; codecs="1"'),loop:(typeof e.loop==="boolean")}}var d=function(m,i,l){var k=document.createElement("audio");if(l){var j=function(){k.removeEventListener("canplay",j,false);l()};k.addEventListener("canplay",j,false)}if(i.loop&&!c.loop){k.addEventListener("ended",function(){k.currentTime=0;k.play()},false)}k.volume=i.volume||0.1;k.autoplay=i.autoplay;k.loop=i.loop;k.src=m;return k};var h=function(i){for(var j=0;j<i.length;j++){if(c&&c[i[j]]){return i[j]}}};var g=function(i){var k,j;for(k=0;k<i.length;k++){j=i[k];if(j.paused||j.ended){return j}}};var b=function(o,j,m){j=j||{};var i=j.formats||[],l=h(i),k=[];o=o+(l?"."+l:"");if(c){for(var p=0;p<(j.pool||1);p++){k.push(d(o,j,p==0?m:null))}}else{m()}return{audio:(k.length==1?k[0]:k),play:function(){var n=g(k);if(n){n.play()}},stop:function(){var r,q;for(r=0;r<k.length;r++){q=k[r];q.pause();q.currentTime=0}}}};b.version=f;b.supported=c;return b}();
//Load in AudioFx lib
var clear;
var click = 0; //Counter
var circly = document.getElementById('circle');
var shadows= [];
var beep = AudioFX('TestSound', {formats: ['wav'], pool: 10 }); //Sound :)))
var newElement = $('#dot').eq(0).clone();
newElement.css('background-color','#85144b');
var colors =['#2ECC40','#0074D9','#F4D03F','#FF851B','#D2527F']; //Array of possible colors
var globalran = '#ffee2a';
main();

function main() {
    $("#dot").css('background-color','#ffee2a ');
    $("#text").animate({top:'-=150px'}, 2500);
    movable();


}

function matchy(){
    click++;
    $("#text").empty();
    $("#circle").animate({opacity:'.5'},3);
    $("#circle").animate({opacity:'1.0'},"fast");
    $("#circle").text(click*2);
}


function fly() {
    var shadow = circly.cloneNode();
    shadow.id = "trail";
    shadow.classList.add('shadow');
    document.body.appendChild(shadow);
    shadows.push(shadow);
    if (shadows.length > 15) {
        shadows[0].parentNode.removeChild(shadows[0]);
        shadows.shift();
    }
}

function clearfly(){
    if (shadows.length > 0) {
        shadows[0].parentNode.removeChild(shadows[0]);
        shadows.shift();
    }
}

function sound(){
    beep.play();
}
function movable(){
    $(document).ready(function(){
        $('#canvas').mousedown(function(move){
            var offset = $(this).offset();  //On mousedown grab offset
            $('#circle').animate({ //Animate via offset
                'top': move.pageY-offset.top -25,
                'left': move.pageX-offset.left -25
            },175,checkCollisions); //call checkCollision function
            clearInterval(clear);
           trail = setInterval(fly, 5);
        });
        $('#canvas').mouseup(function(){
            clearInterval(trail);
            clear = setInterval(clearfly,10);

            // shadows[0].parentNode.removeChild(shadows[0]);
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
        sound();
        $("#circle").css({
            background: "-webkit-gradient(linear, left top, left bottom, from("+globalran+"), to("+globalran+"))"
        });
        beep.play();
        $("#circle").css('box-shadow', '1px 1px 100px 10px '+globalran+'');
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
    globalran = random;
    // $("#circle").css({
    //     background: "-webkit-gradient(linear, left top, left bottom, from("+random+"), to("+random+"))"
    // });
}

function color2(){
    var random = colors[Math.floor(Math.random() * colors.length)]; //color array
    newElement.css('background-color',random);
    globalran = random;
    // $("#circle").css({
    //     background: "-webkit-gradient(linear, left top, left bottom, from("+random+"), to("+random+"))"
    // });

}


function checkCollisions2() {
    var pos = getPositions2(newElement);
    var circle2 = $("#circle")[0];
    var pos2 = getPositions2(circle2);
    var horizontalMatch = comparePositions2(pos[0], pos2[0]);
    var verticalMatch = comparePositions2(pos[1], pos2[1]);
    var match = horizontalMatch && verticalMatch;
    if(match){
        $("#circle").css({
            background: "-webkit-gradient(linear, left top, left bottom, from("+globalran+"), to("+globalran+"))"
        });
        beep.play();
        $("#circle").css('box-shadow', '1px 1px 100px 10px '+globalran+'');
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
