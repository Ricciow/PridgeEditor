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
    TextAspectConstraint,
    AspectConstraint
} from "../../Elementa";

import { Color } from "../constants";
import { imageFromName } from "../functions";

const what = TextAspectConstraint

export default class DoubleInputWindow {
    /**
     * @param settingsGui The chat settings window
     */
    constructor(values = {}) {
        this.values = values;
        this.settingsGui = null;
        this.textInputs = [];

        this.element = new UIRoundedRectangle(5)
        .setWidth((60).percent())
        .setHeight((80).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        this.topBar = new UIRoundedRectangle(10)
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setX(new CenterConstraint)
        .setY((5).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (4).pixels()))
        .setChildOf(this.element)

        const createBackground = new UIRoundedRectangle(10)
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setX(new CenterConstraint())
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (15).pixels()))
        .setChildOf(this.element)

        const ScrollContainer = new UIContainer()
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setChildOf(createBackground)

        const scrollbar = new UIRoundedRectangle(10)
        .setColor(new Color(0, 9/255, 38/255, 1))
        .setX((0).pixels(true))
        .setY((0).pixels())
        .setWidth((6).pixels())
        .setHeight((20).pixels())
        .setChildOf(ScrollContainer)

        const scrollbarColor = new UIRoundedRectangle(10)
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setX((1).pixels())
        .setY((0).pixels())
        .setWidth((4).pixels())
        .setHeight((100).percent())
        .setChildOf(scrollbar)

        this.Scroll = new ScrollComponent()
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (8).pixels()))
        .setHeight((100).percent())
        .setChildOf(ScrollContainer);

        this.Scroll.setVerticalScrollBarComponent(scrollbar);

        setTimeout(() => {
            this._loadValues()
        }, 50);
    }

    _createInputLine(defaultText = "Blank") {
        const Line = new UIRoundedRectangle(5)
            .setColor(new Color(0, 9/255, 38/255, 1))
            .setX(new CenterConstraint())
            .setY(new AdditiveConstraint(new SiblingConstraint(), (2).pixels()))
            .setWidth((100).percent())
            .setHeight((20).pixels())
            .setChildOf(this.Scroll);
    
        const InnerBox1 = new UIRoundedRectangle(3.3)
            .setColor(new Color(41 / 255, 47 / 255, 69 / 255))//
            .setX((1).pixels())
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((50).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line);
    
        const InnerBox2 = new UIRoundedRectangle(3.3)
            .setColor(new Color(41 / 255, 47 / 255, 69 / 255))//
            .setX((1).pixels(true))
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((50).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line);

        const TextInput1 = new UITextInput(defaultText)
        .setX((2).pixels())
        .setY(new SubtractiveConstraint(new SubtractiveConstraint((100).percent(), (50).percent()), (5).pixels()))
        .setWidth(new SubtractiveConstraint((95).percent(), (7).pixels()))
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            comp.grabWindowFocus();
        })
        .onKeyType((comp) => {
            try {
                this.onChange()
            }
            catch (error) {
                console.error(error)
            }
        })
        .setChildOf(InnerBox1);

        const TextInput2 = new UITextInput(defaultText)
        .setX((2).pixels())
        .setY(new SubtractiveConstraint(new SubtractiveConstraint((100).percent(), (50).percent()), (5).pixels()))
        .setWidth(new SubtractiveConstraint((95).percent(), (7).pixels()))
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            comp.grabWindowFocus();
        })
        .onKeyType((comp) => {
            try {
                this.onChange()
            }
            catch (error) {
                console.error(error)
            }
        })
        .setChildOf(InnerBox2);

        const deleteButton = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX((2).pixels(true))
        .setY(new CenterConstraint)
        .setWidth((16).pixels())
        .setHeight(new AspectConstraint(1))
        .onMouseClick((comp, event) => {
            try {
                this.onChange()
            }
            catch (error) {
                console.error(error)
            }

            const indexInput = this.textInputs.findIndex((value) => value[0] == TextInput1 && value[1] == TextInput2);
            if (indexInput > -1) { 
                this.textInputs.splice(indexInput, 1);
            }

            Line.getParent().removeChild(Line);
            event.stopPropagation();
        })
        .setChildOf(InnerBox2);

        this.textInputs.push([TextInput1, TextInput2])
        return this;
    }
    
    _createButtons() {
        this.ButtonBox = new UIContainer()
        .setX(new CenterConstraint())
        .setY(new AdditiveConstraint(new SiblingConstraint(), (2).pixels()))
        .setWidth((80).percent())
        .setHeight((20).pixels())
        .setChildOf(this.Scroll); 
        
        this._createInputButton()
    }

    _createInputButton(defaultText = "Add New") {
        const Line = new UIRoundedRectangle(5)
            .setColor(new Color(0, 9/255, 38/255, 1))
            .setX(new CenterConstraint)
            .setWidth((30).percent())
            .setHeight((20).pixels())
            .setChildOf(this.ButtonBox);

        const InnerBox = new UIRoundedRectangle(3.3)
            .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
            .setX((1).pixels())
            .setY((1).pixels())
            .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
            .setChildOf(Line)
            .onMouseClick((comp, event) => {
                this._createInputLine("Blank");
                this.ButtonBox.getParent().removeChild(this.ButtonBox);
                this._createButtons()
                event.stopPropagation();
            });
    
        const buttonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(new SubtractiveConstraint((100).percent(), (6).pixels()))
        .setChildOf(InnerBox)

        const ButtonText = new UIText(defaultText)
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint())
        .setHeight((100).percent())
        .setChildOf(buttonTextContainer);
    
        return this;
    }

    onChange() {

    }

    //Loads the values of a given dictionary
    _loadValues() {
        while (this.textInputs.length < Object.keys(this.values).length) {
            this._createInputLine();
        }
        for (let i = 0; i < this.textInputs.length; i++) {
            this.textInputs[i][0].setText(Object.keys(this.values)[i] ? Object.keys(this.values)[i] : "Blank");
            this.textInputs[i][1].setText(this.values[Object.keys(this.values)[i]] ? this.values[Object.keys(this.values)[i]] : "Blank");
        }
        this._createButtons();
    }

    /**
     * @returns Dictionary containing left inputs as keys and right inputs as values
     */
    getInputs() {
        let texts = {};
        for (let i = 0; i < this.textInputs.length; i++) {
            let text1 = this.textInputs[i][0].getText()
            let text2 = this.textInputs[i][1].getText()
            if(text1 != "" && text2 != '') texts[text1] = text2;
        }
        return texts;
    }
}