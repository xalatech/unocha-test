const request = require('request');
const package = require('../package.json');

const base = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/`;

//Add Employee crud endpoints
const employees = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/employee`;


// Employee CRUD endpoint tests

// GET List of Employees
describe('GET /employee', () => {
    it('should respond with a json object of all employees in the database', (done) => {
      request.get(employees, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        // TODO: Can be extended further to check if the objects returend in 
        // the array matches the typeof employee object
        return done();
      });
    });
  });
  
  // GET List of Employees
  describe('GET /employee/:id', () => {
    it('should respond with a json object of an employees in the database with id: 1', (done) => {
      request.get(`${employees}/1`, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
      
        // TODO: Can be extended further to check if the objects returend in matches the typeof employee object
        return done();
      });
    });
  });
  
  // GET an employee by id
  describe('GET /employee/:id', () => {
    it('should respond with a json object of an employees in the database with id: 2', (done) => {
      request.get(`${employees}/2`, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        const data = JSON.parse(body);
        expect(data.firstName).toBe('Curt');
        expect(data.lastName).toBe('Abramin');
  
        // TODO: Can be extended further to check if the objects returend in matches the typeof employee object
        return done();
      });
    });
  });


  // POST an employee by record
  describe('POST /employee', () => {
    it('should respond with a status code 200 and response of an employee object newly created', (done) => {
  
    const emp = {
            firstName: 'Ibrahim',
            lastName: 'Rahmani'
        }

    const body = {
        employee: emp
    };

    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    var options = {
        method: 'POST',
        url: employees,
        headers: headers,
        body: JSON.stringify(body)
      };

    request.post(options, function(error, response, body) {

        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        const data = JSON.parse(body);
        expect(data.firstName).toBe('Ibrahim');
        expect(data.lastName).toBe('Rahmani');
  
        // TODO: Can be extended further to check if the objects returend in matches the typeof employee object
        return done();
      });
    });
  });

   // PUT / update an employee by record
   describe('PUT /employee/:id', () => {
    it('should respond with a status code 200 and response of an employee object newly updated', (done) => {
  
    const emp = {
            firstName: 'Ibrahim',
            lastName: 'Rahmani'
        }

    const body = {
        data: emp
    };

    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    var options = {
        method: 'PUT',
        url: `${employees}/1`,
        headers: headers,
        body: JSON.stringify(body)
      };

    request.put(options, function(error, response, body) {

        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        const data = JSON.parse(body);
        expect(data.firstName).toBe('Ibrahim');
        expect(data.lastName).toBe('Rahmani');
  
        // TODO: Can be extended further to check if the objects returend in matches the typeof employee object
        return done();
      });
    });
  });

  // DELETE an employee by id
  describe('DELETE /employee/:id', () => {
    it('should respond with a status code 200 and delete employee record', (done) => {
      request.del(`${employees}/15`, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
        
        return done();
      });
    });
  });
