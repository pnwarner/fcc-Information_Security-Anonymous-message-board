'use strict';
const DBFunctions = require('../controllers/db-functions');
const dbFunc = new DBFunctions();
module.exports = function (app) {
    
  app.route('/api/threads/:board')
    .get(async (req, res) => {
      const { board } = req.params;
      let result = await dbFunc.getThread(board);
      res.json(result)
    })
    .delete(async (req, res) => {
      const { board } = req.params;
      const { thread_id, delete_password } = req.body;
      const result = await dbFunc.deleteThread(thread_id, board, delete_password);
      res.send(result);
    })
    .post(async (req, res) => {
      const { board } = req.params;
      const { text, delete_password } = req.body;
      const newThread = await dbFunc.createThread(board, text, delete_password);
      res.json(newThread);
    })
    .put(async (req, res) => {
      console.log('threads - put');
      const {board} = req.params;
      let _id;
      if (req.body.thread_id) {
        _id = req.body.thread_id;
      } else if (req.body.report_id) {
        _id = req.body.report_id;
      }
      let result = await dbFunc.reportThread(board, _id);
      res.send(result);
    });
    
  app.route('/api/replies/:board')
    .get(async (req, res) => {
      console.log(req.body);
      console.log('replies - get');
      res.json({return: 'return'});
    })
    .delete(async (req, res) => {
      console.log('replies - delete');
      res.json({return: 'return'});
    })
    .post(async (req, res) => {
      console.log('replies - post');
      const { board } = req.params;
      const { thread_id, text, delete_password } = req.body;
      let updatedThread = await dbFunc.createReply(board, thread_id, text, delete_password);
      res.json(updatedThread);
    })
    .put(async (req, res) => {
      console.log('replies - put');
      res.json({return: 'return'});
    });

};
