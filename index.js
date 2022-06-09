const puppeteer = require("puppeteer")
const express = require("express");
const app = express();

app.listen(5252, async () => {
    try {
        console.log("listening port 5252");
    } catch (error) {
        console.log(error.message);
    }
});

const fun = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.goto("https://www.google.com/search?q=react+jobs&ei=4duYYpLRJYq94-EPqfK90AE&uact=5&oq=react+jobs&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMggIABCABBDJAzIFCAAQkgMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBHOgUIABCRAjoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6CAguEIAEELEDOgUILhCABDoLCAAQgAQQsQMQgwE6BAgAEEM6DgguEIAEELEDEMcBEKMCOgsILhDHARCvARCRAjoHCAAQyQMQQzoOCC4QgAQQsQMQxwEQ0QM6CAgAEIAEELEDOggILhCABBDUAjoLCC4QgAQQsQMQ1AI6DQgAELEDEIMBEMkDEEM6CAgAELEDEIMBOgoIABCxAxCDARANOgQIABANOgcIABDJAxANSgQIQRgASgQIRhgAUJseWIgzYOczaANwAngAgAGmAYgB5AqSAQQwLjExmAEAoAEBsAEAyAEIwAEB&sclient=gws-wiz&ibp=htl;jobs&sa=X&ved=2ahUKEwi546uOj4_4AhXh6zgGHQlPDQYQutcGKAF6BAgHEAY#htivrt=jobs&htidocid=DNXJc0LPw_4AAAAAAAAAAA%3D%3D&fpstate=tldetail")

    await page.screenshot({ path: "web.png" })
    // await page.setViewport({});

    const details = await page.evaluate(() => {
        var array = [];
        const data = document.querySelectorAll(
            ".iFjolb.gws-plugins-horizon-jobs__li-ed"
        );
        data.forEach((e) => {
            var title = e.querySelector(".BjJfJf.PUpOsf").innerHTML;
            var company = e.querySelector(".vNEEBe").innerHTML;
            var description = e.querySelector(".HBvzbc").innerHTML;
            var location = e.querySelector(".Qk80Jf").innerHTML;
            array.push({ title, company, location, description });
        });
        return array;
    });
    // console.log(title, company, description, location)
    await browser.close();
    return details;
}
fun();