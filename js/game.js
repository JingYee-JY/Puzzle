setTimeout(()=>{
    var e = Crafty.init(window.innerWidth - 50, window.innerHeight - 100, puzzle);
    start()
},100)

Crafty.sprite("css/images/flappy.png", {flower:[100,0,1000,1000]});

var displayScore, displayTotal, resultScreen, gameScreen;

function start(){
    displayScore = document.querySelector(".currentScore");
    displayTotal = document.querySelector(".total");
    resultScreen = document.getElementById("result_screen");
    gameScreen = document.getElementById("game_screen");
}


const dim2 = { x: 100, y: 50, w: 60, h: 40, health: 123 };

var score, total;

const grid = [];

let hoveredTiles = [];

const TILE_COLOR = ["#42B0FF", "#FF0000", "#5CFF42"]







const MAX_ROWS = 4, MAX_COLUMNS = 4, GRID_SIZE = 80;

const LIGHT_COLOR = "#FFFFFF", 
    DARK_COLOR = "#FFFFFF",
    HIGHLIGHT_COLOR = "#424242";


//initGrid();

export function initGrid()
{
    score = 0;
    total = 1000;

    console.log(total, displayScore)
    displayScore.innerHTML = score;
    displayTotal.innerHTML = total;
    
    let alternateXColors = false;
    for(let x = 0; x < MAX_ROWS; x++) 
    {

        
        for (let y = 0; y < MAX_COLUMNS; y++)
        {
            let color;
            if(x % 2 > 0)
            {

                color = LIGHT_COLOR;
                if(alternateXColors)
                {
                    color = DARK_COLOR;
                }
            }
            else
            {
                console.log("test")
                color = DARK_COLOR;
                if(alternateXColors)
                {
                    color = LIGHT_COLOR;
                }
            }
            
            alternateXColors = !alternateXColors;



            var parent = Crafty.e("2D, Canvas, Color, Collision, GridX" + x + "GridY" + y + ", WiredHitBox")
                        .attr({x: ((GRID_SIZE - 1) * x) + 5, y: ((GRID_SIZE  - 1) * y) + 5, w:
                    GRID_SIZE, h: GRID_SIZE, initialColor: color, highlighted: false, selected: false, yPos: y, xPos: x})
                    .debugStroke("black")    
                    .color(color)


            grid.push(parent);
            
            //WiredHitBox
            let child = Crafty.e("2D, Canvas, Color, Collision, Grids").attr(
                    {x: ((GRID_SIZE - 1) * x) + 25, y: ((GRID_SIZE  - 1) * y) + 25, w:
                        GRID_SIZE - 55, h: GRID_SIZE - 55, initialColor: color, highlighted: false})
            .checkHits('Tiles')
            .bind("HitOn", function(hitData) {

                removeAllHighlightedTiles();
                console.log(hitData[0].obj.tiles)

                let current = Crafty("GridX" + (x) + "GridY" + (y));
                var totalSelected = 0;
                
                
                if(!current.selected) 
                {
                    current.color(HIGHLIGHT_COLOR);
                    hoveredTiles.push(current);
                    totalSelected++;
                }
         
                
                try {
                   

                    for (const [key, value] of Object.entries(hitData[0].obj.tiles)) {

                        console.log(value)
                        let tileElement = Crafty("GridX" + (x + value[0]) + "GridY" + (y + value[1]));
                        
                        if(!tileElement.selected)
                        {
                            tileElement.color(HIGHLIGHT_COLOR);
                            hoveredTiles.push(tileElement);
                            totalSelected++;
                        }
                    
                    }
                    
                    
                    console.log(Object.keys(hitData[0].obj.tiles).length + 1)
                    console.log(totalSelected + " TOTAL")
                    if(totalSelected !== Object.keys(hitData[0].obj.tiles).length + 1)
                    {
                        removeAllHighlightedTiles();
                    }
     

                }
                catch(e) {
                    removeAllHighlightedTiles();
                }




                /*try {
                    let upOne = Crafty("GridX" + (x) + "GridY" + (y - 1));

                    let rightOne = Crafty("GridX" + (x + 1) + "GridY" + (y));
                    let current = Crafty("GridX" + (x) + "GridY" + (y));

                    upOne.color(HIGHLIGHT_COLOR);
                    hoveredTiles.push(upOne);
                    rightOne.color(HIGHLIGHT_COLOR);
                    hoveredTiles.push(rightOne);
                    current.color(HIGHLIGHT_COLOR);
                    hoveredTiles.push(current);
                }
                catch (e) {
                    removeAllHighlightedTiles();
                }*/
                
                
                
                
                // x + 1 = right one 
                // y - 1 = up one
                
                //Crafty("GridX" + (x - 1) + "GridY" + (y + 1)).color("black");
                    
             
                    
                


            })
            .bind("HitOff", function(hitData) {



    





            });


            
            parent.attach(child);
       

        }
    
    }
}




function removeAllHighlightedTiles()
{
    hoveredTiles.forEach((value) => {

        if(!value.selected)
            value.color(value.initialColor);
       
    })

    hoveredTiles = [];
}


/*const rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Draggable, flower, Tiles")
    .attr(dim2)
    .color("blue");

const rect3 = Crafty.e("2D, Canvas, Color, Keyboard, Draggable, flower, Tiles")
    .attr(dim2)
    .color("blue");

rect3.attach(rect2);*/




function onTileStopDrag(element)
{
    console.log(hoveredTiles.length)


    hoveredTiles.forEach((value) => {
        value.selected = true;
        value.color("#6A6A6A");


        checkTiles(false, value);
        checkTiles(true, value);

    })

    if(hoveredTiles.length > 0)
    {
        displayScore.innerHTML = score
        element.destroy();
        generateRandomTile();
    }
     

    hoveredTiles = [];


}

function checkTiles(checkX, value)
{
    var totalTiles = [];
    for(let x = 0; x < MAX_ROWS; x++)
    {
        let tileElement;
        console.log("here " + x)
        if(checkX)
            tileElement = Crafty("GridX" + (x) + "GridY" + (value.yPos));
        else
            tileElement = Crafty("GridX" + (value.xPos) + "GridY" + (x));
        
       

        if(tileElement.selected)
        {
            console.log("yes")
            totalTiles.push(tileElement);
        }
    }
    
  
    console.log(totalTiles)

    if(totalTiles.length === MAX_ROWS)
    {
        score += 100;
        console.log(score)
        console.log("destroy")

        totalTiles.forEach((value) => {

            value.selected = false;
            value.color(value.initialColor);


            var options = {
                maxParticles: 100,
                size: 10,
                sizeRandom: 4,
                speed: 1,
                speedRandom: 1.2,
                // Lifespan in frames
                lifeSpan: 29,
                lifeSpanRandom: 7,
                // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
                angle: 0,
                angleRandom: 34,
                startColour: [220, 220, 220, 1],
                startColourRandom: [48, 50, 45, 0],
                endColour: [245, 35, 0, 0],
                endColourRandom: [60, 60, 60, 0],
                // Only applies when fastMode is off, specifies how sharp the gradients are drawn
                sharpness: 100,
                sharpnessRandom: 10,
                // Random spread from origin
                spread: 100,
                // How many frames should this last
                duration: 30,
                // Will draw squares instead of circle gradients
                fastMode: false,
                gravity: { x: 0.1, y: 0.1 },
                // sensible values are 0-3
                jitter: 1,
                // Offset for the origin of the particles
                originOffset: {x: 40, y: 40}
            };

            var particle =Crafty.e("2D, Canvas, Particles")
                .attr({ w: GRID_SIZE, h: GRID_SIZE, x: value.x, y: value.y })
                // debug entity's bounds while developing
                // make sure particles fit into entity's bounds
                .addComponent('WiredMBR')
                // init particle animation
                .particles(options);


            var delayInMilliseconds = 700; 

            setTimeout(function() {
           
                particle.destroy();

                if(score == total){
                    gameScreen.classList.add("hide")
                    resultScreen.classList.remove("hide");
                }
            }, delayInMilliseconds);
        })

    }
}

//generateRandomTile();

export function generateRandomTile()
{

    var randomColor = Math.floor(Math.random() * TILE_COLOR.length);
    var newColor = TILE_COLOR[randomColor];
    const parent = Crafty.e("2D, Canvas, Color, Keyboard, Draggable")
        .attr({ x: (GRID_SIZE - 100), y: 450, w: GRID_SIZE + 200 , h: GRID_SIZE + 200 })
        .bind('StopDrag', function(evt) {


            onTileStopDrag(this);





        });

    
    
    var tileFormations = {};
    
    for(let i = 0; i < Math.floor(Math.random() * 3); i++)
    {
        
        var x = 0, y = 0,
        xPos = 0, yPos = 0;
        
        if(Math.floor(Math.random() * 2) === 1)
        {
            
            var tempX = 76
            xPos = 1;
            
            if(Math.floor(Math.random() * 2) === 1) 
            {
                tempX = -76;

                xPos = -1;
            }
            
            x = tempX;
        }
        else
        {
            var tempY = 76;
            yPos = 1;
            
            if(Math.floor(Math.random() * 2) === 1)
            {
                tempY = -76;
                yPos = -1;
            }

            y = tempY;
        }
        
        tileFormations["tiles" + i] = [xPos, yPos];
        
        console.log(x + " x")
  
        
        if(x !== 0 || y !== 0)
        {
            const rect3 = Crafty.e("2D, Canvas, Color, Keyboard, Collision, WiredHitBox")
                .attr({ x: (GRID_SIZE - 50) + x, y: 450 + y, w: GRID_SIZE - 5, h: GRID_SIZE - 5})
                .debugStroke("black")
                .color(newColor);

            parent.attach(rect3);
        }
    
        

     
        console.log(tileFormations);

    }




    const rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Tiles, Collision, WiredHitBox, PuzzleParent")
        .attr({ x: GRID_SIZE - 50, y: 450, w: GRID_SIZE - 5, h: GRID_SIZE - 5, tiles:
            tileFormations })
        .debugStroke("black")
        .color(newColor)



 


    
 

    parent.attach(rect2);
    
   
    
    parent.move("e", 50)

    parent.move("n", 55)
}

















/*rect2.bind("EnterFrame", function () {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) {
        // Collision detected!
        this.color("green");

        
       
    } else {
        // No collision
        this.color("blue");
        
    }
});*/