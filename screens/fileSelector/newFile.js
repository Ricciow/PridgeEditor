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

export default class newFile {
    constructor(guiHandler) {

        this.guiHandler = guiHandler
        
        this.element = new UIRoundedRectangle(5)
        .setWidth((10).percent())
        .setHeight((10).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        
    }
}