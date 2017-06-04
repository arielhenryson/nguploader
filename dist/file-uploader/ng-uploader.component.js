import { Component, Input, ElementRef, NgZone } from '@angular/core';
import { NetService } from "../netService/net.service";
var NGUploaderComponent = (function () {
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
        var body = NGUploaderComponent.getBody(file);
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
export { NGUploaderComponent };
NGUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-uploader',
                template: "<div class=\"qwFilesUploader\"> <form enctype=\"multipart/form-data\" action=\"\" method=\"post\"> <input class=\"fileInput\" type=\"file\" name=\"file\" (change)=\"fileAddedEvent($event)\" *ngIf=\"maxFiles === 1 && inputActive\" accept=\"{{accept}}\" /> <input class=\"fileInput\" type=\"file\" id=\"file\" name=\"file[]\" (change)=\"fileAddedEvent($event)\" *ngIf=\"maxFiles > 1 && inputActive\" accept=\"{{accept}}\" multiple=\"\"/> <div class=\"dragBox\"> <div class=\"clickArea\" (click)=\"openFileDialog()\" [ngClass]=\"{'dragActive': dragActive }\"></div> <div class=\"placeholder\" *ngIf=\"!filesRef.length\" (click)=\"openFileDialog()\" [innerHTML]=\"placeholder\"></div> <div class=\"filePreview\" *ngFor=\"let file of filesRef; let i = index\"> <div class=\"fileDelete\" (click)=\"remove(i)\">X</div> <div class=\"fileProgress\" *ngIf=\"file.sentPercentage < 100\"> <div class=\"progressIndicator\" [ngStyle]=\"{'width': file.sentPercentage + '%'}\"></div> </div> <img class=\"imagePreview\" [src]=\"file.src\" (click)=\"imageClick(file)\" *ngIf=\"isImage(file) && file.src\" [ngClass]=\"{'blur': file.sentPercentage < 100}\"/> <img class=\"imagePreview\" [src]=\"defaultPlaceholderUrl\" (click)=\"onImageClick(file)\" *ngIf=\"!isImage(file)\" [hidden]=\"file.sentPercentage\"/> </div> </div> </form> </div> "
            },] },
];
/** @nocollapse */
NGUploaderComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
    { type: NetService, },
]; };
NGUploaderComponent.propDecorators = {
    'placeholder': [{ type: Input },],
    'defaultPlaceholderUrl': [{ type: Input },],
    'headers': [{ type: Input },],
    'replaceSingleFile': [{ type: Input },],
    'maxFiles': [{ type: Input },],
    'uploadUrl': [{ type: Input },],
    'accept': [{ type: Input },],
    'maxFileSize': [{ type: Input },],
    'removeClick': [{ type: Input },],
    'onNotAcceptedType': [{ type: Input },],
    'onFileSizeTooBig': [{ type: Input },],
    'imageClick': [{ type: Input },],
    'onMaxFileReached': [{ type: Input },],
    'files': [{ type: Input },],
};
//# sourceMappingURL=ng-uploader.component.js.map