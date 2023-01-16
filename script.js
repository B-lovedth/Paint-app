const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  toolBtns = document.querySelectorAll('.tool')
  slider = document.querySelector('#size-slider')

let  mousePosX,mousePosY,snapshot,
isDrawing = false,
selectedTool = "brush"

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
    
});
const drawRect=(e)=>{
    ctx.strokeRect(e.offsetX,e.offsetY,mousePosX-e.offsetX,mousePosY-e.offsetY)
}
const draw = (e) => {
    if(!isDrawing) return;
    switch (selectedTool) {
        case "brush":
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();    
            break;
        case "rectangle":
            drawRect(e)
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
    snapshot = 
}
const stopDraw = ()=>{
    isDrawing=false;
}
toolBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.toggle('active')
        selectedTool = btn.id;
    })
})
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
