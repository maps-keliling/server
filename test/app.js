const app = require('../app');
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
const database = require('../helpers/database')

chai.use(chaiHttp)

describe('Testing for create item', () => {
  it('Should return mLab database', (done) => {
    expect(database('DEV')).to.equal('mongodb://admin:admin123@ds211865.mlab.com:11865/final-project')
    done()
  })
})