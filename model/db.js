const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://REVAMPEDMUSIC:REVAMPEDMUSIC@cluster0.3riocwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const user = mongoose.Schema({
    name: String,
    email: String,
})

const RevampedMusicUser = mongoose.model("Revamped",user)

module.exports = RevampedMusicUser