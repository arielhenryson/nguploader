(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("rxjs/Observable"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "rxjs/Observable"], factory);
	else if(typeof exports === 'object')
		exports["nguploader"] = factory(require("@angular/core"), require("@angular/common"), require("rxjs/Observable"));
	else
		root["nguploader"] = factory(root["@angular/core"], root["@angular/common"], root["rxjs/Observable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("@angular/core");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NetService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NetService = (function () {
    function NetService() {
    }
    NetService.prototype.post = function (url, headers, body) {
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (obser) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            for (var i in headers) {
                xhr.setRequestHeader(i, headers[i]);
            }
            xhr.upload.onprogress = function (e) {
                var ratio = Math.floor((e.loaded / e.total) * 100);
                obser.next({
                    progress: ratio,
                    data: null
                });
            };
            xhr.onload = function () {
                obser.next({
                    progress: 100,
                    data: this.responseText
                });
                obser.complete();
            };
            xhr.send(body);
        });
    };
    return NetService;
}());
NetService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], NetService);



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__file_uploader_ng_uploader_component__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__netService_net_service__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NgUploaderModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NgUploaderModule = NgUploaderModule_1 = (function () {
    function NgUploaderModule() {
    }
    NgUploaderModule.forRoot = function () {
        return {
            ngModule: NgUploaderModule_1,
            providers: []
        };
    };
    return NgUploaderModule;
}());
NgUploaderModule = NgUploaderModule_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__file_uploader_ng_uploader_component__["a" /* NGUploaderComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__file_uploader_ng_uploader_component__["a" /* NGUploaderComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__netService_net_service__["a" /* NetService */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["NO_ERRORS_SCHEMA"]]
    })
], NgUploaderModule);

var NgUploaderModule_1;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__netService_net_service__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NGUploaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NGUploaderComponent = NGUploaderComponent_1 = (function () {
    function NGUploaderComponent(_el, _ngZone, _netService) {
        this._el = _el;
        this._ngZone = _ngZone;
        this._netService = _netService;
        this.filesRef = [];
        this.dragActive = false;
        this.inputActive = true;
        // config
        this.placeholder = "<i class=\"fa fa-cloud-upload\"></i><div>Drag a file or click here</div>";
        this.defaultPlaceholderUrl = '/assets/file.png';
        this.headers = {};
        this.replaceSingleFile = true;
        this.maxFiles = 100;
        this.uploadUrl = "http://localhost:3000/upload";
        this.accept = []; // 'image/*', 'video/*', 'audio/*', 'application/*'
        this.maxFileSize = 1024 * 1024 * 10;
        // events
        this.removeClick = function (self, i) {
            self.files.splice(i, 1);
        };
        this.onNotAcceptedType = function (file) {
            alert(file.type + ' type is not allowed');
        };
        this.onFileSizeTooBig = function (file) {
            alert('File size is too big ' + file.size);
        };
        this.imageClick = function (file) {
            console.log("onImageClick", file);
        };
        this.onMaxFileReached = function () {
            alert("sorry you reached the maximum file limit");
        };
        if (typeof window === "undefined")
            return;
        window['_fileUploader'] = this;
    }
    Object.defineProperty(NGUploaderComponent.prototype, "files", {
        get: function () {
            return this.filesRef;
        },
        set: function (val) {
            this.filesRef = val;
        },
        enumerable: true,
        configurable: true
    });
    NGUploaderComponent.prototype.openFileDialog = function () {
        this.getEl('fileInput')[0].click();
    };
    NGUploaderComponent.prototype.ngOnInit = function () {
        if (typeof window === "undefined")
            return;
        this.validateInputs();
    };
    NGUploaderComponent.prototype.ngAfterViewInit = function () {
        if (typeof window === "undefined")
            return;
        var dragBox = this.getEl('dragBox')[0];
        dragBox.addEventListener("dragover", this.fileDragHover, false);
        dragBox.addEventListener("dragleave", this.fileDragLeave, false);
        dragBox.addEventListener("drop", this.fileSelectHandler, false);
    };
    NGUploaderComponent.prototype.fileDragHover = function (e) {
        var self = window['_fileUploader'];
        e.stopPropagation();
        e.preventDefault();
        self.dragActive = true;
    };
    NGUploaderComponent.prototype.fileDragLeave = function (e) {
        var self = window['_fileUploader'];
        e.stopPropagation();
        e.preventDefault();
        self.zone.run(function () {
            self.dragActive = false;
        });
    };
    NGUploaderComponent.prototype.fileSelectHandler = function (e) {
        var self = window['_fileUploader'];
        // cancel event and hover styling
        self.fileDragHover(e);
        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
        Array.from(files).forEach(function (file) { return self.handleFileUpload(file); });
        self.zone.run(function () {
            self.dragActive = false;
        });
    };
    NGUploaderComponent.prototype.fileAddedEvent = function (event) {
        var _this = this;
        var fileList = event.target.files;
        Array.from(fileList).forEach(function (file) { return _this.handleFileUpload(file); });
        this.clearFileInput();
    };
    NGUploaderComponent.prototype.removeAllFiles = function () {
        this.filesRef = [];
    };
    NGUploaderComponent.prototype.handleFileUpload = function (file) {
        if ((this.maxFiles > 1 && this.filesRef.length === this.maxFiles) ||
            (this.maxFiles === 1 && this.filesRef.length && !this.replaceSingleFile)) {
            this.onMaxFileReached();
            return;
        }
        if (this.maxFiles === 1 && this.filesRef.length && this.replaceSingleFile) {
            this.removeAllFiles();
        }
        var notValidType = !this.isValidType(file);
        if (notValidType) {
            this.onNotAcceptedType(file);
            return;
        }
        var sizeNotOk = !this.isSizeOk(file);
        if (sizeNotOk) {
            this.onFileSizeTooBig(file);
            return;
        }
        this.sendFile(file);
    };
    NGUploaderComponent.prototype.remove = function (i) {
        this.removeClick(this, i);
    };
    NGUploaderComponent.getBody = function (file) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        return formData;
    };
    NGUploaderComponent.prototype.validateInputs = function () {
        if (this.maxFiles < 1) {
            throw "Error -> maxFiles have to be at least 1";
        }
    };
    NGUploaderComponent.prototype.clearFileInput = function () {
        var _this = this;
        this.inputActive = false;
        setTimeout(function () {
            _this.inputActive = true;
        });
    };
    NGUploaderComponent.prototype.isValidType = function (file) {
        if (!this.accept.length)
            return true;
        var fileTypeAcceptIndex = this.accept.indexOf(file.type);
        var fileCat = file.type.split('/')[0];
        var fileCatInArray = this.accept.indexOf(fileCat + "/*");
        if (fileTypeAcceptIndex === -1 && fileCatInArray === -1) {
            return false;
        }
        return true;
    };
    NGUploaderComponent.prototype.isSizeOk = function (file) {
        return file.size < this.maxFileSize;
    };
    NGUploaderComponent.prototype.getEl = function (name) {
        return this._el.nativeElement.getElementsByClassName(name);
    };
    NGUploaderComponent.prototype.sendFile = function (file) {
        var _this = this;
        var body = NGUploaderComponent_1.getBody(file);
        var filePreview = {
            sentPercentage: 0,
            size: file.size,
            type: file.type,
            src: null,
            id: null
        };
        if (this.isImage(file)) {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                filePreview.src = this.result;
            });
            reader.readAsDataURL(file);
        }
        this.filesRef.push(filePreview);
        return this._netService.post(this.uploadUrl, this.getHeaders(), body).subscribe(function (res) {
            if (res.data === null) {
                _this._ngZone.run(function () {
                    filePreview.sentPercentage = res.progress;
                });
                filePreview.sentPercentage = res.progress;
                console.log(filePreview.sentPercentage);
                return;
            }
            var results = JSON.parse(res.data);
            if (results.error) {
                return;
            }
            delete filePreview.sentPercentage;
            filePreview.id = results.data.id;
        });
    };
    NGUploaderComponent.prototype.isImage = function (file) {
        return file.type.search("image") > -1;
    };
    NGUploaderComponent.prototype.getHeaders = function () {
        var headers = {
            'Accept': 'application/json'
        };
        // headers.append('Content-Type', 'multipart/form-data');
        for (var i in this.headers) {
            headers[i] = this.headers[i];
        }
        return headers;
    };
    return NGUploaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "placeholder", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "defaultPlaceholderUrl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "headers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "replaceSingleFile", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "maxFiles", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "uploadUrl", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "accept", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "maxFileSize", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "removeClick", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "onNotAcceptedType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "onFileSizeTooBig", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "imageClick", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], NGUploaderComponent.prototype, "onMaxFileReached", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NGUploaderComponent.prototype, "files", null);
NGUploaderComponent = NGUploaderComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ng-uploader',
        template: "<div class=\"qwFilesUploader\"> <form enctype=\"multipart/form-data\" action=\"\" method=\"post\"> <input class=\"fileInput\" type=\"file\" name=\"file\" (change)=\"fileAddedEvent($event)\" *ngIf=\"maxFiles === 1 && inputActive\" accept=\"{{accept}}\" /> <input class=\"fileInput\" type=\"file\" id=\"file\" name=\"file[]\" (change)=\"fileAddedEvent($event)\" *ngIf=\"maxFiles > 1 && inputActive\" accept=\"{{accept}}\" multiple=\"\"/> <div class=\"dragBox\"> <div class=\"clickArea\" (click)=\"openFileDialog()\" [ngClass]=\"{'dragActive': dragActive }\"></div> <div class=\"placeholder\" *ngIf=\"!filesRef.length\" (click)=\"openFileDialog()\" [innerHTML]=\"placeholder\"></div> <div class=\"filePreview\" *ngFor=\"let file of filesRef; let i = index\"> <div class=\"fileDelete\" (click)=\"remove(i)\">X</div> <div class=\"fileProgress\" *ngIf=\"file.sentPercentage < 100\"> <div class=\"progressIndicator\" [ngStyle]=\"{'width': file.sentPercentage + '%'}\"></div> </div> <img class=\"imagePreview\" [src]=\"file.src\" (click)=\"imageClick(file)\" *ngIf=\"isImage(file) && file.src\" [ngClass]=\"{'blur': file.sentPercentage < 100}\"/> <img class=\"imagePreview\" [src]=\"defaultPlaceholderUrl\" (click)=\"onImageClick(file)\" *ngIf=\"!isImage(file)\" [hidden]=\"file.sentPercentage\"/> </div> </div> </form> </div> "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_1__netService_net_service__["a" /* NetService */]])
], NGUploaderComponent);

var NGUploaderComponent_1;


/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("@angular/common");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nguploader_module__ = __webpack_require__(2);
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "NgUploaderModule", function() { return __WEBPACK_IMPORTED_MODULE_0__nguploader_module__["a"]; });



/***/ }
/******/ ]);
});
//# sourceMappingURL=nguploader.bundle.js.map