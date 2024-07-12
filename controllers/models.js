const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageBoardSchema = new Schema({
    // MessageBoardSchema will hava a unique _id by default
    board: { type: String, required: true },
    text: { type: String, required: true},
    created_on: { type: Date, required: true},
    bumped_on: {type: Date, required: true},
    replies: [
        {
            // Give each MessageBoardSchema reply object its own unique _id for reference
            _id: {type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId()},
            text: {type: String, required: true},
            created_on: {type: Date, required: true},
            reported: {type: Boolean, default: false},
            delete_password: {type: String, required: true},
        },
    ],
    reported: {type: Boolean, default: false},
    delete_password: {type: String, required: true}
});

const MessageBoard = mongoose.model("MessageBoard", MessageBoardSchema);

exports.MessageBoard = MessageBoard
