var CurrentActivePanel = null;
var CurrentClickedItem = null;

document.getElementById("FileBrowser").onclick = (ev) =>
{
    CurrentClickedItem = ev.target
    let FileBrowserWnd = new FileBrowserWindow("/path" , "dir" , (itm)=>{
      console.log(itm);
     },"multiple");
    CurrentActivePanel = FileBrowserWnd.Window;
    document.body.appendChild(CurrentActivePanel);
}

document.getElementById("NewProject").onclick = (ev) =>
{
  CurrentClickedItem = ev.target;
  let FileBrowserWnd = new FileBrowserWindow("/path" , "dir",(item)=>{
    let title = prompt("PROJECT TITLE");
    if(title != null)
    {
      CurrentActivePanel.parentElement.removeChild(CurrentActivePanel)
      CurrentActivePanel = null;
      localStorage.setItem("CURRENT_PROJECT",item + '/' + title);
      fetch("/create/" + item + '/' + title).then((res)=>{
        res.json().then((jRes)=>{
          if(jRes["success"])
          {
            document.location = "editor.html";
          }
        });
      });
    }
  });
  CurrentActivePanel = FileBrowserWnd.Window;
  document.body.appendChild(CurrentActivePanel);
}

document.onclick = (ev)=>
{
    if (ev.target != CurrentClickedItem && CurrentActivePanel && !(CurrentActivePanel.contains(ev.target)))
    {
      CurrentActivePanel.parentElement.removeChild(CurrentActivePanel);
      CurrentActivePanel = null;
    }
}