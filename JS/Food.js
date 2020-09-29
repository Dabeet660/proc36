class Food{
    constructor(){
        this.image = loadImage("images/milk.jpg");
        this.foodStock = foodS;
        this.lastFed;
    }
    getFoodStock(){
      var foodStockref = database.ref('Food');
      foodStockref.on("value",function(data){
          foodS = data.val();
      })

    }

    getFedTime(lastFed){
      var fedTimeref = database.ref('FedTime/lastFed');
      fedTimeref.on("value", (datafed) => {
        this.lastFed = datafed.val();
      })
    }

    /*updateFoodStock(x){
        database.ref('Food').update({
          Food : parseInt(x)
      })
    }*/

    deductFoodStock(x){
        if(x<=0){
            x = 0
          } else {
            x = x - 1
          }
    }

    bedroom(){
      background(renderbedroom,600,600);
    }

    garden(){
     background(rendergarden,600,600);
    }

    washroom(){
      background(renderwashroom,600,600);
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }

    }
}