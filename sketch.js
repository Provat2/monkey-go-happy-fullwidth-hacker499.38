
//declaring score state
var PLAY = 1;
var END = 0;
var gameState = PLAY;//given default gamestate

//declaring objects
var monkey, stone, food, background;

//declaring images and animations
var monkey_running, monkey_stopped, background_image, food_image, stone_image, ground;

//declaring the groups and powers
var foodGroup, stoneGroup, saver;

//declaring score 
var score;

//image loads...
function preload(){
  //loading monkey running animation
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  //loading background image
  background_image = loadImage("jungle.jpg");
  
  //loading stone image
  stone_image = loadImage("obstacle.png");
  
  //loading food image
  food_image = loadImage("banana.png");
  
}

//setting up...
function setup(){
  //creating canvas
  createCanvas(displayWidth, displayHeight);
  
  //creating the background
  // background = createSprite(0, 0, displayWidth, displayHeight);
  // background.addImage("back.img", background_image);
  // background.scale = 3;
  // //background.x = background.width/2;
  // background.velocityX = -(7 + (score/2));
  
  //creating the ground
  ground = createSprite(displayWidth/2, displayHeight-200, displayWidth, 10);
  ground.visible = true;
  
  //creating the monkey
  monkey = createSprite(displayWidth/4, displayHeight/2, 20, 20);
  monkey.addAnimation("monkey running", monkey_running);
  monkey.scale = 0.15;
  monkey.setCollider("rectangle",0,0,monkey.width, monkey.height);
  monkey.debug = true;
  
  //setting score to Zero
  score = 0;
  
  //creating groups of food and stone
  foodGroup = new Group();
  stoneGroup = new Group();
  
  
}

//drawing and repetations 
function draw(){
  background(background_image);
  textSize(20);
  fill("white");
  text("score: " + score, displayWidth-120, 170);
  
  
  if (gameState === PLAY){
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= displayHeight-265) {
        monkey.velocityY = -25;
    }    
   
    //giving gravity
    monkey.velocityY = monkey.velocityY + 0.9;
    
    //adding score if get the fruit
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score += 5;
      monkey.scale = monkey.scale + 0.02;
    }
    //spawing foods
    foods();
    //spawning stones
    stones();
    
    //loses when touches the obstacles
    if(stoneGroup.isTouching(monkey) && monkey.scale > 0.15){ 
      monkey.scale = 0.15;
      stoneGroup.destroyEach();
    }    
    if (stoneGroup.isTouching(monkey) && monkey.scale === 0.15){
      gameState = END;
    }
  }    
  if (gameState === END){
    //stopped the movement of stones
    stoneGroup.setVelocityXEach(0);
    //stops from disappering 
    stoneGroup.setLifetimeEach(-1);
     
    //stopped the movement of foods
    foodGroup.setVelocityXEach(0);
    //stops from disappering 
    foodGroup.setLifetimeEach(-1);
    //stopping monkey jump
    monkey.velocityY = 0;
    
    //stopping restart option and game over shown
    textSize(20);
    text("Press 'r' to restart", 100, displayHeight/4);
    textSize(40);
    text("GAME OVER", displayWidth/2, displayHeight/2);
    
    //reset option
    if (keyDown("r")){
      gameState = PLAY;
      stoneGroup.destroyEach();
      foodGroup.destroyEach();
      score = 0;
    }
  }
  
  //drawing sprites...
  drawSprites();
  
  monkey.collide(ground);
}
//creating stones
function stones(){
  if (frameCount % 120 === 0){
    stone = createSprite(displayWidth, displayHeight-243, 10, 10);//creating
    stone.addImage("stone image", stone_image);//adding image
    stone.scale = 0.2 ;//scaling
    
    stone.velocityX = -(7 + (score/2));//velocity
    stone.lifetime = 600;//lifetime    
    
    stoneGroup.add(stone);//adding to groups
  }
}

//creating food
function foods(){
  if (frameCount % 170 === 0) {
    food = createSprite(displayWidth, displayHeight-248, 10, 10);//creating
    food.addImage(food_image);//adding image
    food.scale = 0.1;//scaling 
    
    food.velocityX = -(7 + (score/2));//velocity
    food.lifetime = 600;//lifetime
    
    foodGroup.add(food);//adding to groups
  }
}





