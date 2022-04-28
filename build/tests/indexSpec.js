"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
describe('endpoint test', () => {
    it('should test the /api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = (0, supertest_1.default)(server_1.default);
        const response = yield request.get('/api');
        expect(response.status).toEqual(200);
        expect(response.text).toBe('');
    }));
});
describe("setup and teardown test", () => {
    let foo;
    beforeEach(function () {
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
