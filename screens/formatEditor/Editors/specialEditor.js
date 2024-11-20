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
import baseEditor from "./baseEditor";
import { specialFormat } from "../../../../Pridge/functions"


export default class specialEditor extends baseEditor {
    constructor(guiHandler, path, format, index) {
        super(guiHandler, path, format, index)

        const background = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (20).pixels()))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const triggerBackgroundLabel = new UIText("Trigger:")
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((10).pixels())
        .setChildOf(background)

        const triggerBackground = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight((16).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.triggerTextInput.grabWindowFocus();
        })
        .setChildOf(background)

        this.triggerTextInput = new UITextInput("...")
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
        .setChildOf(triggerBackground)

        const functionNameBackgroundLabel = new UIText("Function name:")
        .setX((5).pixels())
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new TextAspectConstraint)
        .setHeight((10).pixels())
        .setChildOf(background)

        const functionNameBackground = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight((16).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.functionNameTextInput.grabWindowFocus();
        })
        .setChildOf(background)

        this.functionNameTextInput = new UITextInput("...")
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
        .setChildOf(functionNameBackground)

        setTimeout(() => {
            this.updateFormatTest()
        }, 50); 
    }

    updateFormatTest() {
        let trigger = this.triggerTextInput.getText()
        if(trigger != "") {
            this.format.trigger = trigger
        }
        else {
            this.triggerTextInput.setText(this.format.trigger)
        }

        let functionName = this.functionNameTextInput.getText()
        if(functionName!= "") {
            this.format.functionName = functionName
        }
        else {
            this.functionNameTextInput.setText(this.format.functionName)
        }

        super.updateFormatTest()
    }

    formatTest(str) {
        try {
            const regex = new RegExp(this.format.trigger)
            let matcher = str.match(regex)
            if(matcher) {
                return specialFormat[this.format.functionName](str, matcher)
            }
            else {
                return str
            }
        }
        catch(error) {
            console.error(`[Pridge Editor] Special Error - ${format.trigger}\n${error}`)
            return "ERROR"
        }
    }
}