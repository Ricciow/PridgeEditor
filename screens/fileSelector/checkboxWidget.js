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
    AspectConstraint,
    MinConstraint
} from "../../../Elementa";
import { Color } from "../../constants";
import { imageFromName } from "../../functions";

export default class checkboxWidget {
    constructor(x, y, width, height, parent) {
        this.state = true

        this.container = new UIContainer()
        .setX(x)
        .setY(y)
        .setWidth(width)
        .setHeight(height)
        .setChildOf(parent)

        const label = new UITextInput("Use default preset:")
        .setX((5).pixels())
        .setY(new AdditiveConstraint(new CenterConstraint, (1).pixels()))
        .setWidth(new MinConstraint((100).pixels(), new SubtractiveConstraint((100).percent(), (26).pixels())))
        .setHeight((10).pixels())
        .onActivate((str) => {
            label.setActive(false)
        })
        .setChildOf(this.container)

        const checkbox = new UIRoundedRectangle(5)
        .setX(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((16).pixels())
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.updateState()
        })
        .setChildOf(this.container)

        this.check = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX((2).pixels())
        .setY((2).pixels())
        .setWidth(new AspectConstraint(1))
        .setHeight((12).pixels())
        .setChildOf(checkbox)
    }

    updateState() {
        this.state = !this.state
        if(this.state) {
            this.check.unhide(true)
        }
        else {
            this.check.hide()
        }
    }

    getState() {
        return this.state
    }
}