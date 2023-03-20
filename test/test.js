
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product Items', () => {
  let itemI;

  describe('POST /items', () => {
    it('Should add a new product item', async () => {
      const item = { pname: 'Laptop', brand: 'Samsung', price: 120000, email: 'samsung@gmail.com' };
      const res = await chai.request(server).post('/items').send(item);
      
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('pname', 'Laptop');
      expect(res.body).to.have.property('brand', 'Samsung');
      expect(res.body).to.have.property('price', 120000);
      expect(res.body).to.have.property('email', 'samsung@gmail.com');
      
    });
  });

  describe('PUT /items/:email', () => {
    it('Should update a product item by email', async () => {
      const item = { pname: 'Laptop', brand: 'Asus', price:81000,email: 'samsung@gmail.com' };
      
      const res = await chai.request(server).put(`/items/${item.email}`).send(item);
      
      expect(res.body).to.have.property('pname', 'Laptop');
      expect(res.body).to.have.property('brand', 'Asus');
      expect(res.body).to.have.property('price', 81000);
      expect(res).to.have.status(200);
    });
  });

    it('Should return an error if email is not found', async () => {
      const item = { pname: 'mobile', price: 200 };
      const res = await chai.request(server).put('/items/xyz@gmail.com').send(item);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Email not found');
    });
  

  describe('DELETE /items/:email', () => {
    it('Should delete the product_item by email', async () => {
      const email = 'samsung@gmail.com'
      const res = await chai.request(server).delete(`/items/${email}`);
      expect(res).to.have.status(500);
    });

    it('Should return an error if email is not found', async () => {
      const res = await chai.request(server).delete('/items/xyz@gmail.com');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Email not found');
    });
 });
});
