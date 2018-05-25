var canvas = document.getElementById("caveExplorer");
var ctx = canvas.getContext("2d");



setInterval(function() {
  update();
  draw();
}, 10);

$(document).bind("keydown", "a", function() {});
$(document).bind("keydown", "d", function() {});
$(document).bind("keydown", "s", function() {});
$(document).bind("keydown", "w", function() {});
$(document).bind("keydown", "space", function() {});




function update(){
	if(keydown.space){
		spaceship.shoot()
		
	}
	if(keydown.a && spaceship.x >=1){
		spaceship.x -= 7;
	}
	if(keydown.d && spaceship.x < 748){
		spaceship.x += 7;
	}
	if(keydown.s){
		spaceship.y += 7;
	}
	if(keydown.w ){
		spaceship.y -= 7
	}

	lasers.forEach(function(laser) {
    laser.update();
  });

  lasers = lasers.filter(function(laser) {
    return laser.active;
  });

  aliens.forEach(function(alien) {
    alien.update();
  });

  aliens = aliens.filter(function(alien) {
    return alien.active;
  });

  if(Math.random() < 0.009) {
    aliens.push(Alien());
  }

 


};

// function collision(){
// 	for(let i =0;i<aliens.length;i++){
// 		for(let j = 0;j<lasers.length;j++){
// 		console.log(lasers.length)

// 		}
// 	}
	
// }
var lasers = [];

function draw(){

		ctx.clearRect(0,0,canvas.width,canvas.height);
		spaceship.draw();

		lasers.forEach(function(laser){
		laser.draw()

		aliens.forEach(function(alien) {
    	alien.draw();
  });
	})
};

var spaceship = {
	color: "red",
	x:40,
	y:60,
	width:10,
	height: 20,
	draw: function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}

function Laser(J) {
  J.active = true;

  
  J.width = 3;
  J.height = 3;
  J.color = "red";

  J.screenBound = function() {
  	
	if(J.x <= 0 && J.x >= canvas.width && J.y <= 0 && J.y >= canvas.height){
    	lasers.pop()
    }  		
  	

  };

  J.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  J.update = function() {
    J.x += 6;
   

    // J.active = J.active && J.screenBound() ;
  };

  return J;
}



spaceship.shoot = function() {
  var laserPosition = this.midpoint();

  lasers.push(Laser({
    // speed: 5,
    x: laserPosition.x,
    y: laserPosition.y
  }));

};

spaceship.midpoint = function() {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};

spaceship.sprite = Sprite("spaceship");

spaceship.draw = function() {
	this.sprite.draw(ctx,this.x,this.y);
}

var aliens = [];


function Alien(I) {
  I = I || {};

  I.active = true;

  I.x = 800;
  I.y = Math.random()*600;

   I.screenSize = function() {
    return I.x >= 0 && I.x <= canvas.width &&
      I.y >= 0 && I.y <= canvas.height;

  }

 I.sprite = Sprite("alien");

  I.draw = function() {
   this.sprite.draw(ctx,this.x,this.y)
  };

  I.update = function() {
    I.x -= 1;

  I.active = I.active && I.screenSize();

  };

 
  return I;
};

// setInterval(function(){
// 	console.log(lasers)
// })







