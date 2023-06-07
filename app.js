const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`CONNECTED TO MONGO!`);
})
.catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
});


const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please check your data entry.No name specified."],
    },
    rating:{
        type:Number,
        min:0,
        max:10
    },
    review:String
});

const personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    favouriteFruit:fruitSchema
});

const Fruit = mongoose.model("Fruit",fruitSchema);
const Person = mongoose.model("Person",personSchema);

const pineapple = new Fruit({
    name:"Pineapple",
    score:6,
    review:"Great fruit!",
});

// pineapple.save();

const fruit = new Fruit ({
    name:"Apple",
    rating:6,
    review:"pretty solid  a fruit."
});

const person = new Person({
    name:"john",
    age:37,
    favouriteFruit:pineapple
});

const kiwi = new Fruit({
    name:"Kiwi",
    score:11,
    review:"The best fruit!"

});

const orange = new Fruit({
    name:"Orange",
    score:43,
    review:"Too sour for me"
});

const banana = new Fruit({
    name:"Banana",
    score:3,
    review:"Weird texure"
});

// Fruit.insertMany([kiwi,orange,banana],function(err){
//      if(err){
//      console.log(err);
//      }else{
//         console.log("Successfully saved all the fruits to fruitsDB")
//      }
//  });

// fruit.save();
//  person.save();


    Fruit.find(function(err,fruits){
        if(err){
            console.log(err);
        }else{
            
            fruits.forEach(fruit => {
                console.log(fruit.name)
                mongoose.disconnect();
            });
        }
    });

// Fruit.updateOne({_id:"63d3b170ba1f74f928e81533"},{name:"Peach"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated");
//     }
// });

// Fruit.deleteOne({_id:"63d3b170ba1f74f928e81533"},function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted");
//     }
// })

// Person.deleteMany({name:"john"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully deleted");
//     }
// }); 

Person.updateOne({name:"Amy"},{favouriteFruit:kiwi},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("successfully updated");
        }});
