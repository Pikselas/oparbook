var CurrentActivePanel = null;
var CurrentClickedItem = null;

document.getElementById("FileBrowser").onclick = (ev) =>
{
    CurrentClickedItem = ev.target
    let FileBrowserWnd = new FileBrowserWindow("http://127.0.0.1:3456/path" , "file" , (itm)=>{
      console.log(itm);
    });
    CurrentActivePanel = FileBrowserWnd.Window;
    document.body.appendChild(CurrentActivePanel);
}

document.onclick = (ev)=>
{
    if (ev.target != CurrentClickedItem && CurrentActivePanel && !CurrentActivePanel.contains(ev.target))
    {
      CurrentActivePanel.parentElement.removeChild(CurrentActivePanel);
      CurrentActivePanel = null;
    }
}