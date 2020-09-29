var dogImg,happyDogImg,database,foodS,foodStock;
var dog;
var fedTime,lastFed,foodObj;
var feed,addFood;
var lastfedJSON;
var gameState;
var changingGameState,readingGameState;
var renderbedroom, rendergarden, renderwashroom;
var sadDogImg;
var currentTime;
var fedTimeref;
var fedTimeData;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  renderbedroom = loadImage("images/vpu/bedroom.png");
  rendergarden = loadImage("images/vpu/Garden.png");
  renderwashroom = loadImage("images/vpu/washroom.png");
  //sadDogImg = loadImage("images/vpu/deadDog.png");
}

function setup() {
	createCanvas(600,600);
  
  dog = createSprite(200,200,10.10);
  dog.addImage("dog",dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodObj =  new Food();


  feed = createButton("Feed the Dog");
  feed.position(700,135);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,135);
  addFood.mousePressed(addFoods)

  readingGameState = database.ref('gameState')
  readingGameState.on("value",(data) => {
     gameState = data.val();
  })

  fedTimeref = database.ref('FedTime/lastFed')
  fedTimeref.on("value", (data) => {
    fedTimeData = data.val();
  })

}


function draw() {  
  background(46, 139, 87);
  textSize(20);
  fill(0, 255, 55)
  stroke(0, 255, 55)
  strokeWeight(1)
  
  text("Bottles Remaining:" + foodS,300,200);

   fedTime = database.ref('FedTime')
   fedTime.on("value",function(data){
     lastFed = data.val();
   })

   lastFedJSON = fedTimeData
    // {lastFed: "12"} console.log(FedTime.lastFed)


  

   fill(255,255,254)
   textSize(15)
   if(lastFed>12){
     text("Last Fed:" + lastfedJSON%12,350,30) 
   } else if(lastFed==0){
     text("Last Feed : 12 AM",350,30)
   } else { 
     text("Last Fed:" + lastFedJSON,350,30)
   }

   if(gameState != "hungry"){
     feed.hide();
     addFood.hide();
    // dog.remove();
   } else { 
     feed.show();
     addFood.show();
     
   }

   currentTime = hour();
   if(currentTime == lastfedJSON+1){
    foodObj.garden();
    gameState = "playing"
    database.ref('/').update({
      gameState : "playing"
    })
   } else if(currentTime >(lastFedJSON + 2) && currentTime <= (lastFedJSON  + 4)){
     foodObj.washroom();
     gameState = "bathing";
     database.ref('/').update({
       gameState : "bathing"
     })
   } else { 
     gameState = "hungry";
     database.ref('/').update({
       gameState : "hungry"
     })
     foodObj.display();
   }
   
 

  foodObj.display();
  foodObj.getFoodStock();
  //foodObj.updateFoodStock(foodS);
  foodObj.deductFoodStock();

  drawSprites();
  
}

function feedDog(){
  dog.addImage("dog",happyDogImg);


  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 /* database.ref('/').update({
    Food : foodObj.getFoodStock()
  })*/
  database.ref('FedTime').update({
    lastFed : `${parseInt(hour())}`
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}
