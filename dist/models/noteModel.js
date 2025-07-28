"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Note = mongoose_1.default.model('Note', noteSchema);
