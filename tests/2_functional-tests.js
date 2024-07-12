const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let threadText = "I'm a thread!";
let replyText = "I'm a reply!";
let password = "password";
let threadID;
let replyID;

suite('Functional Tests', function() {

    suite('Test /api/threads/{board} Create Initial Thread', function(){
        
        test('POST: Creating a new thread - /api/threads/{board}', function(done){
            chai.request(server)
            .post('/api/threads/test')
            .send({
                text: threadText,
                delete_password: password,
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                threadID = res.body._id;
                threadTime = res.body.bumped_on;
                assert.equal(res.body.text, threadText);
                console.log(threadID);
                done();
            });
        });
        
        test('GET: Viewing the 10 most recent threads with 3 replies each - /api/threads/{board}', function(done){
            chai.request(server)
            .get('/api/threads/test')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.isBelow(res.body.length, 11);
                res.body.forEach((thread) => {
                    assert.isBelow(thread.replies.length, 4);
                });
                done();
            });
        });

    });

    suite('Test /api/replies/{board}', function(){
   
        test('POST: Creating a new reply - /api/replies/{board}', function(done){
            chai.request(server)
            .post('/api/replies/test')
            .send({
                thread_id: threadID,
                text: replyText,
                delete_password: password
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                replyID = res.body.replies[0]._id;
                assert.equal(res.body.replies[0].text, replyText);
                done();
            });
        });
        
        test('GET: Viewing a single thread with all replies - /api/replies/{board}', function(done){
            chai.request(server)
            .get(`/api/replies/test?thread_id=${threadID}`)
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.replies.length, 1);
                done();
            });
        });
        
        test('DELETE: Deleting a reply with the incorrect password - /api/replies/{board}', function(done){
            chai.request(server)
            .delete('/api/replies/test')
            .send({
                thread_id: threadID,
                reply_id: replyID,
                delete_password: 'WrOnGPasSWorD!'
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'incorrect password');
                done();
            });
        });

        test('PUT: Reporting a reply: PUT request - /api/replies/{board}', function(done){
            chai.request(server)
            .put('/api/replies/test')
            .send({
                thread_id: threadID,
                reply_id: replyID
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'reported')
                done();
            });
        });
        
        
        test('DELETE: Deleting a reply with the correct password - /api/replies/{board}', function(done){
            chai.request(server)
            .delete('/api/replies/test')
            .send({
                thread_id: threadID,
                reply_id: replyID,
                delete_password: password
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'success');
                done();
            });
        });
        
        
    });

    suite('Test /api/threads/{board} Delete Created Threads', function(){

        test('DELETE: Deleting a thread with the incorrect password - /api/threads/{board}', function(done){
            chai.request(server)
            .delete('/api/threads/test')
            .send({
                thread_id: threadID,
                delete_password: 'WrOnGPAssWorD!'
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'incorrect password');
                done();
            });
        });
        
        test('PUT: Reporting a thread: PUT request - /api/threads/{board}', function(done){
            chai.request(server)
            .put('/api/threads/test')
            .send({
                thread_id: threadID,
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'reported');
                done();
            });
        });
        
        test('DELETE: Deleting a thread with the correct password - /api/threads/{board}', function(done){
            chai.request(server)
            .delete('/api/threads/test')
            .send({
                thread_id: threadID,
                delete_password: password
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'success');
                done();
            });
        });
        
    });

});
