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

import { blankFormating, Color } from "../../constants";
import { imageFromName } from "../../functions";
import { jsonLink } from "../../../Pridge/constants"
import checkboxWidget from "./checkboxWidget";

export default class newFile {
    constructor(guiHandler, directory) {

        this.guiHandler = guiHandler
        this.directory = directory
        
        this.element = new UIRoundedRectangle(5)
        .setWidth((30).percent())
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (25).pixels()))
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setColor(new Color(0, 9/255, 38/255, 1))

        //Close Button

        const closeButton = new UIImage.ofFile(imageFromName("buttonImages/closeButton.png"))
        .setX((5).pixels())
        .setY((5).pixels())
        .setWidth(new AspectConstraint(1))
        .setHeight((16).pixels())
        .onMouseClick((comp) => {
            this.guiHandler.unhideElement("fileSelector")
            this.guiHandler.deleteElement("newFile")
        })
        .setChildOf(this.element)

        //Filename input

        this.nameInput = new UITextInput("Filename")
        .setX((5).pixels())
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight((10).pixels())

        const nameBox = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, ((5).pixels())))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.nameInput.grabWindowFocus();
        })
        .setChildOf(this.element)

        this.nameInput.setChildOf(nameBox)

        this.presetCheckbox = new checkboxWidget(new CenterConstraint, new AdditiveConstraint(new SiblingConstraint, ((5).pixels())), new SubtractiveConstraint((100).percent(), (10).pixels()), (20).pixels(), this.element)

        //Create file button

        const newButton = new UIRoundedRectangle(3)
        .setWidth(new SubtractiveConstraint((100).percent(), (10).pixels()))
        .setHeight(new AdditiveConstraint(new ChildBasedSizeConstraint, (10).pixels()))
        .setX(new CenterConstraint)
        .setY(new AdditiveConstraint(new SiblingConstraint, ((5).pixels())))
        .setColor(new Color(29/255, 33/255, 48/255, 1))
        .onMouseClick((comp) => {
            this.createFile()
        })
        .setChildOf(this.element)

        const newButtonTextContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new CenterConstraint)
        .setWidth(new ChildBasedSizeConstraint)
        .setHeight(((10).pixels()))
        .setChildOf(newButton)

        const newButtonText = new UIText("Create")
        .setX((0).pixels())
        .setY((0).pixels())
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(newButtonTextContainer)
    }

    createFile() {
        let filename = this.nameInput.getText()
        if(filename == "") {
            this.nameInput.setColor(Color.RED)
            animate(this.nameInput, (animation) => {
                animation.setColorAnimation(
                    Animations.OUT_EXP,
                    1,
                    new ConstantColorConstraint(Color.WHITE)
                )
            });
        }
        else {
            try {
                let data = JSON.stringify(blankFormating, null, 4)
                if(this.presetCheckbox.getState()) {
                    data = FileLib.getUrlContent(jsonLink)
                }
                FileLib.write(this.directory+filename+".json", data)
            }
            catch(error) {
                ChatLib.chat("&c&lUpdate your chattriggers!!!")
                console.error(error)
            }
            this.guiHandler.unhideElement("fileSelector")
            this.guiHandler.getElement("fileSelector").updateFilePath()
            this.guiHandler.deleteElement("newFile")
        }        
    }
}