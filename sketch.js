var tower,towerImage;
 var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invivsibleblock,invisibleGroup;
var gameState="PLAY";



function preload()
{
  //loading image
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  ghostsound=loadSound("spooky.wav");
}
function setup()
{
  createCanvas(600,600);
  
  ghostsound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=2;
  tower.scale=0.9;
  
  ghost=createSprite(300,300,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleGroup=new Group();
  
  
}
function draw()
{
  background(0);
  
   drawSprites();
  
  if (gameState==="PLAY")
  {
    
  
  
  //making the tower move infinet
  if (tower.y>400)
  {
    tower.y=300;
  }
  
  if (keyDown("space"))
  {
    ghost.velocityY=-5;
  }
  //giving gravity
  ghost.velocityY=ghost.velocityY+0.8
  
  if (keyDown("left"))
    {
      ghost.x=ghost.x-5;
      
    }
  
  if (keyDown("right"))
    {
      ghost.x=ghost.x+5;
    }
  
  if (climberGroup.isTouching(ghost))
    {
      ghost.velocityY=0;
    }
  if (invisibleGroup.isTouching(ghost)||ghost.y>600){
    gameState="END";
  }
    
  
  //calling
  spawndoors();
  }
  
  else if(gameState==="END")
  {
    tower.velocityY=0;
    ghost.destroy();
    
    fill("black");
    textSize(30);
    text("GAMEOVER",300,300);
    
    
  }
  
 
}
function spawndoors()
{
  if(frameCount%200===0)
  {
    door=createSprite(200,-50);
    door.addImage(doorImage);
    
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    
    invisibleblock=createSprite(200,15);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    invisibleblock.velocityY=2;
    
    
    climber.velocityY=2;
    door.velocityY=2;
    
    door.x=Math.round(random(100,400));
    climber.x=door.x;
    invisibleblock.x=door.x;
    
    
    
    climber.lifetime=700;
    door.lifetime=700;
    invisibleblock.lifetime=700;
    
    climberGroup.add(climber);
    doorGroup.add(door);
    invisibleGroup.add(invisibleblock);
    
    //making the ghost to come front of door
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
  }
  
}