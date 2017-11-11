const Live = require('./../models/live');

module.exports = {
    getMessages(req, res, next) {
        Live.find({}).sort({ _id: -1 }).populate('userId').limit(10)
            .then(messages => {
                res.messages = messages;
                return next();
            });
    },
    createMessage(message) {
        const live = new Live(message);
        return new Promise((resolve, reject) => {
            
            live.save((err, message) => {
                if (err) return reject();
                
                return resolve(Live.findOne(message).populate('userId')
                                .then(message => message));
            });
        });
    }
};