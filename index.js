const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch(); // { headless: false } pra ver como e feito o print 
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imgList = await page.evaluate(() => {
    //   toda essa funcção sera executada no browser 

    // vamos pegar todas imagens que estao na parte de posts
        const nodeList = document.querySelectorAll('article img')
    // transformar o node list em array 
        const imgArray = [...nodeList]
    // transformar os nodes (elementos html) em objetos JS
        const imgList = imgArray.map( ({src}) => ({
            src 
        }))
    // colocar para fora da função
    return imgList 
  })


//   escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if(err) throw new Error('something went wrong')

      console.log('Well done!')
  })

//   screenshot({path: 'instagram.png'}); // screen shot
 
  await browser.close();
})();