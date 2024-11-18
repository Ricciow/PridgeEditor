import fileSelector from "./screens/fileSelector/fileSelector"
import guiManager from "./screens/guiManager"

const guiHandler = new guiManager('pridgeeditor', ["shridgeeditor"])

guiHandler.addElement(new fileSelector())