const app = require('../app');
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect;
const clearUser = require('../helpers/clearUser')

chai.use(chaiHttp)

before(function(done) {
    clearUser(done);    
});

after((done) => {
    clearUser(done);
});

let token = '';

describe('User testing for register case :', () => {
    it('Should return buyer registered :',(done) => {
        let data = {
            name : 'Andre',
            phone : '081367890000',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            username: 'andreandre',
            role: 'buyer',
            password: 'andreandre'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(result).to.have.status(201)
                expect(result.body).to.have.property('info')
                expect(result.body).to.have.property('data')
                expect(result.body.data).to.have.property('_id')
                expect(result.body.data).to.have.property('name')
                expect(result.body.data.name).to.equal(data.name)
                expect(result.body.data).to.have.property('phone')
                expect(result.body.data.phone).to.equal(data.phone)
                expect(result.body.data).to.have.property('address')
                expect(result.body.data.address).to.equal(data.address)
                done()
            })
    })
    it('Should return error name required :',(done) => {
        let data = {
            name : '',
            phone : '081367890000',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id',
            username: 'andreandre',
            role: 'buyer',
            password: 'andreandre',
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.be.an('object')
                expect(result.body).to.have.property('name')
                expect(result.body.name).to.be.an('object')
                expect(result.body.name).to.have.property('message')
                expect(result.body.name.message).to.equal('Name cannot be empty')
                expect(result.body.name.value).to.equal(data.name)
                done()
            })
    })
    it('Should return error phone required :',(done) => {
        let data = {
            name : 'Andre',
            phone : '',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            email : 'hokandre@mhs.mdp.ac.id',
            username: 'andreandre',
            role: 'buyer',
            password: 'andreandre',
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.be.an('object')
                expect(result.body).to.have.property('phone')
                expect(result.body.phone).to.be.an('object')
                expect(result.body.phone).to.have.property('message')
                expect(result.body.phone.message).to.equal('Phone number is required')
                expect(result.body.phone.value).to.equal(data.phone)
                done()
            })
    })
    it('Should return error phone minimal 11 :',(done) => {
        let data = {
            name : 'Andre',
            phone : '0813670',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            username: 'andreandre',
            role: 'buyer',
            password: 'andreandre',
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {                
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('phone')
                expect(result.body.phone).to.be.an('object')
                expect(result.body.phone).to.have.property('message')
                expect(result.body.phone.message).to.equal('Minimum phone number length is 10')
                expect(result.body.phone.value).to.equal(data.phone)
                done()
            })
    })
    it('Should return error phone maksimal 13 :',(done) => {
        let data = {
            name : 'Andre',
            phone : '08136700000000000000',
            address : 'jl.putri rambut selako no.53 rt.30 rw.007',
            username: 'andreandre',
            role: 'buyer',
            password: 'andreandre'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {            
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('phone')
                expect(result.body.phone).to.be.an('object')
                expect(result.body.phone).to.have.property('message')
                expect(result.body.phone.message).to.equal('Maximum phone number length is 13')
                expect(result.body.phone.value).to.equal(data.phone)
                done()
            })
    })
    it('Should return error address required :',(done) => {
        let data = {
            name : 'Andre',
            phone : '081367890000',
            address : '',
            username: 'andreandre',
            role: 'buyer',
            password: 'andreandre'
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {                
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('address')
                expect(result.body.address).to.be.an('object')
                expect(result.body.address).to.have.property('message')
                expect(result.body.address.message).to.equal('Address is required')
                expect(result.body.address.value).to.equal(data.address)
                done()
            })
    })
    it('Should return error password required :',(done) => {
        let data = {
            name : 'Andre',
            phone : '081367890000',
            address : 'Jl. putri rambut selako ',
            username: 'andreandre',
            role: 'buyer',
            password: ''        
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                // console.log(result.body)
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('password')
                expect(result.body.password).to.be.an('object')
                expect(result.body.password).to.have.property('message')
                expect(result.body.password.message).to.equal('Password is required')
                expect(result.body.password.value).to.equal(data.password)
                done()
            })
    })
    it('Should return error password minimum is 5 :', (done) => {
        let data = {
            name : 'Andre',
            phone : '081367890000',
            address : 'Jl. putri rambut selako ',
            username: 'andreandre',
            role: 'buyer',
            password: 'and'        
        }

        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, result) => {
                expect(err).to.be.a('null')
                expect(result).to.have.status(401)
                expect(result.body).to.have.property('password')
                expect(result.body.password).to.be.an('object')
                expect(result.body.password).to.have.property('message')
                expect(result.body.password.message).to.equal('Minimum length of password is 5')
                expect(result.body.password.value).to.equal(data.password)
                done()
            })
    })
});

describe('User testing for login case :', () => {
    it('Should return buyer logged in :', (done) => {
        let data = {
            username: 'andreandre',
            password: 'andreandre'
        }

        chai.request(app)
            .post('/login')
            .send(data)
            .end((err, result) => {
                token = result.body.token;
                expect(result).to.have.status(200)
                expect(result.body).to.have.property('token')
                expect(result.body.token).to.be.a('string')
                expect(result.body).to.have.property('role')
                done()
            })
    });
    it('Should return error username not found :', (done) => {
        let data = {
            username: 'armariena',
            password: 'desydesy'
        }

        chai.request(app)
            .post('/login')
            .send(data)
            .end((err, result) => {
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('message')
                expect(result.body.message).to.be.a('string')
                expect(result.body.message).to.equal('Username not found')
                done()
            })
    })
    it('Should return error wrong password :', (done) => {
        let data = {
            username: 'andreandre',
            password: 'desydesy'
        }

        chai.request(app)
            .post('/login')
            .send(data)
            .end((err, result) => {
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('message')
                expect(result.body.message).to.be.a('string')
                expect(result.body.message).to.equal('Wrong input password')
                done()
            })
    })
});

describe('User testing for upload profile picture :', () => {
    it('Should return success upload image :', (done) => {
        chai.request(app)
            .post('/users/addPhoto')
            .set('auth', token)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('Content-Type', 'multipart/form-data')
            .field('fileName', 'girl.png')
            .attach('file', './girl.png')
            .end((err, result) => {
                expect(result).to.have.status(200)
                expect(result.body).to.have.property('info')
                expect(result.body.info).to.equal('Profile picture has been update')
                expect(result.body).to.have.property('data')
                expect(result.body.data).to.be.an('object')
                done()
            })
    })
    it('Should return error upload image jwt required:', (done) => {
        const dummyToken = ''
        chai.request(app)
            .post('/users/addPhoto')
            .set('auth', dummyToken)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('Content-Type', 'multipart/form-data')
            .field('fileName', 'girl.png')
            .attach('file', './girl.png')
            .end((err, result) => {
                expect(result).to.have.status(400)
                expect(result.body).to.have.property('message')
                expect(result.body.message).to.equal('jwt must be provided')
                done()
            })
    })
    it('Should return error image not found', (done) => {
        chai.request(app)
                .post('/users/addPhoto')
                .set('auth', token)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('Content-Type', 'multipart/form-data')
                .field('fileName', 'scenery.jpg')
                .attach('file', './scenery.jpg')
                .end((err, result) => {
                    expect(result).to.have.status(400)
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('File too large')
                    done()
                })
    })
})