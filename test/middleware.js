// const app = require('../app');
// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect;
// const {authentication, sellerAccess, authorization} = require('../middlewares/index')
// // const sinon = require('sinon')

// chai.use(chaiHttp)

// let detailSeller = {};
// let detailBuyer = {};
// let token = '';
// let token_buyer = '';

// before(function(done) {
//   let data = {
//     name : 'Rangga Kusuma',
//     phone : '0812345678',
//     address : 'Hacktiv8 Jakarta Selatan',
//     username: 'rangga111',
//     role: 'seller',
//     password: 'ranggarangga',
//     brand: 'mie ayam'
// }
//   //NOTE: CHAI REGISTER & LOGIN    
//   chai
//   .request(app)
//   .post('/register')
//   .send(data)
//   .end(function(err, result) {
//     console.log('before==========')
//     console.log(result.body)
//     detailSeller = result.body.data
//     chai
//     .request(app)
//     .post('/login')
//     .send(data)
//     .end(function(err, result) {
//       token = result.body.token;

//       let dataBuyer = {
//         name : 'Hedya',
//         phone : '0812345678',
//         address : 'Hacktiv8 Jakarta Selatan',
//         username: 'hedya123',
//         role: 'buyer',
//         password: 'hedya',
//       }
//       chai
//       .request(app)
//       .post('/register')
//       .send(dataBuyer)
//       .end(function(err, result) {
//         detailBuyer = result.body.data
//         chai
//         .request(app)
//         .post('/login')
//         .send(dataBuyer)
//         .end(function(err, result) {
//           token_buyer = result.body.token;
//           done();
//         })
//       })
//     })
//   })
// })

// describe('Testing for user authorization', () => {
//   console.log(detailSeller)
//   const next = sinon.spy()
//   const req = {
//     _currentUser: detailSeller,
//     params: {
//       shopId: detailSeller.shopId
//     }
//   }
//   const res = {
//     status = (param) => {
//       return true
//     }
//   }
//   // authorization(req, res, next)
//   // expect(next)
// })