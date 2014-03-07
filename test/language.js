var
    // Libraries
    fs = require('fs'),

    assert = require('assert'),

    path = require('path'),

    properties = require('enumerate-properties'),

    // Test variables
    languageFolder = __dirname + "/../language",

    // The reference language file
    refLanguage = "en.json",

    // The parsed reference language. Code will just fail if the file is bad formatted or doesn't exist
    refObject = require(path.join(languageFolder, refLanguage)),

    // Array of other languages to compare to the ref
    otherLanguages = fs.readdirSync(languageFolder).filter(function(item){ return item !== refLanguage });

describe("language", function(){

    it("should have a reference language", function(){
        assert(refObject !== null, "No reference object for reference language " + refLanguage);
    });

    it("all languages should contain each string contained in the reference language", function(){
        otherLanguages.forEach(function(item){
            // reads and parses the lang file
            var lang = JSON.parse(fs.readFileSync(path.join(languageFolder, item)));
            // enumerates the ref object properties
            properties.enumerate(refObject, function (key) {
                assert(properties.getAtPath(lang, key) !== null, "Property " + key + " not found in " + item);
            });
        });
    });

});
