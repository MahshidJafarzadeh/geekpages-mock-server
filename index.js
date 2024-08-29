import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();

// تنظیمات CORS با هدرهای مشخص
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // یا دامنه‌ی خاص خود را به جای * قرار دهید
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.db = router.db;

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(8000, () => {
    console.log('JSON Server is running on port 8000');
});

