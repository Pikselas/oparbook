var CurrentActivePanel = null

document.getElementById("FileBrowser").onclick = () =>
{
    CurrentActivePanel = document.getElementById("FileBrowserWindow");
    CurrentActivePanel.hidden = false;
    setTimeout(()=>{
        CurrentActivePanel.style.opacity = 1;
    } , 5);
}

document.onclick = (ev)=>
{
    console.log(
        document.getElementById("FileBrowser").contains(ev.target));
}