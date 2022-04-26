import supertest from "supertest";
import app from "../src/server";


describe('endpoint test', () =>{
    it('should test the /api endpoint', async ()=>{
        const request = supertest(app);
        const response = await request.get('/api');
        expect(response.status).toEqual(200);
        expect(response.text).toBe('')
    })
})

describe("setup and teardown test", () => {
    let foo:number;
    beforeEach(function() {
      foo = 1;
    });
  
    it("should return foo as 1", () => {
      expect(foo).toEqual(1);
      foo += 1;
    });
  
    it("should return foo as 1", () => {
      expect(foo).toEqual(1);
    });
  });
  













































// import countries from ".."

// describe('Fetch Countries using axios', ()=>{
//     it('should fetch all countries', async ()=>{
//         const result = await countries.getAllCountries();
//         expect(result.length).toEqual(250);
//         expect(result).toBeInstanceOf(Array);
//     })
//     it('should fetch all countries in a region', async ()=>{
//         const result = await countries.getCountriesByRegion();
//         expect(result.length).toEqual(59)
//         expect(result).toBeInstanceOf(Array);
//     })
//     it('should countries name', async ()=>{
//         const result = await countries.getCountriesByName();
//         expect(result.length).toEqual(2)
//         expect(result).toBeInstanceOf(Array);
//     })
// })