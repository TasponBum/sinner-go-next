import express, { response } from 'express';
import db from './config/firebase.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// object array
const myShops = [
{
    shopID: 100,
    shopName: "Nike",
    shopType: "Shoes",
    shopLo: {lat: 100, long: 150},
    shopStatus: true
},

{
    shopID: 200,
    shopName: "adidas",
    shopType: "Shoes",
    shopLo: {lat: 200, long: 160},
    shopStatus: true
},

{
    shopID: 300,
    shopName: "New balance",
    shopType: "Shoes",
    shopLo: {lat: 300, long: 170},
    shopStatus: true
},

]

//  
app.get('/',(req, res) => {
    res.send('<h1> Web programing in 2/2569. </h1>');
});

// GET : http://localhost:xxxx/api/shops/100
app.get('/api/shops/:id', async (req, res) => { 
    try {
    const doc = await db
    .collection("shops_10021")
    .doc(req.params.id)
    .get();
    
    res.json(
        {
            id: doc.id,
            ...doc.data()
        }
    )
    } catch (error) {
        res.status(500).json
        {
            message: "Failed การอ่านข้อมูลรหัสร้านค้ามีปัญหา ShopID",
            error; error.message
        }
    }
});


app.get('/shops{/:ShopID}', (req, res) => {
    const { shopID } = req.params
    
    res.set('Content-type' , 'application/json');
    if(isNaN(shopID)){
        res.send(myShops);
    }else{
        const shopItem = myShops.filter(
            shop => { return shop.shopID === Number(shopID)}
        );
        res.send(shopItem[0]);
    }

    
   
    //let myText   = " ";
    
    //myText+= "<h1>Shop information</h1>";
    //myText+= `<b>Shop ID:</b> ${myShops.shopID}<br>`;
    //myText+= `<b>ShopName:</b> ${myShops.shopName}<br>`;
    //myText+= `<b>ShopType:</b> ${myShops.shopType}<br>`;
    //myText+= `<b>ShopLocation (Lat,long) :</b> ${myShops.shopLo.lat} , ${myShops.shopLo.long}<br>`;
    //myText+= `<b>ShopStatus:</b> ${myShops.shopStatus}<br>`;
    

    res.set('Content-type' , 'text/html');
    res.send(myText);

});

app.get('/api/shops', async(req, res) => {
    try {
   const snapshot = await db
  .collection("shops_10021")
  .orderBy("shopName", "desc")
  .get();

const shops =  snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
    
    res.json(shops);
} catch (error) {
        res.status(500).json
        {
            message: "Failed การอ่านข้อมูลผิดพลาด",
            error; error.message
        }
    }
})   


app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});

// การลบข้อมูลร้านค้าจากไฟร์เบสด้วย id (Method: DELETE)
const deleteShop = async (req, res) => {
    const ShopRef = db
      .collection("shops_10021")
      .doc(req.params.id);
 
    await ShopRef.delete();
 
    res.status(200).json({
      message: "Shop deleted successfully",
      id: req.params.id,
    });
}
 
// App route: /api/shops/:id (Method: DELETE)
// Endpoint: http://localhost:xxxx/api/shops/100
app.delete('/api/shops/:id', (req, res) => {
  try {
    deleteShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to deleting shop.",
      error: error.message,
    });
  }
});

// การสร้างข้อมูลร้านค้าในไฟร์เบส (Method: POST)
const createShop = async (req, res) => {
    const {
      shopName,
      shopStatus,
      shopType,
    } = req.body;
 
    if (!shopName || !shopType || !shopStatus) {
      return res.status(400).json({
          message: "Name, Type and Status are required",
      });
    }
 
    const shopRef = await db.collection("shops_10021").doc();
    const newId = shopRef.id; // Access the generated ID
 
    const newShop = {
      shopId: newId,
      shopName,
      shopType,
      shopStatus: shopStatus === 'true',
    };
 
    // Builder query: Add
    const docRef = await db
      .collection("shops_10021")
      .add(newShop);
 
    res.status(201).json({
      id: docRef.id,
      ...newShop,
    });
}
 
// App route: /api/shops (Method: POST)
// Endpoint: http://localhost:xxxx/api/shops
app.post('/api/shops', (req, res) => {
  try {
    createShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to adding shop.",
      error: error.message,
    });
  }
});

// การแก้ไขข้อมูลร้านค้าในไฟร์เบส (Method: PUT)
const updateShop = async (req, res) => {

  try {

    const ShopRef = db
      .collection("shops_10021")
      .doc(req.params.id);

    const doc = await ShopRef.get();

    if (!doc.exists) {

      return res.status(404).json({
        message: "Shop not found",
      });

    }

    const {
      shopName,
      shopStatus,
      shopType,
    } = req.body;

    const updateData = {
      shopName,
      shopType,
      shopStatus: shopStatus || "true",
    };

    await ShopRef.update(updateData);

    res.status(200).json({
      id: req.params.id,
      ...updateData,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update Shop",
    });

  }

};

// App route: /api/shops (Method: PUT)
// Endpoint: http://localhost:xxxx/api/shops
app.put('/api/shops/:id', (req, res) => {
  try {
    updateShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to updating shop.",
      error: error.message,
    });
  }
});

