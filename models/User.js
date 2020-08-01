const Schema = require("mongoose");
const UserSchema = new Schema({
    name: String,
    password: String,
    key: String,
    secret: String
})

let User = mongoose.model("User", UserSchema);

module.exports = User;