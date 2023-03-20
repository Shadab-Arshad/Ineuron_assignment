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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Product schema
var productSchema = new mongoose.Schema({
    pname: String,
    price: Number,
    brand: String,
    email: String
});
// Creating Product model
var product = mongoose.model('product', productSchema);
var app = express();
app.use(bodyParser.json());
// Connecting to MongoDB Database  
mongoose.connect('mongodb://localhost/Ineuron')
    .then(function () { return console.log('Connected to Database'); })["catch"](function (error) { return console.error(error); });
// Defining All routes
// Get all Product_items 
app.get('/items', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var items, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, product.find()];
            case 1:
                items = _a.sent();
                res.json(items);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get an Product_items  by email
app.get('/items/:email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, item, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product.findOne({ email: email })];
            case 2:
                item = _a.sent();
                if (!item) {
                    res.status(404).json({ message: 'Email Not Found...' });
                }
                else {
                    res.json(item);
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Add a new Product_item
app.post('/items', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newItem, email, user, savedItem, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newItem = new product(req.body);
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, product.findOne({ email: email }).exec()];
            case 2:
                user = _a.sent();
                if (user) {
                    // Email exist 
                    return [2 /*return*/, res.status(404).json({ error: 'Email Already Exist...' })];
                }
                return [4 /*yield*/, newItem.save()];
            case 3:
                savedItem = _a.sent();
                return [2 /*return*/, res.status(200).json(savedItem)];
            case 4:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Update an Product_items by email
app.put('/items/:email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, updatedproduct, newproduct, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                email = req.params.email;
                return [4 /*yield*/, product.findOne({ email: email }).exec()];
            case 1:
                updatedproduct = _a.sent();
                if (!!updatedproduct) return [3 /*break*/, 2];
                // if Email non-exist 
                return [2 /*return*/, res.status(400).json({ error: 'Email not found' })];
            case 2:
                // Update product fields with new data
                updatedproduct.pname = req.body.pname || updatedproduct.pname;
                updatedproduct.email = req.body.email || updatedproduct.email;
                updatedproduct.brand = req.body.brand || updatedproduct.brand;
                updatedproduct.price = req.body.price || updatedproduct.price;
                return [4 /*yield*/, updatedproduct.save()];
            case 3:
                newproduct = _a.sent();
                return [2 /*return*/, res.status(200).json(newproduct)];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Delete Product_items by email
app["delete"]('/items/:email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, emailExist, item, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, product.findOne({ email: email }).exec()];
            case 2:
                emailExist = _a.sent();
                if (!emailExist) {
                    // If Email non-exist 
                    return [2 /*return*/, res.status(400).json({ error: 'Email not found' })];
                }
                return [4 /*yield*/, product.deleteOne({ email: email })];
            case 3:
                item = _a.sent();
                return [2 /*return*/, res.status(500).json(item)];
            case 4:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var server = app.listen(3000, function () {
    console.log('Server started on port 3000');
});
module.exports = server;
