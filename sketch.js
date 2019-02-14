var worms=[];
var i,speed;
var r;
function setup() {
    var canvas = createCanvas(500, 450);
    canvas.position(10,150);
    var killswitch = document.getElementById('kill');
    speed = createSlider(1,10,5,0.1);
    speed.position(120,20);
    background(0);
    // console.log('Height: '+height+' Width: '+width);
}

function mousePressed() {
    if(mouseButton==LEFT) { 
        if(mouseX<width && mouseX>0 && mouseY>0 && mouseY<height) 
            worms.push(new Worm(mouseX,mouseY,15));
        while(worms.length > document.getElementById('mworms').value)
            worms.splice(0,1);
    }
    // console.log('x: '+mouseX+' y: '+mouseY);
}

function draw() {
    clear();
    background(50);
    for(i of worms) {
        i.edge();
        i.move(speed.value());
        i.show();
    }
    document.getElementById('wc').innerHTML = worms.length;
}

function killWorm() {
    worms.splice(0,1);
}

class Worm {
    constructor(x=width/2,y=height/2,s=25) {
        this.x=x;
        this.y=y;
        this.size=s;
        this.trails=[];
        this.v=0;
        this.pos=0;
        this.xoff=random(100);
    }
    edge() {
        if(this.x>width-this.size/2 || this.x<this.size/2 || this.y>height-this.size/2 || this.y<this.size/2) {
            this.x=random(0.15*width,0.85*width);
            this.y=random(0.15*height,0.85*height);
        }
    }
    move(speed) {
        r = document.getElementById('random');
        if(r.checked) {
            this.x+=random(-speed,speed);
            this.y+=random(-speed,speed);
        }
        else {
            this.x+=map(noise(this.xoff),0,1,-speed,speed);
            this.y+=map(noise(this.xoff+100),0,1,-speed,speed);
            this.xoff+=0.01;
        }
        this.v=createVector(this.x,this.y);
        this.trails.push(this.v);
        //limit trail length
        if(this.trails.length>20)
            this.trails.splice(0,1);
    }

    show() {
        for(i=this.trails.length-1;i>=0;i--) {
            //trails
            this.pos=this.trails[i];
            noStroke();
            fill(random(150,200));
            ellipse(this.pos.x,this.pos.y,i/(2.5));
        }
        //worm head
        stroke(0);
        strokeWeight(1);
        fill(0,255,236);
        ellipse(this.x,this.y,this.size);
    }
}