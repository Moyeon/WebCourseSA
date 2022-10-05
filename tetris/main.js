var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.canvas.width = BOARD.WIDTH * BOARD.BLOCKSIZE;
ctx.canvas.height = BOARD.HEIGHT * BOARD.BLOCKSIZE;

ctx.scale(BOARD.BLOCKSIZE, BOARD.BLOCKSIZE);

class Display {
    grid;
    piece;

    getNewBoard(){
        this.grid = Array.from(
            {length: BOARD.HEIGHT}, ()=>{
                Array(BOARD.WIDTH).fill(0)
            }
        );
        console.table(this.grid);
    }
    
    validMove(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;

                return (
                    this.isInsideWalls(x, y)
                );
            });
        });
    }

    isInsideWalls(x, y) {
        return x >= 0 && x <= BOARD.WIDTH && y < BOARD.HEIGHT;
    }

}

var display = new Display();

function gameStart(){
    display.getNewBoard();
    var piece = new Piece(ctx);
    piece.draw();

    display.piece = piece;
}

class Piece {
    x;
    y;
    color;
    shape;
    ctx;
    typeID;

    constructor(ctx){
        this.ctx = ctx;
        this.spawn();
    }

    spawn(){
        this.typeID = Math.floor(Math.random() * 7) + 1;
        this.shape = TETROMINO[this.typeID].shape;
        this.color = TETROMINO[this.typeID].color;
        
        this.x = 3;
        this.y = 0;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(value > 0){
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p){
        this.x = p.x;
        this.y = p.y;
    }

    rotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));

        for(let y = 0; y < p.shape.length; y++) {
            for (let x = 0; x < y; x++) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }

        p.shape.forEach((row) => row.reverse());

        this.shape = p.shape;
    }

}

const moves = {
    left : p => ({ ...p, x: p.x - 1}),
    right : p => ({ ...p, x: p.x + 1}),
    down : p => ({ ...p, y: p.y + 1})
};

document.addEventListener('keydown', event => {
    if(event.keyCode == 37){ //left arrow
        event.preventDefault();
        var p = moves.left(display.piece);
        if(display.validMove(p)){
            display.piece.move(p);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            display.piece.draw();
        }

    }else if(event.keyCode == 39){//right arrow
        event.preventDefault();
        var p = moves.right(display.piece);
        if(display.validMove(p)){
            display.piece.move(p);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            display.piece.draw();
        }
    }else if(event.keyCode == 40){ //down arrow
        event.preventDefault();
        var p = moves.down(display.piece);
        if(display.validMove(p)){
            display.piece.move(p);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            display.piece.draw();
        }
    } else if (event.keyCode == 32) { // space bar
        event.preventDefault();
        var p = moves.down(display.piece);
        while (display.validMove(p)) {
            display.piece.move(p);
            p = moves.down(display.piece);
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        display.piece.draw();
    } else if (event.keyCode == 38) { // up arrow
        event.preventDefault();
        display.piece.rotate(display.piece);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        display.piece.draw();
    }

});
