const app = require('../app');
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
const database = require('../helpers/database')

chai.use(chaiHttp)

describe('Testing for create item', () => {
  it('Should return mLab database', (done) => {
    expect(database('TEST')).to.equal('mongodb://localhost/inginJajanTest')
    done()
  })
})