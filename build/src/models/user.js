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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (username, password_digest) VALUES ($1,$2) RETURNING *";
                const hash = bcrypt_1.default.hashSync(user.password + pepper, saltRounds);
                const result = yield conn.query(sql, [user.username, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`unable to create user ${user.username}: ${error}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "SELECT password_digest FROM users WHERE username = ($1)";
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.UserStore = UserStore;
