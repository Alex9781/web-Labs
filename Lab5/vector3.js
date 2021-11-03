"use strict";

function Vector(x, y, z) {
    this.x = x,
    this.y = y,
    this.z = z,

    this.sum = function(vect) {
        return new Vector(this.x + vect.x, this.y + vect.y, this.z + vect.z);
    },

    this.mult = function(vect) {
        return new Vector(this.x * vect.x, this.y * vect.y, this.z * vect.z);
    },

    this.subtr = function(vect) {
        return new Vector(this.x - vect.x, this.y - vect.y, this.z - vect.z);
    },

    this.multNum = function(num) {
        return new Vector(this.x * num, this.y * num, this.z * num);
    },

    this.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },

    this.scalar = function(vect){
        return this.x * vect.x + this.y * vect.y + this.z * vect.z;
    }
};

let x = new Vector(5, 5, 5);
console.log(x.length());