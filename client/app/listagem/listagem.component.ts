import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: 'listagem.component.html'
})
export class ListagemComponent {

    fotos: FotoComponent[] = [];
    fotoService: FotoService;
    mensagem: string = '';

    constructor(fotoService: FotoService) {
        this.fotoService = fotoService;
        this.fotoService.Lista().subscribe(
            fotos => this.fotos = fotos,
            erro => console.log(erro)
        );
    }

    remove(foto: FotoComponent) {
        this.fotoService.remove(foto).subscribe(
            () => {
                let novasFotos = this.fotos.slice(0);
                let indice = novasFotos.indexOf(foto);
                novasFotos.splice(indice, 1);
                this.fotos = novasFotos;
                this.mensagem ='Foto removida com sucesso'; 
            },
            erro => {
                console.log(erro);
                this.mensagem = 'Não foi possível remover a foto';
            });
    }
}