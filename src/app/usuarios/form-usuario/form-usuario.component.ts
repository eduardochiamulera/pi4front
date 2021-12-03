import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit, AfterContentChecked, AfterViewInit {

  @ViewChild("passwordInvalid") div: ElementRef;
  @ViewChild("divPassword") divPassword: ElementRef;
  @ViewChild("divPasswordConfirm") divPasswordConfirm: ElementRef;

  currentAction: string;
  usuarioForm: FormGroup;
  pageTitle: string;
  usuario: UsuarioModel = new UsuarioModel();
  invalidPaswsword: boolean = false

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }
    
  ngAfterViewInit(): void {
    this.hideFields();
  }

    ngAfterContentChecked(): void {
      this.setPageTitle();
    }
  
    ngOnInit(): void {
      this.setCurrentAction();
      this.buildCategoryForm();
      this.loadUsuario();
    }

  private hideFields() {
    if(this.currentAction != "new"){
      this.divPassword.nativeElement.style.display='none';
      this.divPasswordConfirm.nativeElement.style.display='none';
    }
  }

    private loadUsuario(){
      if(this.currentAction == 'edit'){
        const id = this.route.snapshot.params['id'];
        this.usuarioService.getById(id).subscribe(prod => {
          this.usuario = prod;
          this.usuarioForm.patchValue(prod);
        },
        error => alert("Erro ao buscar o usuario"))
      }
    }

  
    salvar(){
      if(this.currentAction == 'new')
        this.createusuario();
      else //currentAction == 'edit'
       this.updateusuario();      
    }
  
    updateusuario() {
      const usuario: UsuarioModel = Object.assign(new UsuarioModel(), this.usuarioForm.value);
  
      this.usuarioService.update(usuario, usuario._id).subscribe(
        prod => this.actionForSuccess(),
        error => alert("Ocorreu um erro: " + error)
      )
    }
  
    createusuario(){
      const usuario: UsuarioModel = Object.assign(new UsuarioModel(), this.usuarioForm.value);
  
      this.usuarioService.create(usuario).subscribe(
        prod => this.actionForSuccess(),
        error => alert("Ocorreu um erro: " + error)
      )
    }
  
    actionForSuccess(){
      alert("usuario Cadastrado com sucesso");
      this.router.navigateByUrl("usuario")
    }
  
    private setPageTitle() {
      if(this.currentAction == 'new')
        this.pageTitle = "Cadastro de Novo usuario"
      else{
        const usuarioName = this.usuario.name || ""
        this.pageTitle = `Editando usuario ${usuarioName}`
      }
    }
  
    private setCurrentAction() {
      if(this.route.snapshot.url[0].path == "new")
        this.currentAction = "new"
      else
        this.currentAction = "edit"
    }
  
    private buildCategoryForm() {
      this.usuarioForm = this.formBuilder.group({
        _id : [null],
        name: [null, [Validators.required, Validators.minLength(5)]],
        email:[null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      });
    }

    validatePassword(password, confirm){
      if(password === "" || (confirm === "")  || (password.toUpperCase() !== confirm.toUpperCase()) )
       {
          this.div.nativeElement.innerHTML = "Senhas não conferem"
          this.invalidPaswsword = true;
      }else{
          this.div.nativeElement.innerHTML = ""
          this.invalidPaswsword = false;
      }

    }

}
