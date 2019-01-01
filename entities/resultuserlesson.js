class ResultUserLesson{
        constructor(user, lesson, timestamp, percentCorrect) {
            this.user = user;
            this.lesson = lesson;
            this.timestamp = timestamp;
            this.percentCorrect = percentCorrect;
        }
    }
    
    module.exports = ResultUserLesson;