abstract class Entity{
    public x:number
    public y:number
    abstract currentFrame:number
    public hp = 1
    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }
}

class Ballon extends Entity{
    public currentFrame: number = 0
    public frameDuration = 120
    public currentTick = 0
    public nextx:number
    public nexty:number
    public ctx:CanvasRenderingContext2D
    public spritesheet:HTMLImageElement
    public spriteSize:number
    public mapscale:number
    constructor(x:number,y:number,nextx:number,nexty:number,ctx:CanvasRenderingContext2D,spritesheet:HTMLImageElement,spriteSize:number,mapscale:number){
        super(x,y)
        this.x=x
        this.y=y
        this.nextx=nextx
        this.nexty=nexty
        this.ctx = ctx
        this.spritesheet = spritesheet
        this.spriteSize = spriteSize
        this.mapscale = mapscale
    }
    Draw(){
        this.ctx.drawImage(
            this.spritesheet,
            this.spriteSize * this.currentFrame,
            this.spriteSize * 15,
            this.spriteSize,
            this.spriteSize,
            this.spriteSize * this.x * this.mapscale,
            this.spriteSize * this.y * this.mapscale  ,
            this.spriteSize * this.mapscale,
            this.spriteSize * this.mapscale
        )
    }
    GoAnim(){
        if (this.x<this.nextx){
            this.Draw()
            
        }
        else{
            
        }
    }
}
export {Ballon}