import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoModel } from '../shared/produto.model';
import { ProdutoService } from '../shared/produto.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.css']
})
export class FormProdutoComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  produtoForm: FormGroup;
  pageTitle: string;
  produto: ProdutoModel = new ProdutoModel();

  constructor(private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadProduto();
  }

  private loadProduto(){
    if(this.currentAction == 'edit'){
      const id = this.route.snapshot.params['id'];
      this.produtoService.getById(id).subscribe(prod => {
        this.produto = prod;
        this.produtoForm.patchValue(prod);
      },
      error => alert("Erro ao buscar o produto"))
    }
  }

  salvar(){
    if(this.currentAction == 'new')
      this.createProduto();
    else //currentAction == 'edit'
      console.log()  
     this.updateProduto();      
  }

  updateProduto() {
    const produto: ProdutoModel = Object.assign(new ProdutoModel, this.produtoForm.value);

    this.produtoService.update(produto, produto._id).subscribe(
      prod => this.actionForSuccess(),
      error => alert("Ocorreu um erro: " + error)
    )
  }

  createProduto(){
    const produto: ProdutoModel = Object.assign(new ProdutoModel, this.produtoForm.value);

    this.produtoService.create(produto).subscribe(
      prod => this.actionForSuccess(),
      error => alert("Ocorreu um erro: " + error)
    )
  }

  actionForSuccess(){
    alert("Produto Cadastrado com sucesso");
    this.router.navigateByUrl("produto")
  }

  private setPageTitle() {
    if(this.currentAction == 'new')
      this.pageTitle = "Cadastro de Novo Produto"
    else{
      const produtoName = this.produto.name || ""
      this.pageTitle = `Editando Produto ${produtoName}`
    }
  }

  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  private buildCategoryForm() {
    this.produtoForm = this.formBuilder.group({
      _id : [null],
      name: [null, [Validators.required, Validators.minLength(5)]],
      price:[null, [Validators.required, Validators.min(1)]]
    });
  }

}
