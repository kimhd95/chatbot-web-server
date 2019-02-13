/* jshint node: true, devel: true */
'use strict';

let list  = [
    'profile',
    'food',
    'drink',
    'cafe'
];

let List = function() {
    for (let i in list) {
        this[list[i]]= require('./' + list[i]);
    }
};


module.exports = List;
