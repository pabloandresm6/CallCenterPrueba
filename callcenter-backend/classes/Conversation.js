const Utils = require("./Utils");

function Conversation(name,lines, pointsMessages, pointsCoincidences, pointsGratefulWords, pointsTimeDuration, pointsAbandonedConversation, pointsTotal ) { 
    this.name = name || "";
    this.lines = lines || [];
    this.pointsMessages = pointsMessages || 0;
    this.pointsCoincidences = pointsCoincidences || 0;
    this.pointsGratefulWords = pointsGratefulWords || 0;
    this.pointsTimeDuration = pointsTimeDuration || 0;
    this.pointsAbandonedConversation = pointsAbandonedConversation || 0;
    this.pointsTotal = pointsTotal || 0;
}

Conversation.prototype.getName = function() {
    return this.name;
}

Conversation.prototype.setName = function(name) {
    this.name = name;
}

Conversation.prototype.getLines = function() {
    return this.lines;
}

Conversation.prototype.setLines = function(lines) {
    this.lines = lines;
}

Conversation.prototype.getPointsMessages = function() {
    return this.pointsMessages;
}

Conversation.prototype.setPointsMessages = function(lines) {
    this.pointsMessages = lines.length <= 5 ?  20 : 10 ;
}

Conversation.prototype.getPointsCoincidences = function(word,lines) {
    
    return this.pointsCoincidences;
}

Conversation.prototype.setPointsCoincidences = function(word, lines) {
    let count = 0;

    lines.forEach(element => {
        let split = element.split(' ');
        
        split.forEach(item => {           
            if(item.includes(word)) {
                count = count + 1;
            }
        }); 
    });

    this.pointsCoincidences = count <= 2 ? 5 : 10;
}

Conversation.prototype.getPointsGratefulWords = function() {
    
    return this.pointsGratefulWords;
}

Conversation.prototype.setPointsGratefulWords = function(list, lines) {
         
    let count = 0;

    for(var i = 0; i < lines.length; i++) {

        if(count === 100){
           break;
        }

        for(var j = 0; j < list.length; j++) {
            
            if(lines[i].includes(list[j])) {
                
                if(j === list.length - 1){
                   count = count + 100;
                   break;
                }
                else {
                    count = count + 10;
                }

            }
        }
    }

    this.pointsGratefulWords = count;
}



Conversation.prototype.getPointsTimeDuration = function() {
    return this.pointsTimeDuration;
}

Conversation.prototype.setPointsTimeDuration = function(pointsTimeDuration) {
    this.pointsTimeDuration = pointsTimeDuration;
}

Conversation.prototype.getPointsAbandonedConversation = function() {
    return this.pointsAbandonedConversation;
}

Conversation.prototype.setPointsAbandonedConversation = function(lines) {
    this.pointsAbandonedConversation = lines.length <= 1 ? -100 : 0;
}

Conversation.prototype.getPointsTotal = function() {
    return this.pointsTotal;
}

Conversation.prototype.setPointsTotal = function() {
    this.pointsTotal = this.getPointsGratefulWords() >= 100 ? (parseInt(this.getPointsMessages()) + parseInt(this.getPointsCoincidences()) + parseInt(this.getPointsGratefulWords())) : (parseInt(this.getPointsMessages()) + parseInt(this.getPointsCoincidences()) + parseInt(this.getPointsGratefulWords()) + parseInt(this.getPointsTimeDuration()) + parseInt(this.getPointsAbandonedConversation()));
}


module.exports = Conversation;