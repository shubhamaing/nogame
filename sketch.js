var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacles, obstacleImage, backImg;
var restartImg, gameOverImg, jumpSound, dieSound;
var restart, gameOvers;
var ground;
var foodGroup, obstacleGroup;
var score = 0 ,scoreB = 0,ivisiGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backImg = loadImage("back4.png");
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
 
}



function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  background = createSprite(70,70,500,400);
  background.scale = 4;
  background.addImage("background1",backImg);
  
  monkey = createSprite(50,320,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(0,350,1100,7);
  ground.color= "red";
  ground.visible = false;

  invisiGround = createSprite(0,352,1100,7);
  invisiGround.visible = false;
  
  restart = createSprite(width-350,300,30,30);
  restart.addImage(restartImg);
  
  gameOvers = createSprite(width-350,200,30,30);
  gameOvers.addImage(gameOverImg);
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  
    background.velocityX = -3 

  if (background.x < 0){
      background.x = background.width/2;
    }
  
    if(gameState === PLAY){
        restart.visible = false;
        gameOvers.visible= false;
        bananas();
        obstacles();
      if(touches.length > 0|| keyDown("space")&& monkey.y >=300){
        touches = [];
        monkey.velocityY = -13;
        jumpSound.play();
      }
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisiGround);
  
  score = Math.round(frameCount/frameRate());
  
  if(monkey.isTouching(obstacleGroup)){
    dieSound.play();
    gameState = END;
  }
  
  if(monkey.isTouching(foodGroup)){
    scoreB = scoreB+1;
    foodGroup.destroyEach();
  }
  
  if(gameState === END){
      gameOver();
  }
  
  if(touches.length > 0 || mousePressedOver(restart)){
    touches = [restart];
    reset();
  }
  
  drawSprites();
  textSize(20);
  let c = color('magenta');
  fill(c)
  text("Survival Time : " + score,width-200,40);
  text("Bananas : "+ scoreB,width-600,40);
  textSize(30);
  let d = color('blue');
  fill(d);
  text("Lost Monkey",width-450,70);
  
}

function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(520,Math.round(random(200, 300)), 50, 50 )
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-5;           
    foodGroup.add(banana);
  }
}
  
function obstacles(){
    if(frameCount%90 === 0){
      obstacle = createSprite(520,330,50,50);
      obstacle.addImage("obstacle",obstaceImage);
      obstacle.scale = 0.1;
      obstacle.velocityX = -6;  
      obstacleGroup.add(obstacle);
    }
  }

function reset(){
    gameState = PLAY;
    score = 0;
    monkey.visible = true;
}

function gameOver(){
  monkey.visible = false;
  banana.visible = false;
  obstacle.visible = false;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  background.velocityX = 0;
  restart.visible=true;
  gameOvers.visible =true;
  
}

  







