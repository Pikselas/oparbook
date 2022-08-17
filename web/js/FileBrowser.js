/*
     This class Interacts with the server on the path
     given to constructor
*/

class Filebrowser
{
    constructor(path)
    {
        this.ServerPath = path;
        this.CurrentPath = "";
    }
    async getItems()
    {
        let res = await fetch(this.ServerPath + this.CurrentPath + "//");
        return await res.json();
    }
    gotoSubDir(subdir)
    {
        this.CurrentPath += "/" + subdir;
    }
    gotoParentDir()
    {
        this.CurrentPath = this.CurrentPath.substring(0 , this.CurrentPath.lastIndexOf('/'));
    }
    get CurrentDirPath()
    {
        return this.CurrentPath;
    }
    get CurrentDirName()
    {
        return this.CurrentPath.split('/').at(-1);
    }
}