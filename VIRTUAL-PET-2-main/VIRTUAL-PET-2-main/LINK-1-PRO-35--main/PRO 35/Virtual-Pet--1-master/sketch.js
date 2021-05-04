var dog,dogimg,dogHappy,foodStock,foods;
var bedroom1, livingroom, washroom1, garden1;
var database;
var food1;
var Feedpet, Addfood;
var takebath, play, garde, sleepy;
var feedTime, lastFed;
var foodObj
var b, w, l, p

function preload(){
dogimg = loadImage("Dog.png");
dogHappy = loadImage("happydog.png");
bedroom1 = loadImage("Bed Room.png")
garden1 = loadImage("Garden.png")
washroom1 = loadImage("Wash Room.png")
livingroom1 = loadImage("Living Room.png")
}

function setup() {
  createCanvas(500, 550);
  
  
  dog = createSprite(250,300,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  

  foodObj = new Food();


  feedPet = createButton("Feed the Dog");
  feedPet.position(390, 125);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(495, 125);
  addFood.mousePressed(addFoods);

  takebath = createButton("I want to take bath")
  takebath.position(575, 125)
  takebath.mousePressed(washroom)

  play = createButton("Let's play")
  play.position(705, 125)
  play.mousePressed(livingroom)

  garde = createButton("Let's play in garden")
  garde.position(455, 175)
  garde.mousePressed(garden)

  sleepy = createButton("I am sleepy")
  sleepy.position(625, 175)
  sleepy.mousePressed(bedroom)
 
}


function draw() {
  background(46,139,87); 
  


  foodObj.display()

  fedTime = database.ref("Feed Time");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  drawSprites();
  fill("black")
  textSize(30);
  text("food remaining: "+foods,150,500);
  
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 15;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}

function addFoods() {
  foods++;
  database.ref('/').update({
    Food: foods
  });
}

function feedDog() {
  foods = foods - 1;
dog.addImage(dogHappy);
  database.ref('/').update({
    Food: foods
  });

}

function bedroom(){
  b = createSprite(275, 250)
  b.addImage(bedroom1)
  database.ref('/').update({
    Food: foods
  });
}

function garden(){
  p = createSprite(275, 250)
  p.addImage(garden1)
  database.ref('/').update({
    Food: foods
  });
 
} 

function washroom(){
  w = createSprite(275, 250)
  w.addImage(washroom1)
  database.ref('/').update({
    Food: foods
  });
}

function livingroom(){
  l = createSprite(275, 250)
  l.addImage(livingroom1)
  database.ref('/').update({
    Food: foods
  });
}

