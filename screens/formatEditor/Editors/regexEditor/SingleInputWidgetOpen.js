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
    CramSiblingConstraint
} from "../../../../../Elementa";
import SingleInputWidget from "../../../singleInputWidget";
import { imageFromName } from "../../../../functions";
import { Color } from "../../../../constants";

export default class SingleInputWidgetOpen extends SingleInputWidget {
    /**
     * 
     * @param {UIComponent} parent 
     * @param {{key:{replacethis:this}}} values Values in GroupFormating form
     * @param {Function(Str)} openFunction Function ran when open button clicked
     */
    constructor(parent, values = {}, openFunction = (key, format) => {}, guiHandler) {
        super(parent, values)
        this.keys = Object.keys(this.values)??[]
        this.openFunction = openFunction
        this.guiHandler = guiHandler
    }

    _createInputLine(defaultText = "Blank") {
        const Line = new UIRoundedRectangle(5)
            .setColor(new Color(0, 9/255, 38/255, 1))
            .setX(new CenterConstraint())
            .setY(new AdditiveConstraint(new SiblingConstraint(), (2).pixels()))
            .setWidth((100).percent())
            .setHeight((20).pixels())
            .setChildOf(this.Scroll);
    
        const InnerBox = new UIRoundedRectangle(3.3)
            .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
            .setX((1).pixels())
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line);
    
        const TextInput = new UITextInput(defaultText)
        .setX((2).pixels())
        .setY(new SubtractiveConstraint(new SubtractiveConstraint((100).percent(), (50).percent()), (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (54).pixels()))
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            comp.grabWindowFocus();
        })
        .onKeyType((comp, char, keycode) => {
            let text = TextInput.getText()
            if(!/^[1-9]+$/.test(text)) {
                TextInput.setText(text.replace(/[^1-9]/g, ""))
            }
            try {
                this.listener()
            }
            catch (error) {
                console.error(error)
            }
        })
        .setChildOf(InnerBox);

        const openButton = new UIRoundedRectangle(5)
        .setX(new AdditiveConstraint(new SiblingConstraint, (2).pixels()))
        .setY(new CenterConstraint)
        .setColor(new Color(50/255, 96/255, 171/255, 1))
        .setWidth((32).pixels())
        .setHeight((14).pixels())
        .onMouseClick((comp) => {
            let key = TextInput.getText()
            let keys = this.getStringInputs()
            if(key != "") {
                if(new Set(keys).size === keys.length) {
                    this.openFunction(key, this.values[key]??{})
                }
                else {
                    TextInput.setColor(Color.RED)
                    animate(TextInput, (animation) => {
                    animation.setColorAnimation(
                        Animations.OUT_EXP,
                        1,
                        new ConstantColorConstraint(Color.WHITE)
                        )
                    });
                }
            }
            else {
                TextInput.setColor(Color.RED)
                animate(TextInput, (animation) => {
                animation.setColorAnimation(
                    Animations.OUT_EXP,
                    1,
                    new ConstantColorConstraint(Color.WHITE)
                    )
                });
            }
        })
        .setChildOf(InnerBox)

        const openButtonText = new UIText("Open")
        .setX((2).pixels())
        .setY((2).pixels())
        .setWidth((28).pixels())
        .setHeight((28).pixels())
        .setChildOf(openButton)

        const deleteButton = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX(new AdditiveConstraint(new SiblingConstraint, (2).pixels()))
        .setY(new CenterConstraint)
        .setWidth((16).pixels())
        .setHeight(new AspectConstraint(1))
        .onMouseClick((comp, event) => {
            try {
                this.listener()
            }
            catch (error) {
                console.error(error)
            }

            const indexInput = this.textInputs.indexOf(TextInput);
            if (indexInput > -1) { 
                this.textInputs.splice(indexInput, 1);
            }

            Line.getParent().removeChild(Line);
            event.stopPropagation();
        })
        .setChildOf(InnerBox);

        this.textInputs.push(TextInput)
        return this;
    }

    updateValues(values) {
        this.values = values
    }

    //Loads the values of a given list
    _loadValues() {
        while (this.textInputs.length < this.keys.length) {
            this._createInputLine();
        }
        for (let i = 0; i < this.textInputs.length; i++) {
            this.textInputs[i].setText(this.keys[i] ? this.keys[i] : "Blank");
        }
        this._createButtons();
    }

    /**
     * @returns Object containing all formats
     */
    getInputs() {
        let formats = {};
        for (let i = 0; i < this.textInputs.length; i++) {
            let key = this.textInputs[i].getText()
            if(key != "") {
                formats[key] = this.values[key]??{}
            }
        }
        return formats;
    }

    getStringInputs() {
        let texts = [];
        for (let i = 0; i < this.textInputs.length; i++) {
            let text = this.textInputs[i].getText()
            if(text != "") texts.push(text);
        }
        return texts;
    }
}