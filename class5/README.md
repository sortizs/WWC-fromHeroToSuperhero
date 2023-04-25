# Getting in touch with Mongo DB
 
This task is designed to provide an in-depth understanding of the working principles and syntax of [Mongo DB](https://www.mongodb.com/).
Mongo DB is a widely used NoSQL database management system that uses documents instead of tables and schema.
The task will begin by introducing the basic concepts and principles of Mongo DB, including how to create databases and collections, and insert and query data.

## >_ Querying the terminal
You are requested to perform three basic operations in the MongoDB console: list all the elements of a collection, edit an existing element, and delete one.

### Prepare the working environment
Initialize a database and a collection with the following objects:

```json
[
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    stock: 94,
    category: "smartphones"
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    stock: 34,
    category: "smartphones"
  }
]
```

#### Terminal

```
> mongosh
> use wwcMongo
> db.products.insertMany([{ id: 1, title: "iPhone 9", description: "An apple mobile which is nothing like apple", price: 549, stock: 94, category: "smartphones" },{ id: 2, title: "iPhone X", description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...", price: 899, stock: 34, category: "smartphones"}])
```

### Tasks

1. List all elements of a collection
    * Command
        ```
        > db.collection.find()
        ```
    * Result
        ![Edit products](class5/assets/images/dbfind.png "List products")

2. Edit an existing element
    * Command
        ```
        > db.collection.findOneAndUpdate({ key: value }, { $set: { to: update }}, { options })
        ```
    * Result
        ![Edit products](class5/assets/images/dbupdate.png "Edit products")

3. Delete one element
    * Command
        ```
        > db.collection.findOneAndDelete({ key: value })
        ```
    * Result
        ![Remove products](class5/assets/images/dbdelete.png "Remove products")


## Steady, Ready, Go! with MongoDB
You are requested to modify the final project of the existing API that stored data in a file, so that now the data is stored in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try6) using [Mongoose](https://mongoosejs.com/). The [Joi](https://joi.dev/) validations, a health check endpoint, and error handling in the application should be maintained.

* [Steady, Ready, GO!](https://github.com/sortizs/WWC-fromHeroToSuperhero/tree/main/steadyReadyGo) with MongoDB integration
