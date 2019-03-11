var runStateHandler = {
  start() {
    updateListeners.push(this);

    this.farGroundImage = new Image();
    this.farGroundImageReverse = new Image();
    this.backGroundImage = new Image();
    this.backGroundImageReverse = new Image();

    this.farGroundImage.src = "./images/far_buildings.png";
    this.farGroundImageReverse.src = "./images/far_buildings_reverse.png";
    this.backGroundImage.src = "./images/near_buildings.png";
    this.backGroundImageReverse.src = "./images/near_buildings_reverse.png";

    this.farGroundImageStart = 0;
    this.farGroundImageReverseStart = 600;
    this.backGroundImageStart = 0;
    this.backGroundImageReverseStart = 435;

    this.player = new GameObject();
    this.player.render = (ctx) => {
      ctx.fillStyle = "black";
      ctx.fillRect(320, 240, 48, 64);
    };
    this.player.update = (self) => {
      if (keys["a"] == true)
      {
        if (self.transform.position.x > -320)
        { 
          self.transform.position.x -= 80 * Time.deltaTime;
        }
        else
        {
          self.transform.position.x = -320;
        }
      }
      if (keys["d"] == true)
      {
        if (self.transform.position.x < 0)
        {
          self.transform.position.x += 80 * Time.deltaTime;
        }
        else
        {
          this.scrollFarGround();
          self.transform.position.x = 0;
        }
      }
      if (keys["w"] == true)
      {
        if (self.transform.position.y > -64)
        {
          self.transform.position.y -= 80 * Time.deltaTime;
        }
        else
        {
          self.transform.position.y = -64;
        }
      }
      if (keys["s"] == true)
      {
        if (self.transform.position.y < 240 - 64)
        {
          self.transform.position.y += 80 * Time.deltaTime;
        }
        else
        {
          self.transform.position.y = 240 - 64;
        }
      }
    };

    this.hierarchy = [];
    this.hierarchy.push(this.player);

    this.cameraZoom = 50;
  },
  eventPump(event) {
    switch (event.name) {
      case "timer":
        this.update();
        this.player.update(this.player);
        this.render(); // Important! Want a division between updating and rendering to view
        break;
      case "click":
        this.nextScene();
        break;
    }
  },
  scrollFarGround() {
    this.farGroundImageStart -= (80 * Time.deltaTime)*.25 + 5;
    this.farGroundImageReverseStart -= (80 * Time.deltaTime)*.25 + 5;
    this.backGroundImageStart -= (80 * Time.deltaTime)*.25 +10;
    this.backGroundImageReverseStart -= (80 * Time.deltaTime)*.25 + 10;

    if (this.farGroundImageStart + this.farGroundImage.width <= 0)
    {
      this.farGroundImageStart = this.farGroundImageReverseStart + this.farGroundImageReverse.width + 70;
    }
    if (this.farGroundImageReverseStart + this.farGroundImageReverse.width <= 0)
    {
      this.farGroundImageReverseStart = this.farGroundImageStart + this.farGroundImage.width + 70;
    }
    if (this.backGroundImageStart + this.backGroundImage.width <= 0)
    {
      this.backGroundImageStart = this.backGroundImageReverseStart + this.backGroundImageReverse.width;
    }
    if (this.backGroundImageReverseStart + this.backGroundImageReverse.width <= 0)
    {
      this.backGroundImageReverseStart = this.backGroundImageStart + this.backGroundImage.width;
    }
  },
  nextScene() {
    state = END_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  },
  update() {
    //This is where I update my model. I don't do any rendering here.
    // if (this.isInCollision())
    // {
    //   // this.nextScene();
    //   this.newSquare();
    // }

    
  },
  render() {
    //Sky background
    var gradient = ctx.createRadialGradient(0,0,0,0,-240,360);
    gradient.addColorStop(0, "#F54040");
    gradient.addColorStop(1, "purple");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height/2);

    ctx.drawImage(this.farGroundImage, this.farGroundImageStart, 0);
    ctx.drawImage(this.farGroundImageReverse, this.farGroundImageReverseStart, 0);

    ctx.drawImage(this.backGroundImage, this.backGroundImageStart, 0);
    ctx.drawImage(this.backGroundImageReverse, this.backGroundImageReverseStart, 0);
    // if (this.scrollBackground)
    // {
    //   // this.farGroundStart -= (80 * Time.deltaTime)*.25;
    //   this.nearGroundStart -= (80 * Time.deltaTime)*.5;
    // }

    // // var farBackground = new Image();
    // // farBackground.src = "./images/skill-desc_0002_far-buildings.png";
    // // farBackground.src = "./images/test.png";
    // // farBackground.width = width;
    // // farBackground.height = height / 2;
    
    // // var farPattern = ctx.createPattern(farBackground, "repeat-x");
    // // ctx.fillStyle = farPattern;
    // // ctx.fillRect(this.farGroundStart, 0, width, height);
    // // ctx.fillStyle = farPattern;
    // // ctx.fillRect(0 + width + this.farGroundStart, 0, width, height);
    // // ctx.drawImage(farBackground, this.farGroundStart, 0);
    // // ctx.drawImage(farBackground, farBackground.width + this.farGroundStart, 0);
    // var farBackground = new Image();
    // farBackground.src = "./images/far_buildings.png";

    // var farBackgroundReverse = new Image();
    // farBackgroundReverse.src = "./images/far_buildings_reverse.png"

    // // ctx.drawImage(farBackground, this.farGroundStart, 0);

    // // ctx.drawImage(farBackground, this.farGroundStart + width, 0);

    // if (this.scrollBackground)
    // {
    //   this.farGroundStart -= (80 * Time.deltaTime)*.25;
    //   this.farGroundReverseStart -= (80 * Time.deltaTime)*.25;
    // }

    // ctx.drawImage(farBackground, this.farGroundStart, 0);

    // ctx.drawImage(farBackgroundReverse, this.farGroundReverseStart, 0);

    // if (this.farGroundStart + farBackground.width <= 0)
    // {
    //   this.farGroundStart = this.farGroundReverseStart + farBackgroundReverse.width;
    // }
    // if (this.farGroundReverseStart + farBackgroundReverse.width <= 0)
    // {
    //   this.farGroundReverseStart = this.farGroundStart + farBackground.width;
    // }


    // var nearBackground = new Image();
    // nearBackground.src = "./images/skill-desc_0001_buildings.png";
    // // var nearPattern = ctx.createPattern(nearBackground, "repeat-x");
    // // ctx.fillStyle = nearPattern;
    // // ctx.fillRect(this.nearGroundStart, 0, width, height);
    // if ((this.nearGroundStart + nearBackground.width) < 0)
    // {
    //   ctx.drawImage(nearBackground, nearBackground.width + this.nearGroundStart, 0);
    // }
    // else
    // {
    //   ctx.drawImage(nearBackground, this.nearGroundStart, 0);
    // }
    // ctx.drawImage(nearBackground, nearBackground.width + this.nearGroundStart, 0);
    // var foreground = new Image();
    // foreground.src = "./images/skill-desc_0000_foreground.png";
    // var foregroundPattern = ctx.createPattern(foreground, "repeat-x");
    // ctx.fillStyle = foregroundPattern;
    // ctx.fillRect(0, 120, width, height/4);

   
    //Street foreground
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 240, width, height/2);

    ctx.save();//Save so we can add children to the background/foreground
    {
      for (var i = 0; i < this.hierarchy.length; i++)
      {
        var gameObject = this.hierarchy[i];

        ctx.save(); {
          ctx.translate(gameObject.transform.position.x, gameObject.transform.position.y);
          ctx.scale(gameObject.transform.scale.x, gameObject.transform.scale.y);

          gameObject.render(ctx);
        }
        ctx.restore();
      }
    }
    ctx.restore();
    
    var rDimensions = positionGUI(width, height, .25, 20, .25)

    ctx.fillStyle = "rgba(255, 255, 255, .5)"

    ctx.fillRect(rDimensions.x,
      rDimensions.y,
      rDimensions.width,
      rDimensions.height);


    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    let string = "Click to end the game";

    ctx.fillText(string, rDimensions.x + rDimensions.width / 2 - ctx.measureText(string).width / 2, rDimensions.y + 20);


  }
};