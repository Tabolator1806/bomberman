import { init, send, websocket } from './connection'
import {Ballon} from './entities'

init()
document.querySelector("#send")?.addEventListener("click", () => { send() })

const spritesheet = document.createElement("img")
spritesheet.src = "src/SpriteSheet.png"
let mapscale = 3

const gameMap: HTMLCanvasElement = document.querySelector("#gamemap") as HTMLCanvasElement
const entityMap: HTMLCanvasElement = document.querySelector("#entitymap") as HTMLCanvasElement

const spriteSize = 16

export class Map {
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
		let context = entityMap.getContext("2d") as CanvasRenderingContext2D
		var dataArray = JSON.parse(data)
		// console.log(dataArray.gamedata.mapdata.mapWidth)
		entityMap.width = dataArray.gamedata.mapdata.mapWidth * mapscale * spriteSize
		entityMap.height = dataArray.gamedata.mapdata.mapHeight * mapscale * spriteSize
		// console.log(dataArray.gamedata.entitydata.entityLayout)
		context.reset()
		let ballonArray:Ballon[] = []
		dataArray.gamedata.entitydata.entityLayout.forEach((element: Object) => {
			const a = new Ballon(element.x,element.y,element.nextx,element.nexty,context,spritesheet,spriteSize,mapscale)
			ballonArray.push(a)
		});
		let anim = function(){
			context.reset()
			ballonArray.forEach(el=>{
					el.GoAnim()
				}
			)
			setTimeout(window.requestAnimationFrame,1000/60,anim)
		}
		spritesheet.onload = ()=>{
			anim()
		}
	}
}
websocket.onmessage = function (ev) {
	let mapDraw = new Map
	if (ev.data != "")
		try { //PHP sends Json data
			// console.log(JSON.parse(ev.data))
			mapDraw.MapDraw(ev.data);
			mapDraw.EntityCreate(ev.data);
		} catch (error) {
			//console.error(error);
			//console.log(ev.data);
		}
};