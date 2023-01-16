const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  toolBtns = document.querySelectorAll('.tool'),
  fillColor = document.querySelector('#fill-color'),
  slider = document.querySelector('#size-slider'),
  colorPicker = document.querySelectorAll('.row.colors .option')
let  mousePosX,mousePosY,snapshot,
isDrawing = false,
selectedTool = "brush"

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
    ctx.beginPath()
    let radius = Math.sqrt(Math.pow((mousePosX-e.offsetX),2) + Math.pow((mousePosY-e.offsetY),2))
    ctx.arc(mousePosX,mousePosY,radius,0,2*Math.PI)
    !fillColor.checked ?  ctx.stroke(): ctx.fill();
}
const drawTriangle=(e)=>{
    ctx.beginPath();
    ctx.moveTo(mousePosX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke()
}
const draw = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0)
    switch (selectedTool) {
        case "brush":
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();    
            break;
        case "rectangle":
            drawRect(e)
            break;
        case "triangle":
            drawTriangle()
            break;
        case "circle":
            drawCircle(e)
            break;
        default:
            
            break;
    }
};
const startDraw = (e)=>{
    isDrawing=true;
    mousePosX = e.offsetX
    mousePosY = e.offsetY
    ctx.beginPath();
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
        document.querySelector(".row.colors .option.selected").classList.remove('selected');
        color.classList.add('selected')
    })
})
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
