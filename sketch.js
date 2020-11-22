var dog, happyDog, foodS, foodstock, database, Dogsprite
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload(){

  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  Dogsprite = createSprite(300,300);
  Dogsprite.addImage(dog);
  Dogsprite.scale = 0.5

  database = firebase.database()
  foodstock = database.ref("food");
  foodstock.on("value", readStock);

  feedPet = createButton("Feed the dog")
  feedPet.position(100,100)
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add the food")
  addFood.position(150,150)
    
  foodObj = new Food()
}


function draw() {  
  background(46,139,87)

  //if (keyWentDown(UP_ARROW)){
   //foodS = foodS-1
  //writeStock(foodS);
  //Dogsprite.addImage(happyDog);
  //}

  drawSprites();
  textSize(20);
  fill("white")
  text("press upArrow to feed rex milk!", 50, 50);
  if (foodS !== undefined){
    text("remaining food:"+foodS, 50, 100)
  }

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last feed: "+ lastFed%12 + " PM", 350,30)
  }else if(lastFed==0){
    text("last feed: 12 AM", 350,30)
  }else{
    text("last feed: "+ lastFed + " AM", 350,30)
  }
  

  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  foodObj.display()
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function addFoods(){
  addFood.mousePressed(()=>{
    foodstock = foodObj+1;
  })
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodDtock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


