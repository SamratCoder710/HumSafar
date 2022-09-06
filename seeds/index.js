const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors,places} = require('./seedhelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(data => {
        console.log("Connection Open for Mongo!");
    })
    .catch(err =>{
        console.log(err);
    })

const db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error:'));
db.once("open",()=>{
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random()* array.length)];
const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<=50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp=new Campground({
            location:`${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author:'6313351a171f4a4096163859',
            images:[
                {
                url:'https://source.unsplash.com/collection/483251',
                filename:'Sample Camping Images'
                },
                {
                url:'https://source.unsplash.com/collection/483251',
                filename:'Sample Camping Images'
                }
            ] ,
            description:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero unde possimus omnis hic ipsam, laborum et, itaque eveniet molestias quia ex nesciunt consectetur earum? Numquam ea quod ad natus quaerat!',
            price
        })
        await camp.save();
    }
}

seedDB();