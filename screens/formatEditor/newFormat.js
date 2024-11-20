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

import { baseFormats, Color } from "../../constants";
import { imageFromName } from "../../functions";
import { jsonLink } from "../../../Pridge/constants"

export default class newFormat {
    constructor(guiHandler, path) {

        this.guiHandler = guiHandler
        this.path = path
        
        this.element = new UIRoundedRectangle(5)
        .setWidth((30).percent())
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (20).pixels()))
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        //Close Button

        const closeButton = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new AspectConstraint(1))
        .setHeight((16).pixels())
        .onMouseClick((comp) => {
            this.close()
        })
        .setChildOf(this.element)

        //Create buttons

        const createBox = new UIRoundedRectangle(5)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (15).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        //Top buttons string/stringarray

        const topButtonsContainer = new UIContainer()
        .setWidth((100).percent())
        .setHeight((20).pixels())
        .setX(new CenterConstraint)
        .setY((5).pixels())
        .setChildOf(createBox)

        const stringButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (7.5).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX((5).pixels())
        .setY((0).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.createFormat('string')
        })
        .setChildOf(topButtonsContainer)

        const stringButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(stringButton)

        const stringButtonText = new UIText("String")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(stringButtonTextContainer)

        const stringArrayButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (7.5).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setY((0).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.createFormat('stringarray')
        })
        .setChildOf(topButtonsContainer)

        const stringArrayButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(stringArrayButton)

        const stringArrayButtonText = new UIText("String Array")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(stringArrayButtonTextContainer)

        //Bottom buttons regex/special

        const bottomButtonsContainer = new UIContainer()
        .setWidth((100).percent())
        .setHeight((20).pixels())
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setChildOf(createBox)

        const regexButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (7.5).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX((5).pixels())
        .setY((0).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.createFormat('regex')
        })
        .setChildOf(bottomButtonsContainer)

        const regexButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(regexButton)

        const regexButtonText = new UIText("Regex")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(regexButtonTextContainer)

        const spcialButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (7.5).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setY((0).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.createFormat('special')
        })
        .setChildOf(bottomButtonsContainer)

        const spcialButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(spcialButton)

        const spcialButtonText = new UIText("Special")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(spcialButtonTextContainer)
    }

    close() {
        this.guiHandler.unhideElement(this.path)
        this.guiHandler.deleteElement("newFormat")
    }

    createFormat(type) {
        this.guiHandler.getElement(this.path).createFormat(baseFormats[type])
        this.guiHandler.getElement(this.path).updateFormatButtons()
        this.close()
    }
}