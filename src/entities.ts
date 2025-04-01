abstract class Entity{
    public x:number
    public y:number
    public hp = 1
    abstract sprites:Array<Array<number>>
    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }
}

class Ballon extends Entity{
    public sprites: number[][] = [[0,15],[1,15],[2,15],[3,15],[4,15],[5,15]]
    public nextx:number
    public nexty:number
    constructor(x:number,y:number,nextx:number,nexty:number){
        super(x,y)
        this.x=x
        this.y=y
        this.nextx=nextx
        this.nexty=nexty
    }
    Draw(ctx:CanvasRenderingContext2D,spritesheet:HTMLImageElement,spriteSize:number,mapscale:number){
        if(this.x>this.nextx){
            for(let i = 0; i<=2; i++){
                ctx.drawImage(
                    spritesheet,
                    spriteSize * this.sprites[i][0],
                    spriteSize * this.sprites[i][1],
                    spriteSize,
                    spriteSize,
                    spriteSize * this.x * mapscale,
                    spriteSize * this.y * mapscale  ,
                    spriteSize * mapscale,
                    spriteSize * mapscale
                )
                if(i==2)
                    i=0
            }
        }
        else{
            for(let i = 3; i<=5; i++){
                ctx.drawImage(
                    spritesheet,
                    spriteSize * this.sprites[i][0],
                    spriteSize * this.sprites[i][1],
                    spriteSize,
                    spriteSize,
                    spriteSize * this.x * mapscale,
                    spriteSize * this.y * mapscale  ,
                    spriteSize * mapscale,
                    spriteSize * mapscale
                )
                if(i==5)
                    i=0
            }
        }
        
    }
}