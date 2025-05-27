import { init, send, websocket } from './connection'
import {Ballon,Player} from './entities'
import data from './global.json' with {type:"json"}
init()

let utterance = new SpeechSynthesisUtterance("Hello world!");
speechSynthesis.speak(utterance);
document.querySelector("#send")?.addEventListener("click", () => { send() })

const spritesheet = document.createElement("img")
spritesheet.src = "src/SpriteSheet.png"
let mapscale = 2

const gameMap: HTMLCanvasElement = document.querySelector("#gamemap") as HTMLCanvasElement
const playerMap: HTMLCanvasElement = document.querySelector("#playermap") as HTMLCanvasElement
const playerContext = playerMap.getContext("2d") as CanvasRenderingContext2D
const spriteSize = 16

var lastLoop = new Date()
const player = new Player(1,1,playerContext,spritesheet,spriteSize,mapscale)
player.Draw()
console.log(player)
function gameLoop(){
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
		playerMap.width = dataArray.gamedata.mapdata.mapWidth * mapscale * spriteSize
		playerMap.height = dataArray.gamedata.mapdata.mapHeight * mapscale * spriteSize
		dataArray.gamedata.mapdata.mapLayout.forEach((Array: Array<Object>) => {
			Array.forEach((element:Object)=>{
				context.drawImage(spritesheet,
					spriteSize * element.spritex,
					spriteSize * element.spritey,
					spriteSize,
					spriteSize,
					spriteSize * element.x * mapscale,
					spriteSize * element.y * mapscale,
					spriteSize * mapscale,
					spriteSize * mapscale)
				context.imageSmoothingEnabled=false
			})
		});
	}
	EntityCreate(data:string):void{
		var dataArray = JSON.parse(data)
		dataArray.gamedata.entitydata.entityLayout.forEach((element: Ballon,i:number) => {
			let context = canvasArray[i].getContext("2d") as CanvasRenderingContext2D
			const a = new Ballon(element.x,element.y,element.nextx,element.nexty,context,spritesheet,spriteSize,mapscale)
			ballonArray.push(a)
			context = playerMap.getContext("2d") as CanvasRenderingContext2D
			// context.beginPath()
			// context.globalAlpha=0.5
			// context.rect(
			// 	element.nextx*spriteSize*mapscale,
			// 	element.nexty*spriteSize*mapscale,
			// 	spriteSize*mapscale,
			// 	spriteSize*mapscale
			// )
			// context.fill()
		});
	}
}
let average = 0
let averageCount = 0
let anim = function(){
	let framrate = gameLoop()
	average += framrate
	averageCount+=1
	let fpsCounter = document.querySelector("#fps") as HTMLParagraphElement
	fpsCounter.innerText = `${average/averageCount} fps`
	ballonArray.forEach(el=>{
			el.ctx.reset()
			el.GoAnim(framrate)
		}
	)
	setTimeout(window.requestAnimationFrame,1000/Number(data.settings.framerate),anim)
}
setTimeout(() => {
	anim()
}, 100);

let mapDraw = new Map
websocket.onmessage = function (ev) {
	console.log(JSON.parse(ev.data))
	if (ev.data != "")
		try { //PHP sends Json data
			mapDraw.CanvasDraw(ev.data)
			mapDraw.MapDraw(ev.data);
			mapDraw.EntityCreate(ev.data);
		} catch (error) {
			//console.error(error);
			//console.log(ev.data);
		}
};