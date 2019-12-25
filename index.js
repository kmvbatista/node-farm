const fs = require('fs');
const http = require('http');
const url = require('url');

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8')
const tempCards = fs.readFileSync('./templates/template-card.html', 'utf-8')
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8')

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%PRODUCTNUTRIENTSNAME%}/g, product.nutrients);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'text/html'});
    if(pathname == '/overview' || pathname == '/') {
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCards, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    else if(pathname == '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
})

server.listen(8000)