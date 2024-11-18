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
import { Color } from "../../constants";
import { imageFromName } from "../../functions";

export default class formatSelector {
    constructor(guiHandler, path) {

        this.guiHandler = guiHandler
        this.version = "0.1.0"
        this.formatButtons = []
        this.formats = []

        //Make top area
        this.element = new UIRoundedRectangle(5)
        .setWidth((35).percent())
        .setHeight((80).percent())
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        const topBox = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, ((5).pixels())))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const topContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth((90).percent())
        .setHeight((10).pixels())
        .setChildOf(topBox)

        const returnButton = new UIImage.ofFile(imageFromName("buttonImages/returnButton.png"))
        .setX(new SiblingConstraint)
        .setY(new CenterConstraint)
        .setWidth(new AspectConstraint(1))
        .setHeight((100).percent())
        .setChildOf(topContainer)
        .onMouseClick((comp) => {
            this.element.hide()
            this.guiHandler.unhideElement("fileSelector")
        })

        this.versionSelector = new UITextInput("0.1.0")
        .setX(new AdditiveConstraint(new SiblingConstraint, (10).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new FillConstraint)
        .setHeight((10).pixels())
        .onMouseClick((comp) => {
            this.versionSelector.grabWindowFocus();
        })
        .setChildOf(topContainer)

        //Scroll Part
        
        const ScrollContainer = new UIRoundedRectangle(5)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, (5).pixels()))
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new SubtractiveConstraint(new FillConstraint, (5).pixels()))
        .setChildOf(this.element)

        const ScrollBarContainer = new UIContainer()
        .setColor(Color.BLACK)
        .setX((2).pixels(true))
        .setY((2).pixels())
        .setWidth((6).pixels())
        .setHeight(new SubtractiveConstraint((100).percent(), (4).pixels()))
        .setChildOf(ScrollContainer)

        const scrollbar = new UIRoundedRectangle(4)
        .setColor(Color.BLACK)
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth((6).pixels())
        .setHeight((20).pixels())
        .setChildOf(ScrollBarContainer)

        const scrollbarColor = new UIRoundedRectangle(4)
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setX((1).pixels())
        .setY((0).pixels())
        .setWidth((4).pixels())
        .setHeight((100).percent())
        .setChildOf(scrollbar)

        this.Scroll = new ScrollComponent()
        .setX((2).pixels())
        .setY((0).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (12).pixels()))
        .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
        .setChildOf(ScrollContainer);

        this.Scroll.setVerticalScrollBarComponent(scrollbar);

        //New format button

        
        const bottomContainer = new UIContainer()
        .setWidth((100).percent())
        .setHeight(new ChildBasedSizeConstraint)
        .setX(new CenterConstraint)
        .setY((0).pixels(true))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .setChildOf(this.element)

        const saveButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX((5).pixels())
        .setY(new CenterConstraint)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            //Code to save file
        })
        .setChildOf(bottomContainer)

        const saveButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(saveButton)
        
        const saveButtonText = new UIText("Save")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(saveButtonTextContainer)

        const newButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((50).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX((5).pixels(true))
        .setY(new CenterConstraint)
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            //Code to create new format
        })
        .setChildOf(bottomContainer)

        const newButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(newButton)

        const newButtonText = new UIText("New")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(newButtonTextContainer)
    }

    createFormatButton(text = "Example Text") {
        const formatButton = new UIRoundedRectangle(4)
        .setX((0).pixels())
        .setY(new AdditiveConstraint(new SiblingConstraint, (2).pixels()))
        .setColor(new Color(41 / 255, 47 / 255, 69 / 255))
        .setWidth((100).percent())
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .onMouseClick((comp) => {
            //Code to open the editor tab
        })
        .setChildOf(this.Scroll)

        const formatButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(((10).pixels()))
        .setChildOf(formatButton)

        const formatButtonText = new UIText(text)
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(formatButtonTextContainer)

        this.formatButtons.push(formatButton)
    }

    createFormatButtons() {
        this.formats.forEach((formatname) => this.createFormatButton(formatname))
    }

    deleteFormatButtons() {
        this.formatButtons.forEach((button) => button.getParent().removeChild(button))
        this.formatButtons = []
    }

    updateText() {
        let text = this.pathSelector.getText()
        if(text == "") {
            this.text = "Pridge/customFormating"
        }
        else {
            this.text = text
        }
    }

    getDirectoryPaths() {
        return new Format(Config.modulesFolder + "/" + this.text).list()?.filter((text) => text.endsWith(".json"))
    }

    updateFormatPath() {
        this.updateText()
        this.formats = this.getDirectoryPaths()
        this.deleteFormatButtons()
        this.createFormatButtons()
    }
}