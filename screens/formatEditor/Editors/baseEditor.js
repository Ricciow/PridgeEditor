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
} from "../../../../Elementa";
import { Color } from "../../../constants";
import { imageFromName, UIVanillaText } from "../../../functions";
import settings from "../../../../Pridge/settings";

export default class baseEditor {
    constructor(guiHandler, path, format, index) {

        this.guiHandler = guiHandler
        this.path = path
        this.format = format
        this.index = index
        this.testText = "Example Text"

        this.element = new UIRoundedRectangle(5)
        .setWidth((60).percent())
        .setHeight((80).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        //Close Button

        const topContainer = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY((5).pixels())
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight((26).pixels())
        .setChildOf(this.element)

        const closeButton = new UIImage.ofFile(imageFromName("buttonImages/returnButton.png"))
        .setX((5).pixels())
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((16).pixels())
        .onMouseClick((comp) => {
            this.saveFormat()
            this.close()
        })
        .setChildOf(topContainer)

        const deleteBox = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new AdditiveConstraint(new ChildBasedSizeConstraint, (4).pixels()))
        .setHeight((16).pixels())
        .setColor(new Color(189/255, 47/255, 47/255, 1))
        .onMouseClick((comp) => {
            this.deleteFormat()
            this.close()
        })
        .setChildOf(topContainer)

        const deleteText = new UIText("Delete")
        .setX((2).pixels())
        .setY((2).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setChildOf(deleteBox)

        const typeBox = new UIRoundedRectangle(5)
        .setX((5).pixels(true))
        .setY(new CenterConstraint)
        .setWidth(new AdditiveConstraint(new ChildBasedSizeConstraint, (4).pixels()))
        .setHeight((16).pixels())
        .setColor(new Color(50/255, 96/255, 171/255, 1))
        .setChildOf(topContainer)

        const typeText = new UIText(this.format.type)
        .setX((2).pixels())
        .setY((2).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setChildOf(typeBox)

        const testBox = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight((47).pixels())
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        this.testTextInput = new UITextInput("Modify this to test")
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), (6).pixels()))
        .setHeight((10).pixels())
        .onFocusLost(comp => {
            this.updateFormatTest()
        })
        .onKeyType((input, char, keycode) => {
            this.updateFormatTest()
        })

        const testTextInputBox = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY((5).pixels())
        .setHeight((16).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.testTextInput.grabWindowFocus();
        })
        .setChildOf(testBox)

        this.testTextInput.setChildOf(testTextInputBox)

        const testTextBox = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setHeight((16).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setChildOf(testBox)

        const testTextContainer = new UIContainer()
        .setX((3).pixels())
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), (27).pixels()))
        .setHeight(((10).pixels()))
        .setChildOf(testTextBox)

        this.testTextUI = new UIVanillaText()
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth((100).percent())
        .setHeight((100).percent())
        .setChildOf(testTextContainer)

        const sendButton = new UIImage.ofFile(imageFromName("buttonImages/sendButton.png"))
        .setX((5).pixels(true))
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((12).pixels())
        .onMouseClick((comp) => {
            this.sendPridgeMessage(this.formatTest(this.testText))
        })
        .setChildOf(testTextBox)

        this.updateFormatTest()
    }

    sendPridgeMessage(message) {
        ChatLib.chat(`${settings.newName} ${settings.botName} &f${message}`)
    }

    updateFormatTest() {
        let testText = this.testTextInput.getText()
        if(testText != "") {
            this.testText = testText
        }
        else {
            this.testText = "Example Text"
        }
        this.testTextUI.setText(this.formatTest(this.testText))
    }

    formatTest(str) {
        return str
    }

    close() {
        this.guiHandler.unhideElement(this.path)
        this.guiHandler.deleteElement("editor")
    }

    deleteFormat() {
        let formatSelector = this.guiHandler.getElement(this.path)
        formatSelector.deleteFormat(this.index)
        formatSelector.updateFormatButtons()
    }

    saveFormat() {
        this.updateFormatTest()
        let formatSelector = this.guiHandler.getElement(this.path)
        formatSelector.updateFormat(this.format, this.index)
        formatSelector.updateFormatButtons()
    }
}