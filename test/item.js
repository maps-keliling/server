const app = require('../app');
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;

chai.use(chaiHttp)

let token = '';
let user_id = '';
let token_buyer = '';
let item_id = '';

before(function(done) {
  let data = {
    name : 'Rangga Kusuma',
    phone : '0812345678',
    address : 'Hacktiv8 Jakarta Selatan',
    username: 'rangga123',
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
    // user_id = result.body.data._id;
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

describe('Testing for create item', () => {
  it('Should return success created item', (done) => {
    const namaBarang = {
      name: 'bakso',
      price: 15000,
    }
    chai.request(app)
        .post('/items')
        .set('auth', token)
        .send(namaBarang)
        .end((err, result) => {
          expect(result).to.have.status(201)
          expect(result.body).to.have.property('_id')
          expect(result.body).to.have.property('itemList')
          expect(result.body.itemList).to.be.an('array')
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('_id')
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('name')
          expect(result.body.itemList[result.body.itemList.length-1].name).to.equal(namaBarang.name)
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('price')
          expect(result.body.itemList[result.body.itemList.length-1].price).to.equal(namaBarang.price)
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('picture')
          done()
        })
  })
  it('Should return success create new item with image :', (done) => {
    const namaBarang = {
      name: 'bakso',
      price: 15000,
    }
    chai.request(app)
        .post('/items')
        .set('auth', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('Content-Type', 'multipart/form-data')
        .field('fileName', 'girl.png')
        .field('name', namaBarang.name)
        .field('price', namaBarang.price)
        .attach('file', './girl.png')
        .end((err, result) => {
          item_id = result.body.itemList[result.body.itemList.length-1]._id;
          expect(result).to.have.status(201)
          expect(result.body).to.have.property('_id')
          expect(result.body).to.have.property('itemList')
          expect(result.body.itemList).to.be.an('array')
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('_id')
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('name')
          expect(result.body.itemList[result.body.itemList.length-1].name).to.equal(namaBarang.name)
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('price')
          expect(result.body.itemList[result.body.itemList.length-1].price).to.equal(namaBarang.price)
          expect(result.body.itemList[result.body.itemList.length-1]).to.have.property('picture')
          done()
        })
  })
  it('Should return error name item required', (done) => {
    const namaBarang = {
      nama: 'bakso',
      price: 15000,
    }
    chai.request(app)
        .post('/items')
        .set('auth', token)
        .send(namaBarang)
        .end((err, result) => {
          expect(result).to.have.status(401)
          expect(result.body).to.have.property('name')
          expect(result.body.name).to.be.an('object')
          expect(result.body.name).to.have.property('message')
          expect(result.body.name.message).to.equal('Name of item is required')
          done()
        })
  })
  it('Should return error price item minimum is Rp. 100', (done) => {
    const namaBarang = {
      name: 'bakso',
      price: '',
    }
    chai.request(app)
        .post('/items')
        .set('auth', token)
        .send(namaBarang)
        .end((err, result) => {
          expect(result).to.have.status(401)
          expect(result.body).to.have.property('price')
          expect(result.body.price).to.be.an('object')
          expect(result.body.price).to.have.property('message')
          expect(result.body.price.message).to.equal('Minimum price of item is Rp. 100')
          done()
        })
  })
  it('Should return error price item NAN', (done) => {
    const namaBarang = {
      name: 'bakso',
      harga: 15000,
    }
    chai.request(app)
        .post('/items')
        .set('auth', token)
        .send(namaBarang)
        .end((err, result) => {
          expect(result).to.have.status(401)
          expect(result.body).to.have.property('price')
          expect(result.body.price).to.be.an('object')
          expect(result.body.price).to.have.property('message')
          expect(result.body.price.message).to.equal('Cast to Number failed for value "NaN" at path "price"')
          done()
        })
  })
  it('Should return error not authorized', (done) => {
    const namaBarang = {
      name: 'bakso',
      price: 15000,
    }
    chai.request(app)
        .post('/items')
        .set('auth', token_buyer)
        .send(namaBarang)
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.equal('You are not authorized to access')
          done()
        })
  })
})

describe('Testing for find item list', () => {
  it('Should return all item list', (done) => {
    chai.request(app)
        .get('/items')
        .set('auth', token)
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('_id')
          expect(result.body).to.have.property('itemList')
          expect(result.body.itemList).to.be.an('array')
          expect(result.body).to.have.property('brand')
          done()
        })
  })
  it('Should return error not authorized getting item list', (done) => {
    chai.request(app)
        .get('/items')
        .set('auth', token_buyer)
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.equal('You are not authorized to access')
          done()
        })
  })
})

describe('Testing for find one item', () => {
  it('Should return item detail', (done) => {
    chai.request(app)
        .get(`/items/${item_id}`)
        .set('auth', token)
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('_id')
          expect(result.body._id).to.equal(item_id)
          expect(result.body).to.have.property('name')
          expect(result.body).to.have.property('price')
          expect(result.body).to.have.property('picture')
          done()
        })
  })
  it('Should return error getting item detail', (done) => {
    chai.request(app)
        .get(`/items/5c4f0772077018303976a042`)
        .set('auth', token)
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.be.a('string')
          expect(result.body.message).to.equal('Item not found')
          done()
        })
  })
})

describe('Testing update item', () => {
  it('Should return success message updated item', (done) => {
    const newData = {
      name: 'bakso malang',
      price: 20000
    }
    chai.request(app)
        .put(`/items/${item_id}`)
        .set('auth', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('Content-Type', 'multipart/form-data')
        .field('fileName', 'boy.png')
        .field('name', newData.name)
        .field('price', newData.price)
        .attach('file', './boy.png')
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('_id')
          expect(result.body._id).to.equal(item_id)
          expect(result.body).to.have.property('name')
          expect(result.body.name).to.equal(newData.name)
          expect(result.body).to.have.property('price')
          expect(result.body.price).to.equal(newData.price)
          expect(result.body).to.have.property('picture')
          done()
        })
  })
  it('Should return error message on update item', (done) => {
    const newData = {
      name: 'bakso malang',
      price: 20000
    }
    chai.request(app)
        .put(`/items/5c4f0772077018303976a042`)
        .set('auth', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('Content-Type', 'multipart/form-data')
        .field('fileName', 'boy.png')
        .field('name', newData.name)
        .field('price', newData.price)
        .attach('file', './boy.png')
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.equal('You are not authorized to access')
          done()
        })
  })
})

describe('Testing delete item', () => {
  it('Should return success on delete item', (done) => {
    chai.request(app)
        .delete(`/items/${item_id}`)
        .set('auth', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('Content-Type', 'multipart/form-data')
        .field('fileName', 'boy.png')
        .end((err, result) => {
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('_id')
          expect(result.body._id).to.equal(item_id)
          expect(result.body).to.have.property('name')
          expect(result.body).to.have.property('price')
          expect(result.body).to.have.property('picture')
          done()
        })
  })
  it('Should return error message on delete item', (done) => {
    chai.request(app)
        .delete(`/items/5c4f0772077018303976a042`)
        .set('auth', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('Content-Type', 'multipart/form-data')
        .field('fileName', 'boy.png')
        .end((err, result) => {
          expect(result).to.have.status(400)
          expect(result.body).to.have.property('message')
          expect(result.body.message).to.equal('You are not authorized to access')
          done()
        })
  })
})