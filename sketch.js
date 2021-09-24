const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
var player, playeridle, playerrun, playerjump, playerhealth = 100,
  playerdeath,
  playerattack1, playerattack2, playerattack3, pleyerattackArea,
  imagestate = "left",
  tutorialstate = "run",
  menu_opened = false,
  retry, ground, bg,
  furnace, furnace_menu, furnaceopened = false,
  inventory, furnace_item_slot, furnace_fuel_slot,
  emptyslot_image, oreslot_image, coalslot_image, slot3,
  slot1_content = "empty",
  slot2_content = "empty",
  slot3_content = "empty",
  furnace_item_slot_value = 0,
  furnace_fuel_slot_content = "empty",
  slot1_selected = true,
  slot2_selected = false,
  slot3_selected = false,
  furnace_item_slot_content = "empty",
  furnace_fuel_slot_value = 0,
  slot_selected = 0,
  slot1_value = 0,
  slot2_value = 0,
  slot3_value = 0,
  burnable_items = ["ore"],
  fuels = ["coal"],
  ore, ore_image,
  story, storybox_image, story_isrunning = true,
  spacespellImage1, spacespellImage2,
  spacespells, playerx = 0,
  playery = 0,
  space_spell_number = 1,
  spelltimer = 0,
  playerspell_cast, playerspell_cast_loop, spell_type = "",
  spellNo = 0,
  firespell1, firespell2, fire_spell_number = 1,
  firespellImage2,
  firespellImage1, spelleffect, waterspell_effect, firespell_effect,
  simple_enemy, simple_enemy_health = 1000,
  spacespell_delay = 5,
  fire_spell_2_timer = 0,
  firespell2_delay = 3,
  firespell1_delay = 2,
  airspell1, airspell2, airspell1image, airspell2image,
  airspell1_damage = 10,
  airspell2_delay, airspell_number = 1,
  landspell1,
  landspell2, landspell_number = 1,
  airspell1_charged = false,
  landspell1_image,
  landspell1_health = 0,
  waterspelltimer = 0,
  firebg, place = 0,
  oceanbg, landbg, spacebg, airbg, space_unlocked = true,
  air_unlocked = true,
  water_unlocked = true,
  fire_unlocked = true,
  land_unlocked = true,
  enemyidle,enemyrun,enemyattack,gamestate="running",Images,Images2,enemy_sense,
  enemyattack_timer=0;


function preload() {
  bg = loadImage("forestDay.png")
  playeridle = loadAnimation("movement/adventurer-idle-00.png", "movement/adventurer-idle-01.png",
    "movement/adventurer-idle-02.png", "movement/adventurer-idle-03.png");
  playerrun = loadAnimation("movement/adventurer-run-00.png", "movement/adventurer-run-01.png", "movement/adventurer-run-02.png", "movement/adventurer-run-03.png", "movement/adventurer-run-04.png", "movement/adventurer-run-05.png")
  //playerjump = loadAnimation("movement/adventurer-jump-00.png", "movement/adventurer-jump-01.png", "movement/adventurer-jump-02.png", "movement/adventurer-jump-03.png", "movement/adventurer-fall-00.png", "movement/adventurer-fall-01.png")
  playerdeath = loadAnimation("movement/adventurer-die-00.png", "movement/adventurer-die-01.png", "movement/adventurer-die-02.png", "movement/adventurer-die-03.png", "movement/adventurer-die-04.png", "movement/adventurer-die-05.png", "movement/adventurer-die-06.png");
  playerhurt = loadAnimation("movement/adventurer-hurt-00.png")
  // playerattack1 = loadAnimation("movement/adventurer-attack1-00.png", "movement/adventurer-attack1-01.png", "movement/adventurer-attack1-02.png", "movement/adventurer-attack1-03.png", "movement/adventurer-attack1-04.png");
  // playerattack2 = loadAnimation("movement/adventurer-attack2-00.png", "movement/adventurer-attack2-01.png", "movement/adventurer-attack2-02.png", "movement/adventurer-attack2-03.png", "movement/adventurer-attack2-04.png", "movement/adventurer-attack2-05.png");
  // playerattack3 = loadAnimation("movement/adventurer-attack3-00.png", "movement/adventurer-attack3-01.png", "movement/adventurer-attack3-02.png", "movement/adventurer-attack3-03.png", "movement/adventurer-attack3-04.png", "movement/adventurer-attack3-05.png");
  // enemyimage =loadImage("druid/ezgif.com-gif-maker.gif");
  // creator_pixie = createImg("druid/ezgif.com-gif-maker.gif");
  furnaceImage = loadImage("utility_images/furnace_image.png")
  furnace_menu_image = loadImage("utility_images/furnace_menu_image.png")
  inventory_image = loadImage("utility_images/inventory_image.png")
  emptyslot_image = loadImage("utility_images/emptyslot_image.png");
  oreslot_image = loadImage("utility_images/ore_slot_image.png")
  ore_image = loadImage("utility_images/ore_piece_image.png");
  coalslot_image = loadImage("utility_images/single_fuel_image.png");
  storybox_image = loadImage("utility_images/player_story_box_image.png");
  spacespellImage1 = loadImage("utility_images/space_spell_1.png");
  spacespellImage2 = loadImage("utility_images/space_spell_2.png")
  playerspell_cast = loadAnimation("movement/adventurer-cast-00.png", "movement/adventurer-cast-01.png", "movement/adventurer-cast-02.png", "movement/adventurer-cast-03.png")
  playerspell_cast_loop = loadAnimation("movement/adventurer-cast-loop-00.png", "movement/adventurer-cast-loop-01.png", "movement/adventurer-cast-loop-02.png", "movement/adventurer-cast-loop-03.png")
  waterspell_effect = loadImage("utility_images/player_water_effect.png")
  firespell_effect = loadImage("utility_images/fire_effect.png")
  firespellImage1 = loadImage("utility_images/fire_spell_1.png")
  firespellImage2 = loadImage("utility_images/fire_spell_2.png")
  airspell1image = loadImage("utility_images/rasengan.png")
  landspell1_image = loadImage("utility_images/landspell1.png")
  firebg = loadImage("utility_images/firebg.jpg")
  oceanbg = loadImage("utility_images/ocean.jpg")
  landbg = loadImage("utility_images/landbg.png")
  spacebg = loadImage("utility_images/astral.jpg")
  airbg = loadImage("utility_images/airbg.jpg")
 // enemyidle=loadAnimation("enemy/idle1.png","enemy/idle2.png","enemy/idle3.png","enemy/idle4.png","enemy/idle5.png","enemy/idle6.png",)
 enemyidle=loadAnimation("enemy/output-onlinegiftools (1).png","enemy/output-onlinegiftools (2).png","enemy/output-onlinegiftools (3).png","enemy/output-onlinegiftools (4).png","enemy/output-onlinegiftools (5).png","enemy/output-onlinegiftools (6).png","enemy/output-onlinegiftools (7).png","enemy/output-onlinegiftools (8).png","enemy/output-onlinegiftools (9).png",)
 Images=loadImage("utility_images/END.png")
 Images=loadImage("utility_images/LOSE.png") 
 enemyattack=loadAnimation("enemy/output-onlinegiftools (10).png","enemy/output-onlinegiftools (11).png","enemy/output-onlinegiftools (12).png","enemy/output-onlinegiftools (13).png","enemy/output-onlinegiftools (14).png","enemy/output-onlinegiftools (15).png","enemy/output-onlinegiftools (16).png","enemy/output-onlinegiftools (17).png","enemy/output-onlinegiftools (18).png")
}

function setup() {
  var canvas=createCanvas(windowWidth, windowHeight - 5);

  engine = Engine.create();
  world = engine.world;

  ground = createSprite(windowWidth/2,windowHeight, 10000, 20);
  ground.visible = true;
  ground.shapeColor = "brown";
  //ground.setCollider("rectangle",0,0,895,20);
  player = createSprite(700, 200, 10, 10);
  player.setCollider("rectangle", 0, 0, 15, 35);
  player.addAnimation("idle", playeridle);
  player.scale = 2.35;
  // player.velocityY=4;

  playerinteractionArea = createSprite(15, 20, 50, 60)
  playerinteractionArea.visible = false;

  // furnace = createSprite(500, 550, 60, 70);
  // furnace.addImage(furnaceImage);
  // furnace.scale = 0.60;
  // furnace.setCollider("rectangle", 0, 0, 100, 175);

  // ore = createSprite(204, 564, 20, 30)
  //ore.addImage(ore_image)

  furnace_menu = createSprite(windowWidth / 2, windowHeight / 2, 0, 0);
  furnace_menu.addImage(furnace_menu_image);
  furnace_menu.visible = false;

  //furnace_fuel_slot = createSprite(furnace_menu.x - 250, furnace_menu.y + 160, 0, 0);
  //furnace_fuel_slot.addImage(emptyslot_image);
  // furnace_fuel_slot.visible = false;
  //furnace_item_slot = createSprite(furnace_menu.x - 250, furnace_menu.y - 105, 0, 0);
  //furnace_item_slot.addImage(emptyslot_image);
  //furnace_item_slot.visible = false;

  //slot1 = new Slot(372, 75, 0, 0);
  //slot2 = new Slot(514.5, 75, 0, 0);
  //slot3 = new Slot(655, 75, 0, 0);

  // mainslot = createSprite(900, 75, 0, 0);
  // mainslot.addImage(emptyslot_image)
  // mainslot.scale = 0.75;

  inventory = createSprite(513, 72, 0, 0);
  inventory.addImage(inventory_image);
  //inventory.scale = 0.5;
  inventory.visible = false;

  story = createSprite(windowWidth / 2, ground.y - 100, 10, 10);
  story.addImage(storybox_image)
  story.visible = false;

  simple_enemy = createSprite(100, 100, 60, 140);
  simple_enemy.addAnimation("enemy",enemyidle);
  simple_enemy.setCollider("rectangle",0,0,80,130)
  simple_enemy.scale=1.5;

  spacespells = createSprite(0, 0, 0, 0)
  spacespells.addImage(spacespellImage1)
  spacespells.visible = false;


  firespell2 = createSprite(100, 100, 0, 0)
  firespell2.addImage(firespellImage2);
  firespell2.visible = false;
  firespell2.setCollider("rectangle", 0, 0, 60, 600)

  airspell1 = createSprite(0, 0, 50, 50)
  airspell1.addImage(airspell1image)
  airspell1.scale = 0.1;
  airspell1.visible = false;

  airspell2 = createSprite(0, 0, 100, 50)
  airspell2.visible = false;

  landspell1 = createSprite(120, 120, 0, 0)
  landspell1.setCollider("circle", 0, 0, 130)
  landspell1.addImage(landspell1_image)
  landspell1.visible = false;

  spelleffect = createSprite(0, 0, 1, 1);

  end=createSprite(windowWidth/2,windowHeight/2,100,100);
  end.visible=false;

  enemy_sense=createSprite(0,0,300,100);
  enemy_sense.visible=false;

  element = new spirit();
}

function draw() {
  switch (place) {
    case 0:
      background(bg);
      break;
    case 1:
      background(spacebg);
      break;
    case 2:
      background(airbg);
      break;
    case 3:
      background(landbg);
      break;
    case 4:
      background(oceanbg);
      break;
    case 5:
      background(firebg);
      break;
  }
if(gamestate==="running"){

  Engine.update(engine);

  enemy_sense.debug = true;

  spelleffect.x = player.x;
  spelleffect.y = player.y;
  //console.debug(slot1.x)

  /*camera.position.x=player.x+200;
  camera.position.y=player.y-200;
  camera.position.z=-200;
  camera.position.x = player.x+200;
  camera.position.y = player.y;*/
  //if(story_isrunning===false){
  if (keyDown(UP_ARROW) && player.isTouching(ground)) {
    player.velocityY = -10;
  } else {
    player.collide(ground);
    player.velocityY = player.velocityY + 0.8;
  }

  playerinteractionArea.y = player.y;

  if (imagestate === "right") {
    playerinteractionArea.x = player.x - 40;
  } else if (imagestate === "left") {
    playerinteractionArea.x = player.x + 40;
  }

  if (menu_opened === true) {
    player.velocityX = 0;
    player.velocityY = 0;
  }

  simple_enemy.collide(ground);
  simple_enemy.collide(player);
  enemy_sense.x=simple_enemy.x;
  enemy_sense.y=simple_enemy.y;
  simple_enemy.velocityY = simple_enemy.velocityY + 0.8;

  if(enemy_sense.isTouching(player)&&enemyattack_timer===0){
    simple_enemy.addAnimation("enemy",enemyattack);
    enemyattack_timer=1;
  }

  if (player.x > simple_enemy.x&&enemyattack_timer===0) {
    simple_enemy.velocityX = 2;
  } else if (player.x < simple_enemy.x&&enemyattack_timer===0) {
    simple_enemy.velocityX = -2;
  }else{
    simple_enemy.velocityX=0;
  }

  if(enemyattack_timer>=37){
    enemyattack_timer=0;
    simple_enemy.addAnimation("enemy",enemyidle)
  }

  if(enemyattack_timer===27&&enemy_sense.isTouching(player)&&landspell1_health<=0){
    playerhealth=playerhealth-8
  }else if(enemyattack_timer===27&&enemy_sense.isTouching(player)&&landspell1_health>0){
    landspell1_health=landspell1_health-2;
  }

  if (spelltimer === 0) {
    if (keyWentDown("c") && spellNo >= 1) {
      spellNo = spellNo - 1;
    } else if (keyWentDown("v") && spellNo < 5) {
      spellNo = spellNo + 1;
    }
    switch (spellNo) {
      case 1:
        if (space_unlocked === true) {
          spell_type = "space";
        }
        break;
      case 2:
        if (air_unlocked === true) {
          spell_type = "air"
        }
        break;
      case 3:
        if (land_unlocked === true) {
          spell_type = "land"
        }
        break;
      case 4:
        if (water_unlocked === true) {
          spell_type = "water"
        }
        break;
      case 5:
        if (fire_unlocked === true) {
          spell_type = "fire"
        }
        break;
    }
  }


  if (simple_enemy_health <= 0) {
    gamestate="end";
    end.addImage(Images);
    end.visible=true;
    simple_enemy.velocityX=0;
  }
  if (playerhealth <= 0) {
    gamestate="end";
    end.addImage(Images);
    end.visible=true;
  }

  if(player.x<=0){
    player.x=windowWidth-10;
    simple_enemy.mirrorX(simple_enemy.mirrorX() * -1);
  }else if(player.x>=windowWidth){
    player.x=0+10;
    simple_enemy.mirrorX(simple_enemy.mirrorX() * -1);
  }

  Playerright();
  Playerleft();
  /* FurnaceWork();
    SlotContainer();
    if (playerinteractionArea.isTouching(ore) && keyWentDown("z")) {
      OreCrystal_extraction();
    }
    if (keyWentDown("x")) {
      coal_genetartion();
    }
   SlotDumper();*/
  spacespell();
  firespell();
  airspell();
  landspell();
  waterspell();
  timerstart();

  console.debug(playerhealth)

  fill("white")
  text("HEALTH=" + playerhealth, player.x - 20, player.y - 50)
  text("HEALTH=" + simple_enemy_health, simple_enemy.x - 20, simple_enemy.y - 80)
 // text("element selected=" + spell_type, 100, 100)
  if (landspell1_health > 0) {
    text("sheild=" + landspell1_health, landspell1.x, landspell1.y - 150)
  }
  // slot2.display(slot2_selected);
  // slot3.display(slot3_selected);
}else if(gamestate==="end"){
  if(keyWentDown(ENTER)){
    gamestate="running"
    simple_enemy_health=1000;
    simple_enemy.y=50;
    simple_enemy.x=0;
    player.x=600;
    player.y=30;
    spelltimer=0;
    player.addAnimation("idle",playeridle);
    playerhealth=100;
    end.visible=false;
  }
}
  drawSprites();
  element.display(spell_type, player.x, player.y - 100);
}


function Playerright() {
  /*  if (keyDown(RIGHT_ARROW)) 
    {
     player.x=player.x+4;
    } */

  if (keyWentDown(RIGHT_ARROW) && imagestate === "right") {
    player.mirrorX(player.mirrorX() * -1);
    imagestate = "left";
  }
  if (spelltimer === 0 && landspell1_health === 0) {
    if (keyWentDown(RIGHT_ARROW)) {
      player.velocityX = 4.5;
      player.addAnimation("idle", playerrun);
    }

    if (keyWentUp(RIGHT_ARROW) && keyDown(LEFT_ARROW)) {
      player.velocityX = -4.5;
      player.addAnimation("idle", playerrun);
      if (imagestate === "left") {
        player.mirrorX(player.mirrorX() * -1);
        imagestate = "right";
      }
    }
  }
  if (keyWentUp(RIGHT_ARROW)) {
    player.velocityX = 0;
    player.addAnimation("idle", playeridle)
    /*   if(keyDown(LEFT_ARROW)){
           player.addAnimation("idle",playerrun);
          }*/
  }
}

function Playerleft() {
  /*   if (keyDown(LEFT_ARROW)) 
     {
        player.x=player.x-4;
     }*/

  if (keyWentDown(LEFT_ARROW) && imagestate === "left") {
    player.mirrorX(player.mirrorX() * -1);
    imagestate = "right";
  }
  if (spelltimer === 0 && landspell1_health === 0) {
    if (keyWentDown(LEFT_ARROW)) {
      player.velocityX = -4.5;
      player.addAnimation("idle", playerrun);
    }

    if (keyWentUp(LEFT_ARROW) && keyDown(RIGHT_ARROW)) {

      player.velocityX = 4.5;
      player.addAnimation("idle", playerrun);
      if (imagestate === "right") {
        player.mirrorX(player.mirrorX() * -1);
        imagestate = "left";
      }
    }
  }
  if (keyWentUp(LEFT_ARROW)) {
    player.velocityX = 0;
    player.addAnimation("idle", playeridle);
    /*     if(keyDown(RIGHT_ARROW))
       {
        player.addAnimation("idle",playerrun);
       }*/
  }
}

async function FurnaceWork() {
  if (furnaceopened === true) {
    fill("black")
    text("HI KARTHIKEYA", furnace_menu.x, furnace_menu.y)
  }
  if (playerinteractionArea.isTouching(furnace) && keyWentDown("e") && furnaceopened === false) {
    furnace_menu.visible = true;
    furnaceopened = true;
    menu_opened = true;
    furnace_fuel_slot.visible = true;
    furnace_item_slot.visible = true;
  } else if (keyWentDown("e") && furnaceopened === true) {
    furnace_menu.visible = false;
    furnaceopened = false;
    menu_opened = false;
    furnace_fuel_slot.visible = false;
    furnace_item_slot.visible = false;
  }

  if (keyWentDown("a") && furnaceopened === true) {
    if (slot1_selected === true) {
      if (slot1_content === "ore") {
        furnace_item_slot_value = furnace_item_slot_value + slot1_value;
        furnace_item_slot_content = slot1_content;
        slot1_value = 0;
      }
    } else if (slot2_selected === true) {
      if (slot2_content === "ore") {
        furnace_item_slot_value = furnace_item_slot_value + slot2_value;
        furnace_item_slot_content = slot2_content;
        slot2_value = 0;
      }
    } else if (slot3_selected === true) {
      if (slot3_content === "ore") {
        furnace_item_slot_value = furnace_item_slot_value + slot3_value;
        furnace_item_slot_content = slot3_content;
        slot3_value = 0;
      }
    }
  }
  if (keyWentDown("f") && furnaceopened === true) {
    if (slot1_selected === true && slot1_content === "coal") {
      furnace_fuel_slot_value = furnace_fuel_slot_value + slot1_value;
      furnace_fuel_slot_content = slot1_content;
      slot1_value = 0;
    } else if (slot2_selected === true && slot2_content === "coal") {
      furnace_fuel_slot_value = furnace_fuel_slot_value + slot2_value;
      furnace_fuel_slot_content = slot2_content;
      slot2_value = 0;
    } else if (slot3_selected === true && slot3_content === "coal") {
      furnace_fuel_slot_value = furnace_fuel_slot_value + slot3_value;
      furnace_fuel_slot_content = slot3_content;
      slot3_value = 0;
      furnace_fuel_slot.addImage(coalslot_image)
    }
  }

  if (playerinteractionArea.isTouching(furnace)) {
    fill("white")
    text("press E to interact", furnace.x - 35, furnace.y - 60);
  }
}

function SlotContainer() {
  if (keyWentDown("1")) {
    slot_selected = 1;
  } else if (keyWentDown("2")) {
    slot_selected = 2;
  } else if (keyWentDown("3")) {
    slot_selected = 3;
  }


  switch (slot_selected) {
    case 1:
      slot1_selected = true;
      slot2_selected = false;
      slot3_selected = false;
      break;
    case 2:
      slot1_selected = false;
      slot2_selected = true;
      slot3_selected = false;
      break;
    case 3:
      slot1_selected = false;
      slot2_selected = false;
      slot3_selected = true;
      break;
  }
  /*if (slot1_value === 10) {
    fill("white")
    text("You are full", slot1.x - 30, slot1.y + 100)
  } else {
    fill("white")
    text("item =" + slot1_value, slot1.x - 30, slot1.y + 100)
  }
  if (slot2_value === 10) {
    fill("white")
    text("You are full", slot2.x - 30, slot2.y + 100)
  } else {
    fill("white")
    text("item =" + slot2_value, slot2.x - 30, slot2.y + 100)
  }
  if (slot3_value === 10) {
    fill("white")
    text("You are full", slot3.x - 30, slot3.y + 100)
  } else {
    fill("white")
    text("item =" + slot3_value, slot3.x - 30, slot3.y + 100)
  }*/
}


function spacespell() {
  if (spell_type === "space") {
    if (keyWentDown("1") && spelltimer === 0) {
      space_spell_number = 1;
    } else if (keyWentDown("2") && spelltimer === 0) {
      space_spell_number = 2;
    }
    if (imagestate === "right") {
      spacespells.x = playerinteractionArea.x - 150;
      spacespells.mirrorX(spacespells.mirrorX() * -1);
      spacespells.y = playerinteractionArea.y;
    } else if (imagestate === "left") {
      spacespells.x = playerinteractionArea.x + 150;
      spacespells.y = playerinteractionArea.y;
      spacespells.mirrorX(spacespells.mirrorX() * -1);
    }
    if (keyWentDown("x") && spelltimer === 0) {
      spelltimer = 1;
      player.velocityX = 0;
      player.addAnimation("idle", playerspell_cast);
      if (space_spell_number === 1) {
        spacespells.addImage(spacespellImage1);
        spacespells.setCollider("rectangle", 0, 0, 300, 80);
        spacespell_delay = 5;
      } else if (space_spell_number === 2) {
        spacespells.addImage(spacespellImage2);
        spacespells.setCollider("circle", 0, 0, 90);
        spacespell_delay = 10;
      }
    }
    if (spelltimer > 10) {
      player.addAnimation("idle", playerspell_cast_loop);
    }
    if (spelltimer === 0) {
      spacespells.visible = false;
    }
    if (spelltimer === 100) {
      player.addAnimation("idle", playeridle)
      spelltimer = 0;
    }
    if (spelltimer === 10) {
      spacespells.visible = true;
    }
    if (spelltimer === spacespell_delay) {
      spacespell_delay = spacespell_delay + 5;
      if (simple_enemy.isTouching(spacespells) && simple_enemy_health > 0) {
        simple_enemy_health = simple_enemy_health - 3
      }
    }

  }
}

function firespell() {
  if (spell_type === "fire") {
    if (keyWentDown("1") && spelltimer === 0) {
      fire_spell_number = 1;
    } else if (keyWentDown("2") && spelltimer === 0) {
      fire_spell_number = 2;
    }
    /* if(keyWentDown(LEFT_ARROW)&&imagestate==="right"){
       imagestate="left";
     }else if(keyWentDown(RIGHT_ARROW)&&imagestate==="left"){
       imagestate="right"
     }*/
    if (keyWentDown("x") && spelltimer === 0) {
      if (fire_spell_number === 1) {
        if (imagestate === "right") {
          firespell1 = createSprite(playerinteractionArea.x - 150, playerinteractionArea.y, 0, 0)
          firespell1.velocityX = -5;
        } else if (imagestate === "left") {
          firespell1 = createSprite(playerinteractionArea.x + 150, playerinteractionArea.y, 0, 0)
          firespell1.mirrorX(firespell1.mirrorX() * -1);
          firespell1.velocityX = 5;
        }
        firespell1.addImage(firespellImage1);
        firespell1.setCollider("rectangle", 0, 0, 250, 60)
        spelltimer = 1;
        player.addAnimation("idle", playerspell_cast);
      } else if (fire_spell_number === 2 && fire_spell_2_timer === 0) {
        firespell2.visible = true;
        fire_spell_2_timer = 1;
        firespell2_delay = 3;
        firespell2.debug = true;
        firespell2.addImage(firespellImage2);
        spelltimer = 1;
        player.addAnimation("idle", playerspell_cast);
        if (imagestate === "right") {
          firespell2.x = playerinteractionArea.x - 150;
          firespell2.y = playerinteractionArea.y;
        } else if (imagestate === "left") {
          firespell2.x = playerinteractionArea.x + 150;
          firespell2.y = playerinteractionArea.y;
        }
      }
    }
    if (fire_spell_number === 1) {
      if (spelltimer === firespell1_delay) {
        firespell1_delay = firespell1_delay + 2;
        if (firespell1.isTouching(simple_enemy)) {
          simple_enemy_health = simple_enemy_health - 1
        }
      }
      if (spelltimer >= 50) {
        spelltimer = 0;
        firespell1.velocityX = 0;
        firespell1.visible = true;
        firespell1_delay = 2;
      }
      if (spelltimer >= 20) {
        player.addAnimation("idle", playeridle);
      }

    }
    if (fire_spell_number === 2 && spelltimer >= 20) {
      player.addAnimation("idle", playeridle);
      spelltimer = 0;
    }
  }
  if (fire_spell_2_timer === firespell2_delay) {
    firespell2_delay = firespell2_delay + 2;
    if (firespell2.isTouching(simple_enemy)) {
      simple_enemy_health = simple_enemy_health - 1;
      if (simple_enemy.x > firespell2.x) {
        simple_enemy.x = simple_enemy.x + 40;
      } else if (simple_enemy.x < firespell2.x) {
        simple_enemy.x = simple_enemy.x - 40;
      }
    }
  }
  if (fire_spell_2_timer >= 200) {
    firespell2_delay = 3;
    fire_spell_2_timer = 0;
    firespell2.visible = false;
  }
}

function airspell() {
  if (spell_type === "air") {

    if (keyWentDown("1") && spelltimer === 0) {
      airspell_number = 1;
    } else if (keyWentDown("2") && spelltimer === 0) {
      airspell_number = 2;
    }

    if (keyWentDown("x")) {
      if (imagestate === "right") {
        airspell2.x = playerinteractionArea.x - 50;
        airspell2.y = playerinteractionArea.y;
        airspell1.x = playerinteractionArea.x - 50;
        airspell1.y = playerinteractionArea.y;
      } else if (imagestate === "left") {
        airspell2.x = playerinteractionArea.x + 50;
        airspell2.y = playerinteractionArea.y;
        airspell1.x = playerinteractionArea.x + 50;
        airspell1.y = playerinteractionArea.y;
      }
      if (spelltimer === 0) {
        spelltimer = 1;
        airspell1.velocityX = 0;
        player.addAnimation("idle", playerspell_cast);
        if (airspell_number === 1) {
          airspell1.visible = true;
        }
        /*
                if (airspell_number === 2) {
                  airspell2.visible = true;
                }*/
      }
      if (airspell_number === 1 && spelltimer >= 25) {
        airspell1_damage = spelltimer / 2;
        player.addAnimation("idle", playeridle)
        spelltimer = 0;
        airspell1_charged = true;
        if (imagestate === "right") {
          airspell1.velocityX = -5;
        }
        if (imagestate === "left") {
          airspell1.velocityX = 5;
        }
      }
    }

  }
  if (airspell1.isTouching(simple_enemy) && airspell1_charged === true) {
    simple_enemy_health = simple_enemy_health - airspell1_damage;
    airspell1.y = -10000;
    airspell1.velocityX = 0;
    airspell1_charged = false;
  }
}

function landspell() {
  if (spell_type === "land") {

    if (keyWentDown("1") && spelltimer === 0) {
      landspell_number = 1;
    } else if (keyWentDown("2") && spelltimer === 0) {
      landspell_number = 2;
    }

    if (keyWentDown("x")) {
      if (spelltimer === 0) {
        if (landspell_number === 1 && landspell1_health === 0) {
          spelltimer = 1;
          player.addAnimation("idle", playerspell_cast)
          landspell1_health = 50;
          landspell1.visible = true;
        }
      }
    }
    if (spelltimer >= 15 && landspell_number === 1) {
      spelltimer = 0;
    }
  }
  if (landspell1_health === 0) {
    landspell1.visible = false;
  }
  if (landspell1_health > 0) {
    if (keyWentDown(UP_ARROW)) {
      landspell1_health = 0;
      player.addAnimation("idle",playeridle)
    }
    /*if (simple_enemy.isTouching(landspell1)) {
      landspell1_health = landspell1_health - 1;
      simple_enemy.x = simple_enemy.x - 50
    }*/
  }

  landspell1.x = player.x;
  landspell1.y = player.y;
}

function waterspell() {
  if (spell_type === "water") {
    if (keyWentDown("x") && spelltimer === 0 && waterspelltimer === 0) {
      simple_enemy_health = simple_enemy_health / 2
      spelltimer = 1;
      waterspelltimer = 1;
    }
    if (spelltimer >= 30) {
      spelltimer = 0;
    }
    if (waterspelltimer >= 300) {
      waterspelltimer = 0;
    }
  }
}

function timerstart() {
  if (spelltimer !== 0) {
    spelltimer = spelltimer + 1;
  }
  if (fire_spell_2_timer !== 0) {
    fire_spell_2_timer = fire_spell_2_timer + 1;
  }
  if (waterspelltimer !== 0) {
    waterspelltimer = waterspelltimer + 1;
  }
  if (enemyattack_timer !== 0) {
    enemyattack_timer = enemyattack_timer + 1;
  }
}
/*async function OreCrystal_extraction() {
  if (slot1_content === "empty" || slot1_content === "ore") {
    if (slot1_value < 10 && slot1_selected === true) {
      slot1_value = slot1_value + 1;
      slot1_content = "ore"
    }
  }
  if (slot2_content === "empty" || slot2_content === "ore") {
    if (slot2_value < 10 && slot2_selected === true) {
      slot2_value = slot2_value + 1;
      slot2_content = "ore"
    }
  }
  if (slot3_content === "empty" || slot3_content === "ore") {
    if (slot3_value < 10 && slot3_selected === true) {
      slot3.addImage(oreslot_image)
      slot3_value = slot3_value + 1;
      slot3_content = "ore"
    }
  }
}*/

/*async function coal_genetartion() {
  if (slot1_content === "empty" || slot1_content === "coal") {
    if (slot1_value < 10 && slot1_selected === true) {
      slot1_value = slot1_value + 1;
      slot1_content = "coal"
    }
  }
  if (slot2_content === "empty" || slot2_content === "coal") {
    if (slot2_value < 10 && slot2_selected === true) {
      slot2_value = slot2_value + 1;
      slot2_content = "coal"
    }
  }
  if (slot3_content === "empty" || slot3_content === "coal") {
    if (slot3_value < 10 && slot3_selected === true) {
      slot3.addImage(coalslot_image)
      slot3_value = slot3_value + 1;
      slot3_content = "coal"
    }
  }
}*/

/*function SlotDumper() {
  if (keyWentDown("q")) {
    if (slot1_value > 0 && slot1_selected === true) {
      slot1_value = slot1_value - 1;
    }
    if (slot2_value > 0 && slot2_selected === true) {
      slot2_value = slot2_value - 1;
    }
    if (slot3_value > 0 && slot3_selected === true) {
      slot3_value = slot3_value - 1;
    }
  }
  if (slot1_value === 0 && slot1_content !== "empty") {
    slot1_content = "empty";
    slot1.addImage(emptyslot_image);
  }
  if (slot2_value === 0 && slot2_content !== "empty") {
    slot2_content = "empty";
    slot2.addImage(emptyslot_image);
  }
  if (slot3_value === 0 && slot3_content !== "empty") {
    slot3_content = "empty";
    slot3.addImage(emptyslot_image);
  }
}*/



/*

  if (creator_pixie.isTouching(player) && imagestate === "right") {
    creator_pixie.x = creator_pixie.x - 100;
  }
  if (creator_pixie.isTouching(player) && imagestate === "left") {
    creator_pixie.x = creator_pixie.x + 100;
  }

  */