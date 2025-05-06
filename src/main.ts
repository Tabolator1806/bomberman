import { init, send, websocket } from './connection'
import {Ballon} from './entities'
import data from './global.json' with {type:"json"}
init()
document.querySelector("#send")?.addEventListener("click", () => { send() })

const spritesheet = document.createElement("img")
spritesheet.src = "src/SpriteSheet.png"
let mapscale = 3

const gameMap: HTMLCanvasElement = document.querySelector("#gamemap") as HTMLCanvasElement
// const entityMap: HTMLCanvasElement = document.querySelector(".entitymap") as HTMLCanvasElement
const spriteSize = 16

var lastLoop = new Date()

function gameLoop(){
  // ...
  let thisLoop = new Date()
  var thisFrameTime = Number(thisLoop) - Number(lastLoop);
  lastLoop = thisLoop;
  return 1000/thisFrameTime
}


let ballonArray:Ballon[] = []
let canvasArray:HTMLCanvasElement[] = []
let canvasonce = true
export class Map {
	CanvasDraw(data:string):void{
		if (canvasonce){
			var dataArray = JSON.parse(data)
			console.log(dataArray.gamedata.entitydata.entityLayout.length)
			canvasArray = []
			for(let i=0; i<=dataArray.gamedata.entitydata.entityLayout.length; i++){
				const canvas = document.createElement("canvas") as HTMLCanvasElement
				canvasArray.push(canvas)
				canvas.width = dataArray.gamedata.mapdata.mapWidth * mapscale * spriteSize
				canvas.height = dataArray.gamedata.mapdata.mapHeight * mapscale * spriteSize
				canvas.classList.add("entitymap")
				// console.log(canvas)
			}
				canvasArray.forEach(canvas1=>{
					document.body.appendChild(canvas1)
				})
				canvasonce=false
		}
			
		
	}
	MapDraw(data: string): void {
		let context = gameMap.getContext("2d") as CanvasRenderingContext2D
		var dataArray = JSON.parse(data)
		gameMap.width = dataArray.gamedata.mapdata.mapWidth * mapscale * spriteSize
		gameMap.height = dataArray.gamedata.mapdata.mapHeight * mapscale * spriteSize
		dataArray.gamedata.mapdata.mapLayout.forEach((Array: Array<Object>) => {
			Array.forEach((element:Object)=>{
				context.drawImage(spritesheet,
					spriteSize * element.spritex,
					spriteSize * element.spritey,
					spriteSize,
					spriteSize,
					spriteSize * element.x * mapscale,
					spriteSize * element.y * mapscale  ,
					spriteSize * mapscale,
					spriteSize * mapscale)
			})
		});
	}
	EntityCreate(data:string):void{
		var dataArray = JSON.parse(data)
		dataArray.gamedata.entitydata.entityLayout.forEach((element: Object,i:number) => {
			console.log(canvasArray[i])
			let context = canvasArray[i].getContext("2d") as CanvasRenderingContext2D
			const a = new Ballon(element.x,element.y,element.nextx,element.nexty,context,spritesheet,spriteSize,mapscale)
			ballonArray.push(a)
		});
		
	}
}
let anim = function(){
	// console.log(gameLoop())
	let framrate = gameLoop()
	ballonArray.forEach((el,i)=>{
			el.ctx.reset()
			el.GoAnim(framrate)
			// console.log("||",el.x,",",el.y)
		}
	)
	setTimeout(window.requestAnimationFrame,1000/Number(data.settings.framerate),anim)
}
setTimeout(() => {
	anim()
}, 100);

let mapDraw = new Map
websocket.onmessage = function (ev) {
	if (ev.data != "")
		try { //PHP sends Json data
			// console.log(JSON.parse(ev.data))
			mapDraw.CanvasDraw(ev.data)
			mapDraw.MapDraw(ev.data);
			mapDraw.EntityCreate(ev.data);
			// spritesheet.onload=()=>mapDraw.CanvasDraw(ev.data)
		} catch (error) {
			//console.error(error);
			//console.log(ev.data);
		}
};