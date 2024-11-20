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
import { imageFromName } from "../../functions";
import regexEditor from "./Editors/regexEditor/regexEditor";
import specialEditor from "./Editors/specialEditor";
import stringarrayEditor from "./Editors/stringarrayEditor";
import stringEditor from "./Editors/stringEditor";
import newFormat from "./newFormat";

export default class formatSelector {
    constructor(guiHandler, path) {

        let data = JSON.parse(FileLib.read(path))

        this.path = path
        this.guiHandler = guiHandler
        this.version = data.version
        this.formatButtons = []
        this.formats = data.formats

        //Make top area
        this.element = new UIRoundedRectangle(5)
        .setWidth((35).percent())
        .setHeight((80).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        const topBox = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, ((5).pixels())))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const topContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth((90).percent())
        .setHeight((10).pixels())
        .setChildOf(topBox)

        const returnButton = new UIImage.ofFile(imageFromName("buttonImages/returnButton.png"))
        .setX(new SiblingConstraint)
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((100).percent())
        .setChildOf(topContainer)
        .onMouseClick((comp) => {
            this.element.hide()
            this.guiHandler.unhideElement("fileSelector")
        })

        this.versionSelector = new UITextInput(this.version)
        .setX(new AdditiveConstraint(new SiblingConstraint, (10).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new FillConstraint)
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            this.versionSelector.grabWindowFocus();
        })
        .onFocusLost(comp => {
            this.updateVersion()
        })
        .onKeyType((input, char, keycode) => {
            if(char.charCodeAt(0) == 13) { //if Enter pressed
                this.updateVersion()
            }
        })
        .setChildOf(topContainer)

        //Scroll Part
        
        const ScrollContainer = new UIRoundedRectangle(5)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (5).pixels()))
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

        //Save formating button
        const bottomContainer = new UIContainer()
        .setWidth((100).percent())
        .setHeight(new ChildBasedSizeConstraint)
        .setX(new CenterConstraint)
        .setY((0).pixels(true))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const saveButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (7.5).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX((5).pixels())
        .setY(new CenterConstraint)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.saveFile()
            animate(comp, (animation) => {
                animation.setColorAnimation(
                    Animations.OUT_EXP,
                    0.1,
                    new ConstantColorConstraint(Color.BLACK)
                )
            });
        })
        .onMouseRelease((comp) => {
            animate(comp, (animation) => {
                animation.setColorAnimation(
                    Animations.OUT_EXP,
                    0.1,
                    new ConstantColorConstraint(new Color(29/255, 33/255, 48/255, 1))
                )
            });
        })
        .setChildOf(bottomContainer)

        const saveButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(saveButton)
        
        const saveButtonText = new UIText("Save")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(saveButtonTextContainer)

        //New format button
        const newButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (7.5).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX((5).pixels(true))
        .setY(new CenterConstraint)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.guiHandler.addElement(new newFormat(this.guiHandler, this.path), "newFormat")
            this.element.hide()
        })
        .setChildOf(bottomContainer)

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

        this.updateFormatButtons()
    }

    createFormatButton(text = "Example Text", type = "string", index) {
        const formatButton = new UIRoundedRectangle(4)
        .setX((0).pixels())
        .setY(new AdditiveConstraint(new SiblingConstraint, (2).pixels()))
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setWidth((100).percent())
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .onMouseClick((comp) => {
            this.openFormatEditor(index)
        })
        .setChildOf(this.Scroll)

        const typeBox = new UIRoundedRectangle(5)
        .setX(new AdditiveConstraint(new SiblingConstraint, (2).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new AdditiveConstraint(new ChildBasedSizeConstraint, (4).pixels()))
        .setHeight((14).pixels())
        .setColor(new Color(50/255, 96/255, 171/255, 1))
        .setChildOf(formatButton)

        const typeText = new UIText(type)
        .setX((2).pixels())
        .setY((2).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setChildOf(typeBox)

        const formatButtonTextContainer = new UIContainer()
        .setX(new AdditiveConstraint(new SiblingConstraint, (4).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), (90).pixels()))
        .setHeight(((10).pixels()))
        .setChildOf(formatButton)

        const formatButtonText = new UIText(text)
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(formatButtonTextContainer)

        this.formatButtons.push(formatButton)
    }

    openFormatEditor(index) {
        let format = this.formats[index]
        let editor
        switch (format.type) {
            case "string":
                editor = stringEditor
                break
            case "stringarray":
                editor = stringarrayEditor
                break
            case "regex":
                editor = regexEditor
                break
            case "special":
                editor = specialEditor
                break
            default:
                editor = stringEditor
        }
        this.guiHandler.addElement(new editor(this.guiHandler, this.path, format, index), "editor")
        this.element.hide()
    }

    createFormatButtons() {
        this.formats.forEach((format, index) => this.createFormatButton(format.trigger, format.type, index))
    }

    deleteFormatButtons() {
        this.formatButtons.forEach((button) => button.getParent().removeChild(button))
        this.formatButtons = []
    }

    updateVersion() {
        let version = this.versionSelector.getText()
        if(version != "") {
            if(/^\d+\.\d+\.\d+$/.test(version)) {
                this.version = version
            }
        }
    }

    updateFormatButtons() {
        this.updateVersion()
        this.deleteFormatButtons()
        this.createFormatButtons()
    }

    saveFile() {
        let json = {
            version : this.version,
            formats : this.formats
        }
        FileLib.write(this.path, JSON.stringify(json, null, 4))
    }

    deleteFormat(index) {
        delete this.formats[index]
    }

    updateFormat(data, index) {
        this.formats[index] = data
    }

    createFormat(data) {
        this.formats.push(data)
    }
}