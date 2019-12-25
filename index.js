const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8')
const tempCards = fs.readFileSync('./templates/template-card.html', 'utf-8')
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8')

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

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