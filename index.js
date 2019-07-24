const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // log all JS alerts (let you know if date is sold out)
  page.on('dialog', async dialog => {
    console.log(dialog.message())
    await dialog.dismiss()
  })
  
  // I believe URL args here are:                                                                                  mddyy;d;ni, where d=days & n=nights
  await page.goto('https://reserve2.peppermillcas.com/cgi-bin/lansaweb?PROCFUN+RN+RESNET+PRN+funcparms+UP(A2560):;;81019;3;02;;;;;;;;;;;;;;;;;;;;?tower=Any')
  
  await page.setViewport({ width: 1402, height: 896 })
  
  await page.waitForSelector('.viewport > #roomlist > .body-container > p > .btn')
  await page.click('.viewport > #roomlist > .body-container > p > .btn')

  // terminate when complete
  // this listener must be added after click event above
  // might be a race condition
  page.on('load', async () => {
    await browser.close()
  })
})()
