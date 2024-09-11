'use strict';
var assert = require('assert');
var vows = require('vows');
var tough = require('../lib/cookie');

vows
    .describe('MemoryCookieStore Tests')
    .addBatch({
        'MemoryCookieStore Initialization': {
            topic: function () {
                const store = new tough.MemoryCookieStore();
                return store;
            },
            'should initialize this.idx as an empty object without Object.prototype': function (store) {
                // Check that the idx object doesn't inherit from Object.prototype
                assert.strictEqual(Object.getPrototypeOf(store.idx), null, 'this.idx has a prototype!');
                assert.strictEqual(store.idx.hasOwnProperty, undefined, 'this.idx should not inherit from Object.prototype');
            }
        }
    })
    .addBatch({
        'putCookie Function': {
          topic: function () {
            const store = new tough.MemoryCookieStore();
            const self = this;
    
            store.putCookie({ domain: 'example.com', path: '/test', key: 'key1', value: 'value1' }, function (err) {
              self.callback(err, store);
            });
          },
          'should initialize domain and path objects without a prototype': function (err, store) {
            assert.ifError(err);
    
            // Check that the domain object does not have a prototype
            assert.strictEqual(Object.getPrototypeOf(store.idx['example.com']), null, 'Domain object has a prototype!');
            // Check that the path object does not have a prototype
            assert.strictEqual(Object.getPrototypeOf(store.idx['example.com']['/test']), null, 'Path object has a prototype!');
          }
        }
      })
    .addBatch({
        'Prototype Pollution Test - Domain __proto__': {
            topic: function () {
                const store = new tough.MemoryCookieStore();
                const self = this;

                // Try to pollute the prototype by setting a cookie with domain "__proto__"
                store.putCookie({ domain: '__proto__', path: '/test', key: 'pollutedKey', value: 'pollutedValue' }, function (err) {
                    self.callback(err, store);
                });
            },
            'should prevent prototype pollution when domain is "__proto__"': function (err, store) {
                assert.ifError(err);

                // Verify that the Object prototype was not polluted
                const pollutedObject = {};
                assert.strictEqual(pollutedObject.pollutedKey, undefined, 'Prototype was polluted!');
            }
        }
    })
    .addBatch({
        'Prototype Pollution Test - Path __proto__': {
            topic: function () {
                const store = new tough.MemoryCookieStore();
                const self = this;

                // Try to pollute the prototype by setting a cookie with path "__proto__"
                store.putCookie({ domain: 'example.com', path: '__proto__', key: 'pollutedKey', value: 'pollutedValue' }, function (err) {
                    self.callback(err, store);
                });
            },
            'should prevent prototype pollution when path is "__proto__"': function (err, store) {
                assert.ifError(err);

                // Verify that the Object prototype was not polluted
                const pollutedObject = {};
                assert.strictEqual(pollutedObject.pollutedKey, undefined, 'Prototype was polluted!');
            }
        }
    })
      .addBatch({
    'putCookie Function': {
      topic: function () {
        const store = new tough.MemoryCookieStore();
        const self = this;

        store.putCookie({ domain: 'example.com', path: '/test', key: 'key1', value: 'value1' }, function (err) {
          self.callback(err, store);
        });
      },
      'should initialize domain and path objects without a prototype': function (err, store) {
        assert.ifError(err);

        // Check that the domain object does not have a prototype
        assert.strictEqual(Object.getPrototypeOf(store.idx['example.com']), null, 'Domain object has a prototype!');
        // Check that the path object does not have a prototype
        assert.strictEqual(Object.getPrototypeOf(store.idx['example.com']['/test']), null, 'Path object has a prototype!');
      }
    }
  })
    .addBatch({
        'removeAllCookies Function': {
            topic: function () {
                const store = new tough.MemoryCookieStore();
                const self = this;

                store.putCookie({ domain: 'example.com', path: '/test', key: 'key1', value: 'value1' }, function (err) {
                    if (err) return self.callback(err);

                    store.removeAllCookies(function (err) {
                        self.callback(err, store);
                    });
                });
            },
            'should reset this.idx as an object without a prototype': function (err, store) {
                assert.ifError(err);

                // Check that this.idx is reset and does not have a prototype
                assert.strictEqual(Object.getPrototypeOf(store.idx), null, 'this.idx was not properly reset!');
            }
        }
    })
    .addBatch({
        'Remove All Cookies Function with Domain __proto__': {
            topic: function () {
                const store = new tough.MemoryCookieStore();
                const self = this;

                // Add a cookie with domain "__proto__"
                store.putCookie({ domain: '__proto__', path: '/test', key: 'key1', value: 'value1' }, function (err) {
                    if (err) return self.callback(err);

                    // Remove all cookies
                    store.removeAllCookies(function (err) {
                        self.callback(err, store);
                    });
                });
            },
            'should reset this.idx as an object without a prototype after removal': function (err, store) {
                assert.ifError(err);

                // Verify that this.idx is reset and does not have a prototype
                assert.strictEqual(Object.getPrototypeOf(store.idx), null, 'this.idx was not properly reset!');

                // Ensure that Object.prototype has not been polluted
                const pollutedObject = {};
                assert.strictEqual(pollutedObject.key1, undefined, 'Prototype was polluted!');
            }
        }
    })
    .export(module);
