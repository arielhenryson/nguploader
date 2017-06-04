import { Component, OnInit, Input, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Headers, RequestOptions } from "@angular/http";
import { NetService } from "../netService/net.service";


@Component({
    selector: 'ng-uploader',
    templateUrl: './ng-uploader.component.html'
})
export class NGUploaderComponent implements OnInit, AfterViewInit {
    constructor(
        private _el: ElementRef,
        private _ngZone: NgZone,
        private _netService: NetService
    ) {
        if (typeof window === "undefined") return;

        window['_fileUploader'] = this;
    }

    filesRef = [];
    dragActive = false;
    inputActive = true;

    // config
    @Input() placeholder = `<i class="fa fa-cloud-upload"></i><div>Drag a file or click here</div>`;
    @Input() defaultPlaceholderUrl = '/assets/file.png';
    @Input() headers = {};
    @Input() replaceSingleFile = true;
    @Input() maxFiles = 100;
    @Input() uploadUrl = "http://localhost:3000/upload";
    @Input() accept = []; // 'image/*', 'video/*', 'audio/*', 'application/*'
    @Input() maxFileSize = 1024 * 1024 * 10;


    // events
    @Input() private removeClick = function(self, i) {
        self.files.splice(i, 1);
    };

    @Input() private onNotAcceptedType = function(file) {
        alert(file.type + ' type is not allowed');
    };


    @Input() private onFileSizeTooBig = function(file) {
        alert('File size is too big ' + file.size);
    };


    @Input() private imageClick = function (file) {
        console.log("onImageClick", file);
    };


    @Input() private onMaxFileReached = function () {
        alert("sorry you reached the maximum file limit");
    };


    @Input()
    get files() {
        return this.filesRef;
    }

    set files(val) {
        this.filesRef = val;
    }


    openFileDialog() {
        this.getEl('fileInput')[0].click();
    }


    ngOnInit() {
        if (typeof window === "undefined") return;
        this.validateInputs();
    }


    ngAfterViewInit() {
        if (typeof window === "undefined") return;
        const dragBox = this.getEl('dragBox')[0];
        dragBox.addEventListener("dragover", this.fileDragHover, false);
        dragBox.addEventListener("dragleave", this.fileDragLeave, false);
        dragBox.addEventListener("drop", this.fileSelectHandler, false);
    }


    fileDragHover(e) {
        const self = window['_fileUploader'];

        e.stopPropagation();
        e.preventDefault();

        self.dragActive = true;
    }


    fileDragLeave(e) {
        const self = window['_fileUploader'];


        e.stopPropagation();
        e.preventDefault();

        self.zone.run(() => {
            self.dragActive = false;
        });
    }


    fileSelectHandler(e) {
        const self = window['_fileUploader'];
        // cancel event and hover styling
        self.fileDragHover(e);

        // fetch FileList object
        const files = e.target.files || e.dataTransfer.files;

        Array.from(files).forEach(file => self.handleFileUpload(file) );

        self.zone.run(() => {
            self.dragActive = false;
        });
    }


    fileAddedEvent(event) {
        let fileList: FileList = event.target.files;
        Array.from(fileList).forEach(file => this.handleFileUpload(file) );

        this.clearFileInput();
    }


    removeAllFiles() {
        this.filesRef = [];
    }


    handleFileUpload(file) {
        if (
            (this.maxFiles > 1 && this.filesRef.length === this.maxFiles) ||
            (this.maxFiles === 1 && this.filesRef.length && !this.replaceSingleFile)
        ) {
            this.onMaxFileReached();
            return;
        }

        if (this.maxFiles === 1 && this.filesRef.length && this.replaceSingleFile) {
            this.removeAllFiles();
        }


        const notValidType = !this.isValidType(file);
        if (notValidType) {
            this.onNotAcceptedType(file);
            return;
        }

        const sizeNotOk = !this.isSizeOk(file);
        if (sizeNotOk) {
            this.onFileSizeTooBig(file);
            return;
        }


        this.sendFile(file);
    }


    remove(i) {
        this.removeClick(this, i);
    }


    static getBody(file) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return formData;
    }


    private validateInputs() {
        if (this.maxFiles < 1) {
            throw "Error -> maxFiles have to be at least 1";
        }
    }


    private clearFileInput() {
        this.inputActive = false;
        setTimeout(() => {
            this.inputActive = true;
        });
    }


    private isValidType(file) {
        if (!this.accept.length) return true;

        const fileTypeAcceptIndex = this.accept.indexOf(file.type);

        const fileCat = file.type.split('/')[0];
        const fileCatInArray = this.accept.indexOf(fileCat + "/*");

        if (fileTypeAcceptIndex === -1 && fileCatInArray === -1) {
            return false;
        }


        return true;
    }


    private isSizeOk(file) {
        return file.size < this.maxFileSize;
    }


    private getEl(name) {
        return this._el.nativeElement.getElementsByClassName(name);
    }


    private sendFile(file) {
        const body = NGUploaderComponent.getBody(file);

        const filePreview = {
            sentPercentage: 0,
            size: file.size,
            type: file.type,
            src: null,
            id: null
        };


        if (this.isImage(file)) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                filePreview.src = this.result;
            });
            reader.readAsDataURL(file);
        }


        this.filesRef.push(filePreview);


        return this._netService.post(this.uploadUrl, this.getHeaders(), body).subscribe((res: any) => {
            if (res.data === null) {
                this._ngZone.run(() => {
                    filePreview.sentPercentage = res.progress;
                });
                filePreview.sentPercentage = res.progress;
                console.log(filePreview.sentPercentage);
                return;
            }

            const results = JSON.parse(res.data);

            if (results.error) {
                return;
            }


            delete filePreview.sentPercentage;
            filePreview.id = results.data.id;
        });
    }


    public isImage(file) {
        return file.type.search("image") > -1;
    }


    private getHeaders() {
        const headers = {
            'Accept': 'application/json'
        };
        // headers.append('Content-Type', 'multipart/form-data');


        for (let i in this.headers) {
            headers[i] = this.headers[i];
        }

        return headers;
    }
}
