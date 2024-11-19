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
import SingleInputWidget from "../../singleInputWindow";
import baseEditor from "./baseEditor";

export default class stringarrayEditor extends baseEditor {
    constructor(guiHandler, path, format, index) {
        super(guiHandler, path, format, index)

        const background = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (20).pixels()))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const triggerBackgroundLabel = new UIText("Triggers:")
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((10).pixels())
        .setChildOf(background)

        const triggerContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (26).pixels()))
        .setChildOf(background)

        this.triggerInputs = new SingleInputWidget(triggerContainer, this.format.trigger)

        const finalFormatBackgroundLabel = new UIText("Final Format:")
        .setX((5).pixels())
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new TextAspectConstraint)
        .setHeight((10).pixels())
        .setChildOf(background)

        const finalFormatBackground = new UIRoundedRectangle(5)
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight((16).pixels())
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .onMouseClick((comp) => {
            this.finalFormatTextInput.grabWindowFocus();
        })
        .setChildOf(background)

        this.finalFormatTextInput = new UITextInput("...")
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
        .setChildOf(finalFormatBackground)

        this.triggerInputs.setOnChange(() => {
            setTimeout(() => {
                this.updateFormatTest()
            }, 10);
        })

        setTimeout(() => {
            this.updateFormatTest()
        }, 50); 
    }

    updateFormatTest() {
        this.format.trigger = this.triggerInputs.getInputs()

        let finalFormat = this.finalFormatTextInput.getText()
        if(finalFormat != "") {
            this.format.finalFormat = finalFormat
        }
        else {
            this.finalFormatTextInput.setText(this.format.finalFormat)
        }

        super.updateFormatTest()
    }

    formatTest(str) {
        if(this.format.trigger.includes(str)) {
            return this.format.finalFormat.replace("${msg}", str)
        }
        else {
            return str
        }
    }
}