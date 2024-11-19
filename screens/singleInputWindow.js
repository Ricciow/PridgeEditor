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
    AspectConstraint,
    UIImage,
    TextAspectConstraint
} from "../../Elementa";
import { imageFromName } from "../functions"; 
const Color = Java.type("java.awt.Color");

export default class SingleInputWidget {
    constructor(parent, values = []) {
        this.values = values;
        this.ChatSettings = null;
        this.textInputs = [];
        this.parent = parent
        this.listener = () => {}

        const createBackground = new UIRoundedRectangle(10)
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth((100).percent())
        .setHeight((100).percent())
        .setChildOf(this.parent);

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
        .setWidth(new SubtractiveConstraint((95).percent(), (7).pixels()))
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            comp.grabWindowFocus();
        })
        .onKeyType((comp) => {
            try {
                this.listener()
            }
            catch (error) {
                console.error(error)
            }
        })
        .setChildOf(InnerBox);

        const deleteButton = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX((2).pixels(true))
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
    
    _createButtons = () => {
        this.ButtonBox = new UIContainer()
        .setX(new CenterConstraint())
        .setY(new AdditiveConstraint(new SiblingConstraint(), (2).pixels()))
        .setWidth((80).percent())
        .setHeight((20).pixels())
        .setChildOf(this.Scroll); 
        
        this._createInputButton()
    }

    _createInputButton = (defaultText = "Add New") => {
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
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(buttonTextContainer);
    
        return this;
    }

    //Loads the values of a given list
    _loadValues() {
        while (this.textInputs.length < this.values.length) {
            this._createInputLine();
        }
        for (let i = 0; i < this.textInputs.length; i++) {
            this.textInputs[i].setText(this.values[i] ? this.values[i] : "Blank");
        }
        this._createButtons();
    }

    setOnChange(func = () => {}) {
        this.listener = func
    }

    /**
     * @returns List containing all inputs
     */
    getInputs() {
        let texts = [];
        for (let i = 0; i < this.textInputs.length; i++) {
            let text = this.textInputs[i].getText()
            if(text != "") texts.push(text);
        }
        return texts;
    }
}