export const Color = Java.type("java.awt.Color");

export const baseFormats = {
    string: {
        type: "string",
        trigger: "",
        finalFormat: ""
    },
    stringarray: {
        type: "stringArray",
        trigger: [],
        finalFormat: ""
    },
    regex :{
        type: "regex",
        trigger: "",
        finalFormat: "",
        groupFormating: {}
    },
    special : {
        type: "special",
        trigger: "",
        functionName: ""
    }
}

export const blankFormating = {
    version: "0.0.1",
    formats: []
}