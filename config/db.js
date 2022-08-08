const mongoose = require('mongoose')

 mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(response => console.log(`Database Connected: ${response}`))
.catch(err => console.log(`Database ${err}`))