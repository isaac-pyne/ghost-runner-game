var tower,towerImage;

var gamestate = "play";

var door,doorImage,doorGroup;

var climber, climberImage, climberGroup;

var ghost, ghostImg;

var invisibleBlockGroup, invisibleBlock;

var spookySound;

function preload() {
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");

  climberImage =loadImage("climber.png");

  ghostImg = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");
}
function setup() {
  createCanvas(600,600);
  
  spookySound.loop();

  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  doorGroup = new Group();
  climberGroup =  new Group();
  invisibleBlockGroup = new Group();
}
function draw() {
  background(0);
  
  if(gamestate === "play"){
    if(tower.y > 400 ){
      tower.y = 300;
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if(keyDown("space")){
      ghost.velocityY = -10;
    }    
    ghost.velocityY = ghost.velocityY + 0.8;

    spawnDoors();

    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gamestate = "end"
    }

    drawSprites();
  }
  if (gamestate === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

  

}
function spawnDoors(){
  if(frameCount %240 === 0){
    door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImage);
    door.velocityY = 1;
    door.lifetime = 800;
    doorGroup.add(door);

    climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGroup.add(climber);

    door.depth = ghost.depth;
    ghost.depth += 1; //ghost.depth = ghost.depth + 1

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}

