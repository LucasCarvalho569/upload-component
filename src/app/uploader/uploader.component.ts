
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'file-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit {
    private readonly UPLOADER_TEXT: string = 'set a custom text using the text property';
    private readonly UPLOADER_THEME: string = 'default';
    private readonly ERROR_MAX_SIZE: number = 1;
    private readonly ERROR_INVALID_FORMAT: number = 2;
    
    public file: File;
    private customMessageLabel: string;
    
    @Input('text')
    public uploaderText: string = this.UPLOADER_TEXT;

    @Input('theme')
    public uploaderTheme: string = this.UPLOADER_THEME;

    @Input('message')
    public messageLabel: string;

    @Input()
    public formats: string[] = [];

    @Input()
    public maxSize: number;

    @Output()
    public pickFile: EventEmitter<File> = new EventEmitter<File>();

    @Output()
    public removeFile: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onError: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit(): void {
        if(this.messageLabel) {
            this.customMessageLabel = this.messageLabel;
        }
        else {
            this.messageLabel = 'No file selected';
            this.customMessageLabel = 'No file selected';
        }
    }

    public getFile(event)  {
        this.file = event.target.files[0];
        if(!this.hasValidSize(this.file)) {
            this.onError.emit(this.ERROR_MAX_SIZE);
            return;
        }
        if(!this.hasValidFormats(this.file)) {
            this.onError.emit(this.ERROR_INVALID_FORMAT);
            return;
        }
        this.setMessageLabel();
        this.pickFile.emit(this.file);
    }

    private setMessageLabel(): void {
        this.messageLabel = this.file ? this.file.name : this.customMessageLabel;
    }

    public unsetFile() {
        if(this.file) {
            this.removeFile.emit(null);
            this.file = null;
            this.setMessageLabel();
        }
    }

    public hasValidSize(file: File): boolean {
        if(file.size > this.maxSize) {
            return false;
        }
        return true;
    }

    public hasValidFormats(file: File): boolean {
        let format: string;
        format = this.formats.find(x => x === file.type)
        if(format) {
            return true;
        }
        return false;
    }
}