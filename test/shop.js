const app = require('../app');
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;

chai.use(chaiHttp)

let token = '';
let user_id = '';
let token_buyer = '';
let item_id = '';
let shop_id = '';

before(function(done) {
  let data = {
    name : 'Rangga Kusuma',
    phone : '0812345678',
    address : 'Hacktiv8 Jakarta Selatan',
    username: 'rangga321',
    role: 'seller',
    password: 'ranggarangga',
    brand: 'mie ayam'
}
  //NOTE: CHAI REGISTER & LOGIN    
  chai
  .request(app)
  .post('/register')
  .send(data)
  .end(function(err, result) {
    user_id = result.body.data._id;
    chai
    .request(app)
    .post('/login')
    .send(data)
    .end(function(err, result) {
      token = result.body.token;

      let dataBuyer = {
        name : 'Hedya',
        phone : '0812345678',
        address : 'Hacktiv8 Jakarta Selatan',
        username: 'hedya',
        role: 'buyer',
        password: 'hedya',
      }
      chai
      .request(app)
      .post('/register')
      .send(dataBuyer)
      .end(function(err, result) {
        chai
        .request(app)
        .post('/login')
        .send(dataBuyer)
        .end(function(err, result) {
          token_buyer = result.body.token;
          // user_id = result.body.data._id;
          done();
        })
      })
    })
  })
})

describe('Testing for creating shop', () => {
  it('Should send success message when creating new shop', (done) => {
    const brand = 'Mie Ayam Top Markotop'
    chai.request(app)
        .post('/shop')
        .set('auth', token)
        .send({brand})
        .end((err, result) => {
          shop_id = result.body.shopId._id;
          expect(result).to.have.status(201)
          expect(result.body).to.have.property('_id')
          expect(result.body).to.have.property('name')
          expect(result.body).to.have.property('phone')
          expect(result.body).to.have.property('address')
          expect(result.body).to.have.property('username')
          expect(result.body).to.have.property('role')
          expect(result.body).to.have.property('shopId')
          expect(result.body.shopId).to.have.property('_id')
          expect(result.body.shopId).to.have.property('brand')
          expect(result.body.shopId.brand).to.be.a('string')
          expect(result.body.shopId.brand).to.equal(brand)
          done()
        })
  })
  it('Should return error message brand required', (done) => {
    const brand = 'Mie Ayam Top Markotop'
    chai.request(app)
        .post('/shop')
        .set('auth', token)
        .send({brandName: brand})
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('brand')
          expect(result.body.brand).to.be.an('object')
          expect(result.body.brand).to.have.property('message')
          expect(result.body.brand.message).to.equal('Name of brand is required')
          done()
        })
  })
  it('Should return error message not authorized', (done) => {
    const brand = 'Mie Ayam Top Markotop'
    chai.request(app)
        .post('/shop')
        .set('auth', token_buyer)
        .send({brand})
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.be.a('string')
          expect(result.body.message).to.equal('You are not authorized to access')
          done()
        })
  })
})

describe('Testing for find shop detail', () => {
  it('Should send success message when find shop detail', (done) => {
    chai.request(app)
        .get(`/shop/${shop_id}`)
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('_id')
          expect(result.body._id).to.equal(shop_id)
          expect(result.body).to.have.property('brand')
          expect(result.body).to.have.property('itemList')
          expect(result.body.itemList).to.be.an('array')
          done()
        })
  })
  it('Should send error message when find shop detail', (done) => {
    chai.request(app)
    .get(`/shop/${user_id}`)
    .set('auth', token)
    .end((err, result) => {
      expect(result).to.have.status(400)
      expect(result.body).to.have.property('message')
      expect(result.body.message).to.be.a('string')
      expect(result.body.message).to.equal('Shop not found')
      done()
    })
  })
})

describe('Testing for find all shop', () => {
  it('Should send success message of all shops', (done) => {
    chai.request(app)
        .get('/shop')
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.be.an('array')
          expect(result.body[0]).to.have.property('itemList')
          expect(result.body[0]).to.have.property('_id')
          expect(result.body[0]).to.have.property('brand')
          done()
        })
  })
})

describe('Testing for updating shop brand', () => {
  it('Should send success message when update shop brand', (done) => {
    const brand = 'Mie Ayam Top Markotop SeJakarta'
    chai.request(app)
        .put(`/shop/${shop_id}`)
        .set('auth', token)
        .send({brand})
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('_id')
          expect(result.body._id).to.equal(shop_id)
          expect(result.body).to.have.property('brand')
          expect(result.body).to.have.property('itemList')
          expect(result.body.brand).to.be.a('string')
          expect(result.body.brand).to.equal(brand)
          done()
        })
  })
  it('Should send error message when update shop brand', (done) => {
    const brand = 'Mie Ayam Top Markotop SeJakarta'
    chai.request(app)
        .put(`/shop/${shop_id}`)
        .set('auth', token)
        .send({brandName: brand})
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.be.a('string')
          expect(result.body.message).to.equal('Brand name cannot be empty')
          done()
        })
  })
})