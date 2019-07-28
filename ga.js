let generation = 0;

function nextGeneration() {

    calculateFitness();
    generation++;

    for (let i = 0; i < TOTAL; i++) {
        players[i] = pickOne();
    }
    savedPlayers = [];
}



function calculateFitness() {
    let sum = 0;
    for (let player of savedPlayers) {
        sum += player.score;
    }

    for (let player of savedPlayers) {
        player.fitness = player.score / sum;
    }
}


function pickOne() {
    let index = 0;

    let r = random(1);
  
    while (r > 0) {
      r -= savedPlayers[index].fitness;
      
      index += 1;
    }

    index -= 1;

    let player = savedPlayers[index];
    let child = new Player(player.brain);
    return child;


  }

