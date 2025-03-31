import { init, send, websocket } from './connection'

init()
document.querySelector("#send")?.addEventListener("click", () => { send() })

const spritesheet = document.createElement("img")
spritesheet.src = "src/SpriteSheet.png"
let mapscale = Number(window.getComputedStyle(document.body).getPropertyValue('--scale'))
mapscale = 3

const gameMap: HTMLCanvasElement = document.querySelector("#gamemap") as HTMLCanvasElement

const spriteSize = 16

export class MapDraw {
   Draw(data: string): void {
      let context = gameMap.getContext("2d") as CanvasRenderingContext2D
      var dataArray = JSON.parse(data)
      gameMap.width = dataArray.gamedata.mapdata.mapWidth * mapscale * spriteSize
      gameMap.height = dataArray.gamedata.mapdata.mapHeight * mapscale * spriteSize
      dataArray.gamedata.mapdata.mapLayout.forEach((element: Object) => {
         spritesheet.addEventListener("load",()=>{
            context.drawImage(spritesheet,
               spriteSize * element.spritex,
               spriteSize * element.spritey,
               spriteSize,
               spriteSize +1,
               spriteSize * element.x * mapscale,
               spriteSize * element.y * mapscale  ,
               spriteSize * mapscale,
               spriteSize * mapscale)
         })
         });
   }
}
websocket.onmessage = function (ev) {
   let mapDraw = new MapDraw
   if (ev.data != "")
      try { //PHP sends Json data
         mapDraw.Draw(ev.data);
      } catch (error) {
         //console.error(error);
         //console.log(ev.data);
      }
};