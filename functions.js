export function imageFromName(name) {
    return new java.io.File(`./config/Chattriggers/modules/PridgeEditor/${name}`)
}

import {
    UIText
} from "../Elementa";

export function UIVanillaText() {
    let text = new Text("")
    return new JavaAdapter(UIText, {
        draw() {
            Tessellator.pushMatrix()
            text.setString(this.getText()).setShadow(this.getShadow()).setScale(1)
            text.setScale(this.getHeight()/text.getHeight())
            LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line) * text.getScale()))
            if(LongestLine > this.getWidth()) {
                LongestLine = Math.max(...text.getLines().map((line) => Renderer.getStringWidth(line)))
                text.setScale(this.getWidth()/LongestLine)
            }
            text.draw(this.getLeft(), this.getTop()+(this.getHeight()/2)-(text.getHeight()/2)+(1*text.getScale()))
            Tessellator.popMatrix()
        }
    });
}