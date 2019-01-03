import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  file: File;

  formats: string[] = ['application/pdf', 'text/plain'];

  public pegarArquivo(file: File) {
    this.file = file;
    console.log(this.file);
  }

  public removerArquivo() {
    this.file = null;
  }
}