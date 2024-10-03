// let colorss = ["green","red","yellow","blue"];
// let real_sequence = []
// let player_sequence = []
// let count = 0,x=0,level=1;
// let started = false   

// $(document).keydown(()=>{
//     if(!started){
//         startGame();
//     }
//     })

// function startGame(){
//     started = true
//     let crr = rand_no_generator()
//     real_sequence.push(crr)
//     $("#"+colorss[crr]).fadeOut(75).fadeIn(75)
//     $(".btn").click(mainGame)
// }

// function mainGame(){
//     // let crr = rand_no_generator()
//     // real_sequence.push(crr)
//     // $("#"+colorss[crr]).fadeOut(75).fadeIn(75)
//     $(".btn").click(function(event){
//         if((event.target.id)==="green")x=1
//         if((event.target.id)==="red")x=2
//         if((event.target.id)==="yellow")x=3
//         if((event.target.id)==="blue")x=4
//         player_sequence.push(x-1)
//     })
//     check()
// }

// function check(){
//     for(let j=0;j<real_sequence.length;j++){
//         if(real_sequence[j]===player_sequence[j]){
//             count++
//         }
//     }
//     if(count===real_sequence.length){
//         for(let a=0;a<real_sequence.length;a++){
//             player_sequence.pop()
//         }
//         level++
//         $("h1").text("Level : "+level)
//         console.log("1")
//         startGame()
//     }
//     else{
//         you_lose()
//     }
// }

// function you_lose(){
//     started = false
//     $("body").css("background-color", "red")
//     $("h1").text("U losee")
//     level = 1;
//     for(let a=0;a<real_sequence.length;a++){
//         player_sequence.pop()
//         real_sequence.pop()
//     }
// }

// function rand_no_generator(){
//     return Math.floor(Math.random()*4);
// }


let colorss = ["green", "red", "yellow", "blue"];
let real_sequence = [];
let player_sequence = [];
let count = 0, level = 1;
let started = false;

$(document).keydown(() => {
    if (!started) {
        startGame();
    }
});
$(document).on('touchstart',function(){
    if (!started) {
        startGame();
    }
})

function startGame() {
    started = true;
    player_sequence = []; // Reset player's sequence
    $("h1").text("Level: " + level);
    let crr = rand_no_generator();
    real_sequence.push(crr);
    $("#"+colorss[crr]).fadeOut(75).fadeIn(75); // Show the sequence
}

$(".btn").click(function(event) {
    let clickedColor = event.target.id;
    player_sequence.push(colorss.indexOf(clickedColor)); // Get the index of the clicked color
    $("#"+clickedColor).fadeOut(75).fadeIn(75); // Show a quick visual feedback for the click
    check(player_sequence.length - 1);
});

function check(currentIndex) {
    if (player_sequence[currentIndex] === real_sequence[currentIndex]) {
        if (player_sequence.length === real_sequence.length) {
            // If the player has completed the current sequence correctly
            setTimeout(() => {
                level++;
                startGame();
            }, 1000);
        }
    } else {
        you_lose();
    }
}

function you_lose() {
    started = false;
    let loseSound = new Audio('./sounds/wrong.mp3') 
    loseSound.play()
    $("body").css("background-color", "red");
    $("h1").text("U lose!");
    level = 1;
    real_sequence = [];
    player_sequence = [];
    setTimeout(() => {
        $("body").css("background-color", "#011F3F"); // Reset background color after loss
    }, 1000);
    $("h1").text("Press a key to restart the game ")
}

function rand_no_generator() {
    return Math.floor(Math.random() * 4);
}
