const MessageBoard = require("../controllers/models").MessageBoard;
const BCryptFunctions = require('../controllers/encrypt');
const bcryptFunc = new BCryptFunctions(); 
class DBFunctions {

    async createThread(board, text, delete_password) {
        const currentTime = new Date();
        const newThread = new MessageBoard({
            board: board,
            text: text,
            delete_password: bcryptFunc.encryptString(delete_password),
            created_on: currentTime,
            bumped_on: currentTime,
        });
        const result = await newThread.save();
        return result
    }

    async deleteThread(_id, board, delete_password) {
        const thread = await MessageBoard.findById({_id: _id});
        if (thread) {
            if (thread.board.toLowerCase() == board.toLowerCase()){
                let result = bcryptFunc.comparePWString(delete_password, thread.delete_password);
                if (result) {
                    await MessageBoard.findByIdAndDelete({_id: _id});
                    return 'success'
                }
            }
        }
        return 'incorrect password'
    }

    async getThread(board) {
        let threads = await MessageBoard.find({ board }).sort("-bumped_on").populate("replies")

        threads = threads.map(thread => {
            let threadToView = {
                _id: thread._id,
                text: thread.text,
                created_on: thread.created_on,
                bumped_on: thread.bumped_on,
                replies: thread.replies.sort((a, b) => a.created_on - b.created_on).slice(0, 3).map(reply_info => {
                    let reply_info = {
                        _id: reply._id,
                        text: reply.text,
                        created_on: reply.created_on,
                    }
                    return reply_info
                }),
            }
            return threadToView
        }).slice(0, 10)
        return threads
    }

    async reportThread(board, _id) {
        let thread = await MessageBoard.findById({_id: _id});
        if (thread) {
            if (!thread.reported) {
                thread.reported = true;
                let newThread = await MessageBoard.findByIdAndUpdate(thread._id, { reported: true }, {new: true});
                return 'reported'
            }
            return 'reported'
        }
        return false
    }

    async createReply(board, _id, text, delete_password) {
        const currentTime = new Date();
        const newReply = {
            text: text,
            delete_password: bcryptFunc.encryptString(delete_password),
            created_on: currentTime
        }
        let thread = await MessageBoard.findById({_id: _id});
        if (thread) {
            if (thread.board == board){
                thread.replies.push(newReply);
                thread.bumped_on = currentTime;
                let updatedThread = await thread.save()
                return updatedThread
            }
            return thread
        }
        return false
    }

}

module.exports = DBFunctions