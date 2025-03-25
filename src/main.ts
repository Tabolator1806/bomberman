import { init, send } from './connection'

init()
document.querySelector("#send")?.addEventListener("click", () => { send() })

const spritesheet = document.createElement("img")
spritesheet.src = "src/SpriteSheet.png"
let mapscale = Number(window.getComputedStyle(document.body).getPropertyValue('--scale'))
mapscale = 3

const gameMap: HTMLCanvasElement = document.querySelector("#gamemap") as HTMLCanvasElement

gameMap.width = 31 * mapscale * 16
gameMap.height = 13 * mapscale * 16

class MapDraw {
   Draw(canvas: HTMLCanvasElement, spritesheet: HTMLImageElement): void {
      spritesheet.addEventListener("load", () => {
         let context = canvas.getContext("2d") as CanvasRenderingContext2D
         for (let x = 0; x <= 31; x++) {
            for (let y = 0; y <= 13; y++) {
               if (x == 0 || y == 0 || x == 30 || y == 12)
                  context.drawImage(spritesheet, 16 * 3, 16 * 3, 16, 16, 16 * x * mapscale, 16 * y * mapscale, 16 * mapscale, 16 * mapscale)
               else
                  context.drawImage(spritesheet, 0, 16*5, 16, 16, 16 * x * mapscale, 16 * y * mapscale, 16 * mapscale, 16 * mapscale)
            }
         }
         context.drawImage(spritesheet, 16 * 4, 0, 16, 16, 16 * mapscale, 16 * mapscale, 16 * mapscale, 16 * mapscale)
      })
   }
}

let mapDraw = new MapDraw()

mapDraw.Draw(gameMap, spritesheet)