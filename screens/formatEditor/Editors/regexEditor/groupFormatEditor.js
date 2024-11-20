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
    UIImage,
    AspectConstraint,
    TextAspectConstraint
} from "../../../../../Elementa";

import { Color } from "../../../../constants";
import { imageFromName } from "../../../../functions";

import DoubleInputWindow from "../../../doubleInputWindow";

export default class groupFormatEditor extends DoubleInputWindow {
    constructor(guiHandler, key, format) {
        super(format)
        console.log(JSON.stringify(format, null, 4))
        this.editor = guiHandler.getElement('editor')
        this.guiHandler = guiHandler
        this.key = key

        const closeButton = new UIImage.ofFile(imageFromName("buttonImages/returnButton.png"))
        .setX((5).pixels())
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((16).pixels())
        .onMouseClick((comp) => {
            this.close()
        })
        .setChildOf(this.topBar)

        const typeBox = new UIRoundedRectangle(5)
        .setX((5).pixels(true))
        .setY(new CenterConstraint)
        .setWidth(new AdditiveConstraint(new ChildBasedSizeConstraint, (4).pixels()))
        .setHeight((16).pixels())
        .setColor(new Color(50/255, 96/255, 171/255, 1))
        .setChildOf(this.topBar)

        const typeText = new UIText(`Group Format - ${this.key}`)
        .setX((2).pixels())
        .setY((2).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setChildOf(typeBox)
    }

    onChange() {
        setTimeout(() => {
            this.saveGroupFormat()
        }, 10);
    }

    saveGroupFormat() {
        this.editor.updateGroupFormating(this.key, this.getInputs())
    }

    close() {
        this.saveGroupFormat()
        this.guiHandler.unhideElement('editor')
        this.guiHandler.deleteElement('groupFormatEditor')
    }
}