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
        let res = await fetch(this.#ServerPath + this.#CurrentPath + "//");
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
    constructor(path)
    {
        this.#FileBrowser = new FileBrowserBackendInteracter(path);
        this.#Window = document.createElement("div");
        this.#Window.className = "FileBrowserWindow";
        
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
        ToolsSection.appendChild(UpDirButton);
        MainPanel.appendChild(ToolsSection);
        this.#Window.appendChild(MainPanel);

        this.#ItemsPanel = document.createElement("div");
        this.#ItemsPanel.className = "ItemSection";
        MainPanel.appendChild(this.#ItemsPanel);

        this.#FileBrowser.getItems().then((items)=>{
            this.#insertItems(items);
        });

    }
    #clearItems()
    {
        this.#ItemsPanel.innerHTML = '';
    }
    #insertItems(items)
    {
        items.forEach((arr)=>{
            this.#ItemsPanel.appendChild(arr[1] ? this.#addFolderPanel(arr[0]) : this.#addFilePanel(arr[0]));
        });
    }
    #addFilePanel(name)
    {
        let panel = document.createElement("div");
        panel.title = name;
        panel.className = "Item File";
        panel.appendChild(document.createElement("div"));
        panel.children[0].innerHTML = name;
        return panel
    }
    #addFolderPanel(name)
    {
        let panel = document.createElement("div");
        panel.title = name;
        panel.className = "Item Folder";
        panel.appendChild(document.createElement("div"));
        panel.children[0].innerHTML = name;
        panel.onclick = ()=>{
            this.#FileBrowser.gotoSubDir(name);
            this.#FileBrowser.getItems().then((items)=>{
                this.#clearItems();
                this.#insertItems(items);
            });
        }
        return panel;
    }
    get Window()
    {
        return this.#Window;
    }
}