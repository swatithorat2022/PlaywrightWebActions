//1. Hard assertion : if assertion fails , the test will stop executing 

import{test,expect,chromium} from '@playwright/test';
test('Hard Assertion Example',async({page})=>{
//Launch the application google.com
await page.goto('https://www.google.com');

//Verify the application title
await expect(page).toHaveTitle('Yahoo')

console.log("Execution completed....");
});