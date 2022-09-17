
let ACTIVE_DRAG_ITEM = null;
let POS_X = 0;
let POS_Y = 0;

function ON_DRAGOVER(ev)
{
    ev.preventDefault();
    ACTIVE_DRAG_ITEM.style.top = ev.clientY - POS_Y + "px";
    ACTIVE_DRAG_ITEM.style.left = ev.clientX - POS_X + "px";
}

class ContentPanel
{
    //Window = null;
    constructor()
    {
        this.Window = document.createElement("div");    
        this.Window.className = "ContentPanel";
        this.Window.draggable = true;
        let tools = document.createElement("div");
        tools.className = "Tools";
        this.Window.appendChild(tools);
        this.Window.ondragstart = this.#dragRegister
    }
    #dragRegister(ev)
    {
       ACTIVE_DRAG_ITEM = ev.target;
       POS_X = ev.layerX + 15;
       POS_Y = ev.layerY;
       ev.dataTransfer.setDragImage(new Image(), 0, 0);
    }
}

class ImagePanel extends ContentPanel
{
    constructor()
    {
      super();
    }
}