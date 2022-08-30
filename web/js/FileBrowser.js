/*
     Interacts with the server on the path
     given to constructor
*/

class FileBrowserBackendInteracter
{
    #ServerPath;
    #CurrentPath;
    constructor(path)
    {
        this.#ServerPath = path;
        this.#CurrentPath = "";
    }
    async getItems()
    {
        let res = await fetch(this.#ServerPath + this.#CurrentPath + "/");
        return await res.json();
    }
    gotoSubDir(subdir)
    {
        this.#CurrentPath += "/" + subdir;
    }
    gotoParentDir()
    {
        this.#CurrentPath = this.#CurrentPath.substring(0 , this.#CurrentPath.lastIndexOf('/'));
    }
    get CurrentDirPath()
    {
        return this.#CurrentPath;
    }
    get CurrentDirName()
    {
        return this.#CurrentPath.split('/').at(-1);
    }
}
/*
  Creates a filebrowsing window
*/

class FileBrowserWindow
{
    #FileBrowser;
    #Window;
    #ItemsPanel;
    #SelectMode;
    constructor(path , accept = "file" , acceptfunc = (item) => {})
    {
        this.#FileBrowser = new FileBrowserBackendInteracter(path);
        this.#Window = document.createElement("div");
        this.#Window.className = "FileBrowserWindow";
        this.#SelectMode = {"type" : accept , "func" : acceptfunc};
        
        let RotatingSection = document.createElement("div");
        RotatingSection.className = "Rotor";
        RotatingSection.appendChild(document.createElement("div"));
        RotatingSection.appendChild(document.createElement("div"));
        this.#Window.appendChild(RotatingSection);

        let MainPanel = document.createElement("div");
        MainPanel.className = "MainPanel";
        let ToolsSection = document.createElement("div");
        ToolsSection.className = "Tools";
        let UpDirButton = document.createElement("img");
        UpDirButton.className = "UpDirButton";
        UpDirButton.src = "../media/up-arrow.png";
        UpDirButton.onclick = ()=>{ this.#FileBrowser.gotoParentDir(); this.fetchItems(); };
        ToolsSection.appendChild(UpDirButton);
        if(accept == "dir")
        {
            let SelectButton = document.createElement("img");
            SelectButton.src = "../media/check-mark-small.png";
            SelectButton.className = "SelectDirButton";
            SelectButton.onclick = () => { acceptfunc(this.#FileBrowser.CurrentDirPath); };
            ToolsSection.appendChild(document.createTextNode("&nbsp"));
            ToolsSection.appendChild(SelectButton);
        }
        MainPanel.appendChild(ToolsSection);
        this.#Window.appendChild(MainPanel);

        this.#ItemsPanel = document.createElement("div");
        this.#ItemsPanel.className = "ItemSection";
        MainPanel.appendChild(this.#ItemsPanel);

        this.fetchItems();

    }
    #makeFilePanel(name)
    {
        let panel = document.createElement("div");
        panel.title = name;
        panel.className = "Item File";
        panel.appendChild(document.createElement("div"));
        panel.children[0].innerHTML = name;
        if(this.#SelectMode["type"] == "file")
        {
            panel.onclick = () =>{this.#SelectMode["func"](this.#FileBrowser.CurrentDirPath + '/' + name)};
        }
        return panel
    }
    #makeFolderPanel(name)
    {
        let panel = document.createElement("div");
        panel.title = name;
        panel.className = "Item Folder";
        panel.appendChild(document.createElement("div"));
        panel.children[0].innerHTML = name;
        panel.onclick = ()=>{
            this.#FileBrowser.gotoSubDir(name);
            this.fetchItems();
        }
        return panel;
    }
    fetchItems()
    {
        this.#FileBrowser.getItems().then((items)=>{
            this.#ItemsPanel.innerHTML = '';
            let TimeInterVal = 20;
            items.forEach((arr)=>{
                let panel = arr["IsDir"] ? this.#makeFolderPanel(arr["Name"]) : this.#makeFilePanel(arr["Name"]);
                panel.style.opacity = 0;
                panel.style.transform = "scale(0)";
                this.#ItemsPanel.appendChild(panel);
                setTimeout(()=>{panel.style.opacity = 1 ; panel.style.transform = "scale(1)";} , TimeInterVal);
                TimeInterVal += 20;
            });
        });
    }
    get Window()
    {
        return this.#Window;
    }
}