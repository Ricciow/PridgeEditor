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
    TextAspectConstraint
} from "../../../Elementa";
import { Color } from "../../constants";

export default class fileSelector {
    constructor() {
        this.element = new UIRoundedRectangle(5)
        .setWidth((40).percent())
        .setHeight((80).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        const pathBox = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (20).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, ((10).pixels())))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const pathSelector = new UITextInput("Pridge/customFormating")
        .setWidth((90).percent())
        .setHeight((10).pixels())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .onMouseClick((comp) => {
            comp.grabWindowFocus();
        })
        .setChildOf(pathBox)
    }
}