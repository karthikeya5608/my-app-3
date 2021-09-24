class spirit {
  constructor() {
    var options = {
      isStatic: false
    }
    this.body = Bodies.rectangle(options);
    this.body.fire = loadImage("utility_images/fire_spirit.png");
    this.body.water = loadImage("utility_images/water_spirit.png");
    this.body.land = loadImage("utility_images/land_sprit.png");
    this.body.air = loadImage("utility_images/air_spirit.png");
    this.body.space = loadImage("utility_images/space_spirit.png");
    World.add(world, this.body);
  }
  display(element, posX,posY ) {

    switch (element) {
      case "fire":
        imageMode("center");
        image(this.body.fire, posX, posY, 115, 96);
        break;
      case "water":
        imageMode("center");
        image(this.body.water, posX, posY, 115, 96);
        break;
      case "land":
        imageMode("center");
        image(this.body.land, posX, posY, 115, 96);
        break;
      case "air":
        imageMode("center");
        image(this.body.air, posX, posY, 115, 96);
        break;
      case "space":
        imageMode("center");
        image(this.body.space, posX, posY, 150, 150);
        break;
    }
  }
}

/*if (creator_pixie.isTouching(player)) {
    creator_pixie.velocityX = 0;
    creator_pixie.velocityY = 0;
  } else {
    if (player.y - 50 > creator_pixie.y) {
      creator_pixie.velocityY = 2;
    } else if (player.y < creator_pixie.y) {
      creator_pixie.velocityY = -1.5;
    }
    if (player.x > creator_pixie.x) {
      creator_pixie.velocityX = 2;
    } else if (player.x < creator_pixie.x) {
      creator_pixie.velocityX = -2;
    }
  }
  
  creator_pixie.collide(player);
  
  creator_pixie_image = loadImage("utility_images/creator_pixie_image.png")*/