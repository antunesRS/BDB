"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location(latitude, longitude) {
        this._latitude = latitude;
        this._longitude = longitude;
    }
    Location.prototype.compareLocation = function (location) {
        return true;
    };
    Object.defineProperty(Location.prototype, "latitude", {
        get: function () {
            return this._latitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Location.prototype, "longitude", {
        get: function () {
            return this._longitude;
        },
        enumerable: true,
        configurable: true
    });
    return Location;
}());
exports.default = Location;
