var CurrentActivePanel = null;
var CurrentClickedItem = null;

//creates a row that represents a folder
function AddFolderRow(Title)
{
    let panel = document.createElement("div");
    let Icon = document.createElement("img");
    Icon.src = "../media/folder-small.png";
    //adding 2 space
    panel.innerHTML = "&nbsp&nbsp";
    panel.appendChild(Icon);
    panel.innerHTML += "&nbsp";
    panel.innerHTML += Title;
    panel.className = "File";

    let DirAddPanel = document.getElementById("DirectoryContents");

    panel.onclick = ()=>{

        document.getElementById("DirectoryTitle").innerHTML = Title;
        filebrowser.gotoSubDir(Title);
        filebrowser.getItems().then((json)=>{
            DirAddPanel.innerHTML = "";
            json.forEach((arr)=>{
                arr[1] ? AddFolderRow(arr[0]) : AddFileRow(arr[0]);
            });
        });
    }

    DirAddPanel.appendChild(panel);
}

//creates a row that represents a file
function AddFileRow(Title)
{
    let panel = document.createElement("div");
    let Icon = document.createElement("img");
    Icon.src = "../media/file-small.png";
    //adding 2 space
    panel.innerHTML = "&nbsp&nbsp";
    panel.appendChild(Icon);
    panel.innerHTML += "&nbsp";
    panel.innerHTML += Title;
    panel.className = "File";
    document.getElementById("DirectoryContents").appendChild(panel);
}

document.getElementById("FileBrowser").onclick = (ev) =>
{
    CurrentClickedItem = ev.target
    let FileBrowserWnd = new FileBrowserWindow("http://127.0.0.1:3456/path");
    CurrentActivePanel = FileBrowserWnd.Window;
    document.body.appendChild(CurrentActivePanel);
}

document.onclick = (ev)=>
{
    if (ev.target != CurrentClickedItem && CurrentActivePanel && !CurrentActivePanel.contains(ev.target))
    {
        CurrentActivePanel.style.opacity = 0;
        setTimeout(()=>{
            CurrentActivePanel.hidden = true;
            CurrentActivePanel = null
        } , 500);
    }
}