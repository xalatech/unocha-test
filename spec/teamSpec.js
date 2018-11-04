const request = require('request');
const package = require('../package.json');

const base = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/`;

//Add team crud endpoints
const teams = `http://${process.env.URL || '127.0.0.1'}:${process.env.PORT || 4000}/team`;


// team CRUD endpoint tests

// GET List of Teams
describe('GET /team', () => {
    it('should respond with a json object of all Teams in the database', (done) => {
      request.get(teams, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        // TODO: Can be extended further to check if the objects returend in 
        // the array matches the typeof team object
        return done();
      });
    });
  });
  
  // GET List of Teams
  describe('GET /team/:id', () => {
    it('should respond with a json object of an Teams in the database with id: 1', (done) => {
      request.get(`${teams}/1`, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
      
        // TODO: Can be extended further to check if the objects returend in matches the typeof team object
        return done();
      });
    });
  });
  
  // GET an team by id
  describe('GET /team/:id', () => {
    it('should respond with a json object of an Teams in the database with id: 2', (done) => {
      request.get(`${teams}/2`, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        const data = JSON.parse(body);
        expect(data.name).toBe('Rana');
      
        // TODO: Can be extended further to check if the objects returend in matches the typeof team object
        return done();
      });
    });
  });


  // POST an team by record
  describe('POST /team', () => {
    it('should respond with a status code 200 and response of an team object newly created', (done) => {
  
    const t = {
            name: 'Xala',
            leader: 1
        }

    const body = {
        team: t
    };

    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    var options = {
        method: 'POST',
        url: teams,
        headers: headers,
        body: JSON.stringify(body)
      };

    request.post(options, function(error, response, body) {

        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        const data = JSON.parse(body);
        expect(data.name).toBe('Xala');
     
        // TODO: Can be extended further to check if the objects returend in matches the typeof team object
        return done();
      });
    });
  });

   // PUT / update an team by record
   describe('PUT /team/:id', () => {
    it('should respond with a status code 200 and response of an team object newly updated', (done) => {
  
    const t = {
            name: 'Xala Tech',
            leader: 1
        }

    const body = {
        data: t
    };

    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    var options = {
        method: 'PUT',
        url: `${teams}/1`,
        headers: headers,
        body: JSON.stringify(body)
      };

    request.put(options, function(error, response, body) {

        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
  
        const data = JSON.parse(body);
        expect(data.name).toBe('Xala Tech');
  
        // TODO: Can be extended further to check if the objects returend in matches the typeof team object
        return done();
      });
    });
  });

  // DELETE an team by id
  describe('DELETE /team/:id', () => {
    it('should respond with a status code 200 and delete team record', (done) => {
      request.del(`${teams}/4`, function(error, response, body) {
        // there should be a 200 status code
        expect(response.statusCode).toBe(200);
        
        return done();
      });
    });
  });
