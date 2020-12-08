function Furry(){
    this.x = 0;
    this.y = 0;
    this.direction ="right";
}

function Coin(){
    this.x = Math.floor(Math.random()*10);
    this.y =  Math.floor(Math.random()*10);
}

function Game(){
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y){
        return x + (y*10);
    }
    this.showFurry = function(){
        if(document.querySelector('.furry') != null){
            this.hideVisibleFurry();
        }
        this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
    }
    this.showCoin = function(){
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }
    var self = this;
    this.startGame = function(){
        this.idSetInterval = setInterval(function(){
           self.moveFurry(); },250);
    }
    this.moveFurry = function(){
        if(this.furry.direction === "right"){
            this.furry.x = this.furry.x + 1;
        }else if(this.furry.direction === "left"){
            this.furry.x = this.furry.x - 1;
        }else if(this.furry.direction === "up"){
            this.furry.y = this.furry.y - 1;
        }else if(this.furry.direction === "down"){
            this.furry.y = this.furry.y + 1;
        }
        this.showFurry();
        this.checkCoinCollision();
        this.gameOver(); 

    }
    this.hideVisibleFurry= function(){
        document.querySelector('.furry').classList.remove('furry');
    }
    this.turnFurry = function(event){
    switch (event.which){
        case 37 : this.furry.direction = 'left';
        break;
        case 38 : this.furry.direction = 'up';
        break;
        case 39: this.furry.direction = 'right';
        break;
        case 40 : this.furry.direction = 'down';
        break;
        }
    }
    document.addEventListener('keydown', function(event){
        self.turnFurry(event);
    });
    this.checkCoinCollision = function(){
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
          document.querySelector('.coin').classList.remove('coin');
          this.score++
          document.querySelector('#score strong').innerText = this.score;
          this.coin = new Coin();
          this.showCoin();
        }
      }
      this.gameOver = function(){
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval)
            this.hideVisibleFurry()
            document.querySelector('#over').classList.remove('invisible');
            document.querySelector('#over strong').innerText = this.score;
        }
      }
}

var play = new Game;
play.showCoin()
play.showFurry()
play.startGame()