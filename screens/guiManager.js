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
    UIWrappedText
} from "../../Elementa";
import { Color } from "../constants";

const invisibleColor = new Color(0,0,0,0)

export default class guiManager {
    /**
     * Manager for the gui
     * @param {Color} bgColor color of the move background
     * @param {str} commandName
     * @param {str[]} aliases
     */
    constructor(commandName = 'pridgeeditor', aliases, bgColor = new Color(0, 0, 0, 120/255)) {
        this.Screen = new JavaAdapter(WindowScreen, {
            init() {
                return this.getWindow()
            }
        }, true, false);

        this.window = this.Screen.init()
        this.bgColor = bgColor
        this.background = new UIBlock()
        .setColor(invisibleColor)
        .setWidth((100).percent())
        .setHeight((100).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setChildOf(this.window)
        
        this.command = register("command", () => {
            this.open()
        }).setName(commandName)

        if(aliases) this.command.setAliases(...aliases)

        register("guiClosed", (gui) => {
            if(gui.toString() == this.Screen.toString()) {
                this.close()
            }
        })
    }

    open() {
        this.background.setColor(this.bgColor)
        GuiHandler.openGui(this.Screen)
    }

    close() {
        this.background.setColor(invisibleColor)
    }

    /**
     * Add an element to the gui system
     * @param {guiElement} element 
     */
    addElement(element) {
        element.element.setChildOf(this.background)
    }
}