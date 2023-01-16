const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  toolBtns = document.querySelectorAll('.tool'),
  fillColor = document.querySelector('#fill-color'),
  slider = document.querySelector('#size-slider'),
  colorPicker = document.querySelectorAll('.row.colors .option'),
  colorPalette = document.querySelector("#color-picker"),
  clearCanvasBtn = document.querySelector(".clear-canvas"),
  saveImgBtn = document.querySelector(".save-image")
let  mousePosX,mousePosY,snapshot,
isDrawing = false,
selectedTool = "brush",
selectedColor = "#000"

const setCanvasBg = ()=>{
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
const drawRect=(e)=>{
    if(!fillColor.checked){
        return ctx.strokeRect(e.offsetX,e.offsetY,mousePosX-e.offsetX,mousePosY-e.offsetY)
    }
     else{ctx.fillRect(e.offsetX,e.offsetY,mousePosX-e.offsetX,mousePosY-e.offsetY)}
    
}
const drawCircle=(e)=>{
    ctx.beginPath() // creating new path to begin drawing from
    let radius = Math.sqrt(Math.pow((mousePosX-e.offsetX),2) + Math.pow((mousePosY-e.offsetY),2))
    ctx.arc(mousePosX,mousePosY,radius,0,2*Math.PI) // creates circle based of parameters
    !fillColor.checked ?  ctx.stroke(): ctx.fill(); // creates drawing
}
const drawLine=(e)=>{
    ctx.beginPath() // creating new path to begin drawing from;
    ctx.moveTo(mousePosX,mousePosY); // creates starting point
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke() //creates drawing
}
const drawTriangle=(e)=>{
    ctx.beginPath() // creating new path to begin drawing from;
    ctx.moveTo(mousePosX,mousePosY); // creates starting point
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.lineTo(mousePosX * 2 - e.offsetX,e.offsetY);
    ctx.closePath() // creates line to join the ends of each line
    !fillColor.checked ?  ctx.stroke(): ctx.fill(); // creates drawing
}
const draw = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0)
    switch (selectedTool) {
        case "brush"||"eraser":
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();     // creates drawing
            break;
        case "rectangle":
            drawRect(e)
            break;
        case "line":
            drawLine(e)
            break;
        case "triangle":
            drawTriangle(e)
            break;
        case "circle":
            drawCircle(e)
            break;
        default:
            ctx.strokeStyle = '#fff'
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke(); 
            break;
    }
};
const startDraw = (e)=>{
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    isDrawing=true;
    mousePosX = e.offsetX
    mousePosY = e.offsetY
    ctx.beginPath() // creating new path to begin drawing from;
    ctx.lineWidth = slider.value
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height)
}
const stopDraw = ()=>{
    isDrawing=false;
}
toolBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id;
    })
})
colorPicker.forEach(color=>{
    color.addEventListener("click",()=>{
        document.querySelector(".options .selected").classList.remove('selected');
        color.classList.add('selected')
        selectedColor = window.getComputedStyle(color).backgroundColor
    })
})
colorPalette.addEventListener("change",()=>{
    selectedColor = colorPalette.value
    colorPalette.parentElement.style.backgroundColor = colorPalette.value
})
clearCanvasBtn.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})
saveImgBtn.addEventListener("click",()=>{
    // let bgMode = confirm("Do you want to save with transparent background?")
    // if(bgMode){
    //     setCanvasBg()
    // }else{
    //     return;
    // }
    const link =document.createElement('a')                
    link.download = `${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    
})
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
