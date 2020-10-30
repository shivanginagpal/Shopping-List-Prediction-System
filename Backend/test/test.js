/* test/test.js */
var app = require('../server');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var ROOT_URL = 'http://localhost:5005';
var should = require('chai').should();
var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWEzYjQ4NjhlMjU2MmY1NDU5YTIzNyIsIm5hbWUiOiJURVNUIFVTRVIgMSIsImlhdCI6MTYwNDAwMTg2NywiZXhwIjoxNjA0MDA1NDY3fQ.-SFwX1X5bGrQOgoDJ85c8qFflNxgEhpU7gNDpgfkOIU"
describe('Shopping List Prediction Mocha Tests', () => {
    // SignUp User
    it("Test Case 1 -  SIGN UP USER Post", (done) => {
        const data = {
            "name": 'TEST USER 1',
            "email": 'testuser@gmail.com',
            "password": 'abc@123',
        }
        chai.request(ROOT_URL)
            .post('/signUpUser')
            .send(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    //SignIn User
    it("Test Case 2 -  SignIn User Post", (done) => {
        const data = {
            "email": 'testuser@gmail.com',
            "password": 'abc@123',
        }

        chai.request(ROOT_URL)
            .post('/signIn')
            .send(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                done();
            });
    })

    //Create a shopping List
    it("Test Case 3 - Create a Shopping List", (done) => {
        const data = {
            "listName": "Test List 1"
        }
        chai.request(ROOT_URL)
            .post(`/createNewList`)
            .set("Authorization", token)
            .send(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    //Add an Item to the list
    it("Test Case 4 - Put an item in the shopping List", (done) => {
        const data = {
            "list_id": "5f9a533086a1e7320d65d6c8",
            "itemName": "Pumpkin Muffin Mix",
            "quantity": 1,
            "product_id": 50
        }

        chai.request(ROOT_URL)
            .put(`/addItemToList`)
            .set("Authorization", token)
            .send(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })


    //Delete an Item from the list
    it("Test Case 5 - Delete an item from the shopping List", (done) => {
        const data = {
            "list_id": "5f9a533086a1e7320d65d6c8",
            "item_id": "5f9a569b60d8083311ed4f30",
        }

        chai.request(ROOT_URL)
            .delete(`/deleteItemFromList`)
            .set("Authorization", token)
            .query(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    // Get User's List
    it("Test Case 6 -  Get All Lists for the User", (done) => {
        chai.request(ROOT_URL)
            .get(`/getList`)
            .set("Authorization", token)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    //Get Items from the list
    it("Test Case 7 -  Get All Items from the List", (done) => {
        chai.request(ROOT_URL)
            .put(`/getitemsfromList`)
            .set("Authorization", token)
            .send({ "list_id": '5f9a533086a1e7320d65d6c8' })
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    //Post: Buy Item from the list
    it("Test Case 8 - Buy Item from the list", (done) => {

        const data = {
            "list_id": "5f9a533086a1e7320d65d6c8",
            "item_id": "5f9a62156dd4e734c4749134"
        }
        chai.request(ROOT_URL)
            .post(`/buyItemFromList`)
            .set("Authorization", token)
            .send(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    // Update an item shopping List
    it("Test Case 9 - Update an Item in the Shopping List", (done) => {

        const data = {
            "list_id": "5f9a533086a1e7320d65d6c8",
            "item_id": "5f9b0e07434bc6369e13c12f",
            "quantity": 2,
            "store": "Walmart"
        }
        chai.request(ROOT_URL)
            .post(`/updateItemToList`)
            .set("Authorization", token)
            .send(data)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

    //get Item By Id
    it("Test Case 10 -  Get Item by Id", (done) => {
        chai.request(ROOT_URL)
            .get(`/items/5f9b0e07434bc6369e13c12f`)
            .end((err, res) => {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                done();
            });
    })

})