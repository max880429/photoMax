const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exports Joi for convenience on type assersions

const user = {
  email: "example1@example.com",
  password: "123456"
};

it('Probando el Login correcto', function () {
  return frisby
    .post('http://localhost:3000/user/login', user)
    .expect('status', 200)
    .expect('json', 'status', true)
    .expect('jsonTypes', 'content', {
      id: Joi.number().required(),
      email: Joi.string().required(),
      token: Joi.string().required()
    })
    .expect('json', 'content.email', user.email)
    .expect('json', 'content.password', '*****')
});

it('Probando el Login incorrecto', function () {
  return frisby
    .post('http://localhost:3000/user/login', {
      email: "exampl121@example.com",
      password: "123456"
    })
    .expect('status', 200)
    .expect('json', 'status', false)
    .expect('json', 'content', 'usuario no esta')
});