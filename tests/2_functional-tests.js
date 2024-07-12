const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite('Test /api/threads/{board}', function(){
        
        test('POST: Creating a new thread - /api/threads/{board}', function(done){
            chai.request(server)
            .post('/api/threads/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });
        
        test('GET: Viewing the 10 most recent threads with 3 replies each - /api/threads/{board}', function(done){
            chai.request(server)
            .get('/api/threads/general')
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });
        
        test('DELETE: Deleting a thread with the incorrect password - /api/threads/{board}', function(done){
            chai.request(server)
            .delete('/api/threads/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });

        test('DELETE: Deleting a thread with the correct password - /api/threads/{board}', function(done){
            chai.request(server)
            .delete('/api/threads/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });

        test('PUT: Reporting a thread: PUT request - /api/threads/{board}', function(done){
            chai.request(server)
            .put('/api/threads/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });

    });

    suite('Test /api/replies/{board}', function(){
        
        test('POST: Creating a new reply - /api/replies/{board}', function(done){
            chai.request(server)
            .post('/api/replies/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });
        
        test('GET: Viewing a single thread with all replies - /api/replies/{board}', function(done){
            chai.request(server)
            .get('/api/replies/general')
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });
        
        test('DELETE: Deleting a reply with the incorrect password - /api/replies/{board}', function(done){
            chai.request(server)
            .delete('/api/replies/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });

        test('DELETE: Deleting a reply with the correct password - /api/replies/{board}', function(done){
            chai.request(server)
            .delete('/api/replies/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });

        test('PUT: Reporting a reply: PUT request - /api/replies/{board}', function(done){
            chai.request(server)
            .put('/api/replies/general')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Tests - Every field filled in',
                assigned_to: 'Chai and mocha',
                status_text: 'In QA',
            })
            .end(function(err, res){
                assert.equal(res.status, 200);
                done();
            });
        });

    });


});
