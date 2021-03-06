
/**
 *  Users Integration Test
 *  Created by create-test script @ Sat Aug 13 2011 19:49:58 GMT+0000 (UTC)
 **/
/**
 * Dependencies
 */
var assert = require('assert'), inflection = require('lib/inflection'), mongoose = require('mongoose'), should = require('should'); 

/**
 * Variables to drive testing
 */
var model = 'user';
var app = require('app').boot();
var id;

/**
 * Simple expresso tests for the AppController
 */
module.exports = {
		    
		'Shows an index page that contains the container name in the response with a 200 status code': function(done){	
			
			var controller = model.pluralize().toLowerCase();			
			assert.response(app, {
			    url: '/' + controller ,
			    method: 'GET'
			}, function(res) {
				res.statusCode.should.equal(200);
				res.body.should.include.string(controller);
			    done();
			});			
			
		},
		'Adding a new object returns a 302 redirect where the new location contains the id of the newly created object': function(done){			
			
			var controller = model.pluralize().toLowerCase();
			var data = model + '[name]=OriginalName';		
			
			assert.response(app, {
			    url: '/' + controller,
			    method: 'POST',
			    headers: {'host':'dummyhost','Content-Length': data.length,'Content-Type':'application/x-www-form-urlencoded'},
			    data: data
			}, function(res) {
				res.statusCode.should.equal(302);
				id = res.headers['location'].split("/")[res.headers['location'].split("/").length-1];				
				done();
			});	
						
		},
		'Viewing an existing object returns a page that contains the object ID and a 200 status code': function(done){									
			assert.response(app, {
			    url: '/' + model + '/' + id,
			    method: 'GET'
			}, function(res) {
				res.statusCode.should.equal(200);
				res.body.should.include.string(id);				
				done();
			});							
		},		
		'Viewing a page limited view of the index with .json format returns a JSON list containing the object ID and 200 status code': function(done){									

			var controller = model.pluralize().toLowerCase();

			assert.response(app, {
			    url: '/' + controller + '/1-100.json',   // Test database should be empty for this test
			    method: 'GET'
			}, function(res) {
				res.statusCode.should.equal(200);
				res.body.should.include.string(id);
				res.headers['content-type'].should.equal('application/json');
				done();
			});							
		},		
		'View existing object with .json format returns a JSON object containing its ID and a 200 status code ': function(done){									
			assert.response(app, {
			    url: '/' + model + '/' + id + '.json',
			    method: 'GET'
			}, function(res) {
				// Find the ID text on the page
				res.statusCode.should.equal(200);
				res.body.should.include.string(id);
				res.headers['content-type'].should.equal('application/json');				
				done();
			});							
		},
		'Updating an object redirects to 302 where the new location contains the ID': function(done){			
			
			var data = model + '[name]=ModifiedName';			
			assert.response(app, {
			    url: '/' + model + '/' + id,
			    method: 'PUT',
			    headers: {'host':'dummyhost','Content-Length': data.length,'Content-Type':'application/x-www-form-urlencoded'},
			    data: data
			}, function(res) {
				res.statusCode.should.equal(302);
				res.headers['location'].should.include.string(id);
				res.headers['location'].should.equal('http://dummyhost/' + model + '/' + id);				
				done();
			});	
						
		},
		'Viewing the updated object shows the modified data and a 200 status code': function(done){			
			
			assert.response(app, {
			    url: '/' + model + '/' + id,
			    method: 'GET'
			}, function(res) {				
				res.statusCode.should.equal(200);
				res.body.should.include.string(id);
				res.body.should.include.string('ModifiedName');
				done();
			});		
						
		},		
		'Deleting the object returns a 200 status code': function(done){			
			
			assert.response(app, {
			    url: '/' + model + '/' + id,
			    method: 'DELETE'
			}, function(res) {
				res.statusCode.should.equal(200);
				done();
			});		
						
		},
		'Viewing a deleted object returns the default error page': function(done){  // Should this really be a 404???			
			
			assert.response(app, {
			    url: '/' + model + '/' + id,
			    method: 'GET'
			}, function(res) {
				res.statusCode.should.equal(200);
				res.body.should.include.string('Sorry an error has occurred');
				done();
			});	
						
		},
		tearDown: function(done){
		   mongoose.disconnect();
		   done();
		}
		
};