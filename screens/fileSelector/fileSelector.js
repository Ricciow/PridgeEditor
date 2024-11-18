import {
    AdditiveConstraint,
    animate,
    Animations,
    CenterConstraint,
    ChildBasedMaxSizeConstraint,
    ChildBasedSizeConstraint,
    ConstantColorConstraint,
    FillConstraint,
    ScissorEffect,
    SiblingConstraint,
    SubtractiveConstraint,
    UIBlock,
    UIMultilineTextInput,
    UIText,
    WindowScreen,
    MarkdownComponent,
    Inspector,
    UITextInput,
    RelativeWindowConstraint,
    RelativeConstraint,
    UIRoundedRectangle,
    ScrollComponent,
    UIContainer,
    UIWrappedText,
    TextAspectConstraint,
    UIImage,
    AspectConstraint
} from "../../../Elementa";
import { Color } from "../../constants";
import formatSelector from "../formatEditor/formatSelector";
import newFile from "./newFile";
import { imageFromName } from "../../functions";

const File = Java.type("java.io.File")

export default class fileSelector {
    constructor(guiHandler) {

        this.guiHandler = guiHandler
        this.files = []
        this.fileButtons = []

        this.text = "Pridge/customFormating"

        //Make top area
        this.element = new UIRoundedRectangle(5)
        .setWidth((35).percent())
        .setHeight((80).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        this.pathSelector = new UITextInput("Pridge/customFormating")
        .setWidth((90).percent())
        .setHeight((10).pixels())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .onFocusLost(comp => {
            this.updateFilePath()
        })
        .onKeyType((input, char, keycode) => {
            if(char.charCodeAt(0) == 13) { //if Enter pressed
                this.updateFilePath()
            }
        })

        const pathBox = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, ((5).pixels())))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.pathSelector.grabWindowFocus();
        })
        .setChildOf(this.element)

        this.pathSelector.setChildOf(pathBox)

        //Scroll Part
        
        const ScrollContainer = new UIRoundedRectangle(5)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (20).pixels()))
        .setChildOf(this.element)

        const ScrollBarContainer = new UIContainer()
        .setColor(Color.BLACK)
        .setX((2).pixels(true))
        .setY((2).pixels())
        .setWidth((6).pixels())
        .setHeight(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setChildOf(ScrollContainer)

        const scrollbar = new UIRoundedRectangle(4)
        .setColor(Color.BLACK)
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth((6).pixels())
        .setHeight((20).pixels())
        .setChildOf(ScrollBarContainer)

        const scrollbarColor = new UIRoundedRectangle(4)
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setX((1).pixels())
        .setY((0).pixels())
        .setWidth((4).pixels())
        .setHeight((100).percent())
        .setChildOf(scrollbar)

        this.Scroll = new ScrollComponent()
        .setX((2).pixels())
        .setY((0).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (12).pixels()))
        .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
        .setChildOf(ScrollContainer);

        this.Scroll.setVerticalScrollBarComponent(scrollbar);

        //New file button

        const newButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY((5).pixels(true))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.guiHandler.addElement(new newFile(this.guiHandler, Config.modulesFolder + "/" + this.text + "/"), "newFile")
            this.element.hide()
        })
        .setChildOf(this.element)

        const newButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(newButton)

        const newButtonText = new UIText("New")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(newButtonTextContainer)

        this.updateFilePath()
    }

    createFileButton(text = "Example Text") {
        const fileButton = new UIRoundedRectangle(4)
        .setX((0).pixels())
        .setY(new AdditiveConstraint(new SiblingConstraint, (2).pixels()))
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setWidth((100).percent())
        .setHeight((20).pixels())
        .setChildOf(this.Scroll)
        
        const fileButtonTextContainer = new UIContainer()
        .setX((5).pixels())
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), (31).pixels()))
        .setHeight(((20).pixels()))
        .onMouseClick((comp) => {
            let path = Config.modulesFolder + "/" + this.text + "/" + text
            if(this.guiHandler.elementExists(path)) {
                this.guiHandler.unhideElement(path)
            }
            else {
                this.guiHandler.addElement(new formatSelector(this.guiHandler, path), path)
            }
            this.element.hide()
        })
        .setChildOf(fileButton)

        const fileButtonText = new UIText(text)
        .setX((0).pixels())
        .setY((5).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((50).percent())
        .setChildOf(fileButtonTextContainer)

        this.fileButtons.push(fileButton)

        const deleteFileButton = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX((5).pixels(true))
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((16).pixels())
        .onMouseClick((comp) => {
            //Delete button clicked
            let path = Config.modulesFolder + "/" + this.text + "/" + text
            FileLib.delete(path)
            this.updateFilePath()
        })
        .setChildOf(fileButton)
    }

    createFileButtons() {
        this.files.forEach((filename) => this.createFileButton(filename))
    }

    deleteFileButtons() {
        this.fileButtons.forEach((button) => button.getParent().removeChild(button))
        this.fileButtons = []
    }

    updateText() {
        let text = this.pathSelector.getText()
        if(text == "") {
            this.text = "Pridge/customFormating"
        }
        else {
            this.text = text
        }
    }

    getDirectoryPaths() {
        let path = Config.modulesFolder + "/" + this.text
        return new File(path).list()?.filter((text) => {
            if(text.endsWith(".json")) {
                try {
                    let data = JSON.parse(FileLib.read(path + "/" + text))
                    let keys = Object.keys(data)
                    if(keys.includes("formats") && keys.includes("version")) {
                        return true
                    }
                }
                catch (error) {
                    console.error(error)
                    return false
                }
            }
            return false
        })
    }

    updateFilePath() {
        this.updateText()
        this.files = this.getDirectoryPaths()
        this.deleteFileButtons()
        this.createFileButtons()
    }
}