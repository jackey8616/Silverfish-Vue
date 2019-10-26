const https =require('https');
const xmlBuilder = require('xmlbuilder');
const fs = require('fs');

const frontend = 'https://silverfish.cc/#/';
const backend = 'https://silverfish-backend.clo5de.info:2087';

let doc = xmlBuilder
  .create('urlset', { version: '1.0', encoding: 'UTF-8' })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd')
    .ele('url')
      .ele('loc', 'https://silverfish.cc/')
      .up()
    .up();

function sync_get(url) {
  return new Promise((resolve, reject) => {
    https.get(`${backend}${url}`, (res) => {
        let allData = '';
        res.on('data', (data) => {
          allData += data;
        });
      
        res.on('end', () => {
            resolve(JSON.parse(allData));
        })
      })
  })
} 


sync_get('/api/v1/novels').then((datas) => {
  for(every in datas['data']) {
    doc = doc
      .ele('url')
        .ele('loc', `${frontend}info/novel/${datas['data'][every]['novelID']}`)
        .up()
      .up();
  }
  return sync_get('/api/v1/comics')
}).then((datas) => {
  for(every in datas['data']) {
    doc = doc
      .ele('url')
        .ele('loc', `${frontend}info/comic/${datas['data'][every]['comicID']}`)
        .up()
      .up();
  }
  doc = doc.end({ pretty: true });
  return doc;
}).then((doc) => {
  if (fs.existsSync('./public/sitemap.xml')) {
    fs.renameSync('./public/sitemap.xml', './public/sitemap.xml.bak', (err) => {
      if (err) throw err;
        console.log('Rename complete.');
    });
  }
  fs.writeFileSync('./public/sitemap.xml', doc.toString(), (err) => {
    if (err) throw err;
  });
  console.log('Sitemap.xml Generated.')
})
