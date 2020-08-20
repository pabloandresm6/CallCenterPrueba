const Conversation = require('./Conversation');

const moment = require('moment');

let gratefulList =  ['Gracias','Buena Atención','Muchas Gracias','EXCELENTE SERVICIO'];

const processDates = (lines) => {

    let timeArray = [];

    lines.forEach(element => {
        let extractTime = element.match(/\b\d+\b/g).join(':');
        timeArray.push(extractTime);
    });

    timeArray.sort((a,b) => {
       return a.localeCompare(b);
    });

    let startTime = moment(timeArray[timeArray.length - 1], "HH:mm:ss");
    let stopTime = moment(timeArray[0], "HH:mm:ss");
    

    var duration = moment.duration(startTime.diff(stopTime));
    let minutes = parseInt(duration.asMinutes()) % 60;

    return minutes < 1 ? 50 : 25;

}

class Utils  {  
    
    static readFile (fs) {
            return fs.readFileSync('./files/historial_de_conversaciones.txt',{ encoding: 'utf8' });
    }    

    static processData (data) {
        
        let conversation = new Conversation();
        let lines = [];  
        let conversations = [];      
        let split = data.split(/\r?\n/);

        split.forEach(function (item, index) {
            if(item === '') {
                 conversation.setLines(lines);
                 conversations.push(conversation);
                 conversation.setPointsMessages(conversation.lines);
                 conversation.setPointsCoincidences('URGENTE',conversation.lines);
                 conversation.setPointsGratefulWords(gratefulList,conversation.lines);
                 conversation.setPointsTimeDuration(processDates(conversation.lines));
                 conversation.setPointsAbandonedConversation(conversation.lines);
                 conversation.setPointsTotal();
                 conversation = new Conversation();
                 lines = [];
            } 
            else if(item.match(/^\d/)) {
                 lines.push(item);
                 if(index === (split.length -1)) {
                    conversation.setLines(lines);
                    conversations.push(conversation);
                    conversation.setPointsMessages(conversation.lines);
                    conversation.setPointsCoincidences('URGENTE',conversation.lines);
                    conversation.setPointsGratefulWords(gratefulList,conversation.lines);
                    conversation.setPointsTimeDuration(processDates(conversation.lines));
                    conversation.setPointsAbandonedConversation(conversation.lines);
                    conversation.setPointsTotal();
                    conversation = new Conversation();
                    lines = [];
                 }
            }
            else {
                 conversation.setName(item);
            }

        });

        return conversations;
    }

}

module.exports = Utils;