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
    public frameData: number[] = [0,1,2,1]
    public frameDuration = 10
    public currentTick = 0
    public nextx:number
    public nexty:number
    public transx:number = 0
    public transy:number = 0
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
    Draw(i:number){
        this.ctx.drawImage(
            this.spritesheet,
            this.spriteSize * this.frameData[i] + (this.x>this.nextx ? 3 : 0)*this.spriteSize,
            this.spriteSize * 15,
            this.spriteSize,
            this.spriteSize,
            this.spriteSize * this.x * this.mapscale +(this.transx*this.spriteSize*this.mapscale),
            this.spriteSize * this.y * this.mapscale+(this.transy*this.spriteSize*this.mapscale),
            this.spriteSize * this.mapscale,
            this.spriteSize * this.mapscale
        )
    }
    GoAnim(){
        this.Draw(this.currentFrame)
        if(this.x!=this.nextx&&Math.abs(this.transx)<=1)
            this.x>this.nextx ? this.transx-=1/60 : this.transx+=1/60
        if(this.y!=this.nexty&&Math.abs(this.transy)<=1)
            this.y>this.nexty ? this.transy-=1/60 : this.transy+=1/60
        
        this.currentTick+=1
        if(this.currentTick==this.frameDuration){
            this.currentFrame+=1
            this.currentTick=0
        }
        if(this.currentFrame==this.frameData.length){
            this.currentFrame=0
        }
    }
}
export {Ballon}