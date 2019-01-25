const app = require('../app');
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect
chai.use(chaiHttp)


describe('testing for buyer :', () => {

    beforeEach((done) => {
        done()
    })

    afterEach((done) => {
        done()
    })

    it('Should return buyer registered :',(done) => {
        let data = {
            name : 'Andre',
            phone : '081367890000',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(result).to.have.status(200)
                expect(result.body).to.have.property('info')
                expect(result.body).to.have.property('data')
                expect(result.body.data).to.have.property('_id')
                expect(result.body.data).to.have.property('name')
                expect(result.body.data.name).to.equal(data.name)
                expect(result.body.data).to.have.property('phone')
                expect(result.body.data.phone).to.equal(data.phone)
                expect(result.body.data).to.have.property('address')
                expect(result.body.data.address).to.equal(data.address)
                expect(result.body.data).to.have.property('email')
                expect(result.body.data.email).to.equal(data.email)
                done()
            })
    })
    it('Should return error name required :',(done) => {
        let data = {
            name : '',
            phone : '081367890000',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('name')
                expect(result.body.errors[0].message).to.equal('name must be filled')
                done()
            })
    })
    it('Should return error phone required :',(done) => {
        let data = {
            name : 'Andre',
            phone : '',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('phone')
                expect(result.body.errors[0].message).to.equal('phone must be filled')
                done()
            })
    })
    it('Should return error phone minimal 11 :',(done) => {
        let data = {
            name : 'Andre',
            phone : '0813670',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('phone')
                expect(result.body.errors[0].message).to.equal('phone length minimum 11')
                done()
            })
    })
    it('Should return error phone maksimal 13 :',(done) => {
        let data = {
            name : 'Andre',
            phone : '08136700000000000000',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('phone')
                expect(result.body.errors[0].message).to.equal('phone length maksimum 13')
                done()
            })
    })
    it('Should return error address required :',(done) => {
        let data = {
            name : 'Andre',
            phone : '08136700000000000000',
            address : '',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('address')
                expect(result.body.errors[0].message).to.equal('address must be filled')
                done()
            })
    })
    it('Should return error address required :',(done) => {
        let data = {
            name : 'Andre',
            phone : '08136700000000000000',
            address : 'Jl. putri rambut selako ',
            email : ''
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('email')
                expect(result.body.errors[0].message).to.equal('email must be filled')
                done()
            })
    })
    it('Should return error email not unique :',(done) => {
        let data = {
            name : 'Andre',
            phone : '08136700000000000000',
            address : 'Jl. putri rambut selako ',
            email : 'hokandre@mhs.mdp.ac.id'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('errors')
                expect(result.body.errors).to.be.an('array')
                expect(result.body.errors[0]).to.be.an('object')
                expect(result.body.errors[0].path).to.equal('email')
                expect(result.body.errors[0].message).to.equal('email must be unique')
                done()
            })
    })

})