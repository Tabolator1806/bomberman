import { init, send, websocket } from './connection'

init()
document.querySelector("#send")?.addEventListener("click", () => { send() })

const spritesheet = document.createElement("img")
spritesheet.src = "src/SpriteSheet.png"
let mapscale = Number(window.getComputedStyle(document.body).getPropertyValue('--scale'))
mapscale = 3

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
		entityMap.width = dataArray.gamedata.mapdata.mapWidth * mapscale * spriteSize
		entityMap.height = dataArray.gamedata.mapdata.mapHeight * mapscale * spriteSize
		dataArray.gamedata.entitydata.entitiesLayout.forEach((element: Object) => {

		});
	}
}
websocket.onmessage = function (ev) {
	let mapDraw = new Map
	if (ev.data != "")
		try { //PHP sends Json data
			console.log(JSON.parse(ev.data))
			mapDraw.MapDraw(ev.data);
			mapDraw.EntityCreate(ev.data);
		} catch (error) {
			//console.error(error);
			//console.log(ev.data);
		}
};