import { test, expect, chromium } from '@playwright/test';

test('Browser actions', async () => {

   //Launch the browser window (Chrome)
   const browser = await chromium.launch({ headless: false, channel: 'chrome' }); //msedge for edge //, args: ['--start-maximized']

   //Launch the browser context from the browser engine. 
   const context = await browser.newContext();

   //Create a new page in the browser context.
   const page = await context.newPage();

   //Enter URL "https://example.com" and launch the application. 
   await page.goto('https://example.com');

   //Verify the application title. 
   await expect(page).toHaveTitle('Title');

   //Locate the element 
   let element = page.locator("a[alt='image']");

   /* =========================================================
      Common Web Element Validations
      ========================================================= */

   //Check if the element is visible
   await expect(element).toBeVisible();

   //Check if the element is enabled
   await expect(element).toBeEnabled();

   //Check if the element is checked (for checkbox or radio button)
   await expect(element).toBeChecked();

   /* =========================================================
      BUTTON Web Element Validations
      ========================================================= */

   //locate the button element
   let button = page.locator("button#submit");

   //verify the label of the button
   let buttonText = await button.textContent(); //if the label added as text value
   let buttonValue = await button.getAttribute('value');//if the label added as attribute value

   //click on the button
   await button.click();

   //double click
   await button.dblclick();

   //right click
   await button.click({ button: 'right' });

   //hover on the button
   await button.hover();

   //drag and drop the button
   const target = await page.locator("#target");
   await button.dragTo(target);

   //scroll till button displayed
   await button.scrollIntoViewIfNeeded();

   //button is covered and we want to click on the hidden button
   await button.click({ force: true });


   /* =========================================================
      TEXTBOX Web Element Validations
      ========================================================= */

   //locate the textbox element
   let textbox = page.locator("input#textbox");

   // clear the existing text from textbox
   await textbox.clear();

   // verify the placeholder 
   let placeholder = textbox.getAttribute('placeholder');

   // type the text with in the textbox
   await textbox.fill('Sample Text');

   // press keys like 'enter' into textbox
   await textbox.press('Enter');

   // verify the value entered into the textbox
   await expect(textbox).toHaveValue('Sample Text');


   /* =========================================================
      DROPDOWN Web Element Validations
      ========================================================= */

   //locate the dopdownelement
   let dropdown = page.locator("select#dropdown");

   // select the option from dropdown
   await dropdown.selectOption({ label: 'Option 1' }); //by label/text 
   await dropdown.selectOption({ value: 'Option 2' }); //by value
   await dropdown.selectOption({ index: 1 }); //by index

   // verify if the dropdown is multi-select
   let isMultiSelect = await dropdown.getAttribute('multiple') !== null;

   // select the option from dropdown
   await dropdown.selectOption({ label: 'Option 1' }); //by label/text 
   await dropdown.selectOption({ value: 'Option 2' }); //by value
   await dropdown.selectOption({ index: 1 }); //by index

   // de-select the option from dropdown
   await dropdown.selectOption({ label: 'Option 1' }); //by label/text 
   await dropdown.selectOption({ value: 'Option 2' }); //by value
   await dropdown.selectOption({ index: 1 }); //by index

   // verify the selected options from dropdown
   const selectedOption = await dropdown.inputValue();

   //verify the totl options available
   let options = dropdown.locator('option');

   // verify the total options available in dropdown
   let optionsCount = await options.count();

   //Print the option text value from each and every option
   for (let i = 0; i < optionsCount; i++) {
      const optionText = await options.nth(i).textContent();
      console.log(`Option ${i + 1}: ${optionText}`);
   }


 /* =========================================================
      Checkboxes Web Element Validations
      ========================================================= */

//locate the checkbox element
let checkbox=page.locator("#checkbox");

//Select the checkbos if it is not selected already.
if(!await checkbox.isChecked()){
    await checkbox.check();
}


/* =========================================================
     Radio Button Web Element Validations
      ========================================================= */

      //Locate the radion button element 
      let radioButton = page.locator("#radio");

      //Select the radio button 
      await radioButton.check();

/* =========================================================
     Image Web Element Validations
      ========================================================= */

   //locate the image element
   let image =page.locator("img#image")

   //Verify the image is visible 
   await expect(image).toBeVisible();

   //Verify the image source 
   let imgSrc=await image.getAttribute('src');

   //Verify image size 
   const imageSize=await image.boundingBox();
   const imageWidth= imageSize ?.width;
   const imageHight=imageSize?.height;
   
   //Verify image position
   const imagePosition=await image.boundingBox();
   const imageX=imagePosition?.x;
   const imageY=imagePosition?.y;



/* =========================================================
     HyperLink Web Element Validations
      ========================================================= */

      //locate the HyperLink element
      let hyperLink=page.locator("a#hyperlink");

      //Verify the hyperlink .(method 1)
      let hyperLinkUrl=await hyperLink.getAttribute('href');


      //Verify the hyperlink. (Method 2)
     //click on the hyper link and verify the URL of the new page
     await hyperLink.click();
     await expect(page).toHaveURL('https://expected-url.com');

/* =========================================================
     Text Web Element Validations
      ========================================================= */
      //locate the text element
      let textElement=page.locator("p#text");

     // if the text is added as text value 
     let textContent = await textElement.textContent();
     await expect(textContent).toBe('Expected Text');
     
     //if the text added as attribute value 
     let textValue=await textElement.getAttribute("");
     await expect(textValue).toBe('Expected text');

/* =========================================================
     File upload  Web Element Validations
      ========================================================= */

      //locate the upload button element
      let fileUpload=page.locator("input#fileUpload");

      //Upload the file using setInputFiles method
      await fileUpload.setInputFiles('path/to/file.txt');

      
/* =========================================================
     Frame Web Element Validations
      ========================================================= */
    //locate the frame element 
      const frame = page.frameLocator("iframe#frame1");

     //locate the Element inside the frame and perform action 
     const frameElement=frame.locator("#frameElement");
     await frameElement.click();


     /* =========================================================
     Alert Web Element Validations
      ========================================================= */
    //locate the alert trigger element

    const alertTrigger=page.locator("button#alertButton");

    //code to handle alert (if alert comes)
    page.once('dialog',async dialog=>{
    //copy message from alert
    console.log(dialog.message());
     
    //Click on the OK button of the alert
    dialog.accept();

    //Click on the cancel button of the alert
    dialog.dismiss();

    //Enter some text along with "Accept" or "Dismiss"
    dialog.accept("Playwright Automation");

    });

    //click on button to get the alert
    alertTrigger.click();
    

 //close all pages 
 await browser.close();


});