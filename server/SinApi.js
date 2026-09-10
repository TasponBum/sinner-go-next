import express from 'express';

const app = express();
const port = 8000;


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

// http://local:host:8000/
app.get('/',(req, res) => {
    res.send('<h1> Web programing in 2/2569. </h1>');
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


app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});