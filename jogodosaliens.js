var tempo = 100;
numerodeflexas = 10;
cont = 1000;
var naves , moedaruim , moedaboa , flechas
function preload() {
    cidade = loadImage("./assets/cidade_1.PNG");
    arqueiroimg = loadImage("./assets/arqueiro.png");
    flexaimg = loadImage("./assets/arrow.png");
    aliensimg = loadImage("./assets/aliens.png")
    muroimg = loadImage("./assets/muro.jpg")
    relogiobomimg = loadImage("./assets/relogiobom.png")
    relogioruimimg = loadImage("./assets/relogioruim.png")
    explode = loadSound("./assets/explode.mp3")
    pow = loadImage("./assets/pow.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    bg = createSprite(windowWidth / 2, windowHeight / 2);
    bg.addImage(cidade);
    edges = createEdgeSprites()    

    arqueiro = createSprite(windowWidth / 2 + 30, windowHeight / 2 + 250);
    arqueiro.addImage(arqueiroimg);
    arqueiro.scale = 0.04;
    arqueiro.rotation = +180;
    muro = createSprite(windowWidth/4-70,windowHeight+50)
    muro.addImage(muroimg)
    //Copias do Muro
    muro = createSprite(windowWidth/2,windowHeight+50)
    muro.addImage(muroimg)
    //Copias do Muro
    muro = createSprite(windowWidth-300,windowHeight+50)
    muro.addImage(muroimg)

    //Grupos
    naves = createGroup()
    moedaruim = createGroup()
    moedaboa = createGroup()
    flechas = createGroup()

    frameRate(30);
    tempo = 3000;
}

function draw() {
    background(0);
    arqueiro.collide(edges)
    //exibir pontuação
    frameRate(30);
    tempo = tempo - 1;
    tempo2 = round(tempo / 30);
    drawSprites();
    if (keyDown("RIGHT_ARROW")) {
        arqueiro.x = arqueiro.x + 14;
    }
    if (keyDown("LEFT_ARROW")) {
        arqueiro.x = arqueiro.x - 14;
    }

    if (keyWentDown("space")) {
        flexa = createSprite(arqueiro.x, arqueiro.y);

        flexa.velocityY = -15;
        flexa.addImage(flexaimg);
        flexa.scale = 0.06;
        flexa.rotation = -90;
        explode.play()
        explode.setVolume(0.1)
        flechas.add(flexa)

    }   

    if (frameCount%60===0){
        alien = createSprite(500,50)
        alien.addImage(aliensimg)
        alien.velocityY = 10
        alien.scale = 0.27
        alien.x = Math.round(random(50,windowWidth-50))
        naves.add(alien)
    }
        if (frameCount%840===0){
        tempobom = createSprite(500,50)
        tempobom.addImage(relogiobomimg)
        tempobom.velocityY = 10
        tempobom.scale = 0.23
        tempobom.x = Math.round(random(50,windowWidth-50))
        moedaboa.add(tempobom)

        
    }
    if (frameCount%550===0){
        temporuim = createSprite(500,50)
        temporuim.addImage(relogioruimimg)
        temporuim.velocityY = 13
        temporuim.scale = 0.5
        temporuim.x = Math.round(random(50,windowWidth-50))
        moedaruim.add(temporuim)
        

        
    }
    if(flechas.collide(naves)){
        naves.destroyEach()
        flechas.destroyEach()
        explosao = createSprite(alien.x,alien.y)
        explosao.addImage(pow)
        explosao.scale = 0.15
        explosao.lifetime = 40
    }
    if (flechas.collide(moedaboa)){
        tempo2 = tempo2 +10
        moedaboa.destroyEach()
        flechas.destroyEach()
        
        
    }
    if (flechas.collide(moedaruim)){
        tempo2 = tempo2 -10
        moedaruim.destroyEach()
        flechas.destroyEach()
        
        
    }


    text("Tempo restante: " + tempo2, windowWidth - 500, 100);
}
