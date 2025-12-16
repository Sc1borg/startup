# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)


## GitHub

I learned how to use Github for the first time. It started with learning how to push, pull, and clone different repositories.
## AWS

set up an ec2 instance in class
learned about ip addresses - like mail addresses
tried to set up a domain name, but I had trouble because route 53 wasn't working for me. I eventually turned to a different company, and I might transfer later. chmod to change permissions pwd to get path port 22 is for ssh

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTTP

Default ports: HTTP - 80, HTTPS - 443, SSH - 22 \n
Status codes: 100 - incomplete, 200 - ok, 300 - redirect, 400 - client error, 500 - server error \n
content-type(header): allows you to specify format of the data(plain text/html/json/xml/image)

### Cookies
Secure cookie - Only sent to the server with an encrypted request over https. Can still be accessed by javascript if someone has the device \n
http only - Cookies can't be accessed using javascript. It can only be accessed when it reaches the server (session cookies should be http only) \n
SameSite - Specifies whether cookies are sent with cross site requests ie to or from other sites 3 levels \n
Strict - only sends cookies in response to requests from the cookie's origin
Lax - sends cookies when someone navigates to the site as well as the strict cookies
None - Just sends cookies - Secure must also be set.

## HTML

I struggled at first because I didn't understand how to edit my html files and then deploy them, but once I found out that I didn't need to be in my ssh to edit it, it got a lot easier. I got a lot of inspiration from W3 schools and formatting from Genshindle.com

\n # is for Id and . for class. padding is inside margin outside. arrow syntax is a better way of assigning than =. used to assign a function

DOM represents the page as a tree of objects which allows js to dynamically access it

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive, and I haven't done great yet. CSS is really cool, and it's fun to play with. I hate the way that if you don't have it exactly right it just doesn't do anything. Like no error message just nah.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I love CSS it's so pretty! And it's honestly not too hard to learn!


## React Part 1: Routing

Setting up Vite and React was pretty simple. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way. Thanks Brynlee for the recommendation

## React Part 2: Reactivity

Dude, react is so cool! I love putting listeners in, and it's crazy the amount of functionality that can be quickly created. and it's all pretty simple. You just need to use react states - oh you can't forget to import those or it will break everything. useEffect is for "side effects" like things that affect other things than just the passed in/out

### Promises
promises are asynchronous operations. They allow you to fetch data while continuing.
syntax is like:

let promise = new Promise(function(resolve, reject) {
    //do something asynchronous
    if (success) {
        resolve(value);
    } else {
        reject(error);
    }
});

## Service
This one was a little tricky. Mostly because I'm really bad at file structure. I feel like I can run the code, but structuring it is so hard! Using node.js is pretty easy. Creating the endpoints might be easier than just in java

## MongoDB
This might have been the easiest part so far. Using express as middleware makes it really easy to write and retrieve data from MongoDb.

user passwords should always be hashed. 

methods include find, insert, update, and query operators like $gt (>), $lt (<), $regex \n
You can either insert/update one or many using a list of json objects.

## Websocket
Websocket gave me a decent amount of trouble. I tried doing what simon did, but I wanted to only display one message (which I hope is ok with the assignment), so I had to change a lot of what simon did, and it was completely unusable for a couple of days until I figured it out. Websocket is a powerful tool though.

Websocket is intended to provide a full-duplex, persistent communication channel. (enable real-time, bidirectional data exchange over a single long-lived connection) 

Acronyms: JSX - JavaScript XML, JS - JavaScript, AWS - amazon web service, NPM - Node package manager, NVM - node version manager, XML - eXtensible markup language
