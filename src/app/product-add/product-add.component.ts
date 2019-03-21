import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product';
import { ChartsModule } from 'ng2-charts';
import { stringify } from 'querystring';
import { analyzeAndValidateNgModules } from '@angular/compiler';
export interface session {
  value: string;
  viewValue: string;
}
export interface sessionGroup {
  disabled?: boolean;
  name: string;
  session: session[];
}

export interface college {
  value: string;
  viewValue: string;
}
export interface collegeGroup {
  disabled?: boolean;
  name: string;
  college: college[];
}

export interface parameter {
  value: string;
  viewValue: string;
}
export interface parameterGroup {
  disabled?: boolean;
  name: string;
  parameter: parameter[];
}
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  
  sessionGroups: sessionGroup[] = [
    {
      name: 'All sessions',
      session: [
        {value: '2013-14', viewValue: '2013-14'},
        {value: '2014-15', viewValue: '2014-15'},
        {value: '2015-16', viewValue: '2015-16'},
        {value: '2016-17', viewValue: '2016-17'},
        {value: '2017-18', viewValue: '2017-18'},
        {value: '2018-19', viewValue: '2018-19'},
      ]
    }
    
  ];
  collegeGroups: collegeGroup[] = [
    {
      name: 'Aided colleges',
      college: [
        {value: 'DAV', viewValue: 'DAV College'},
        {value: 'PU', viewValue: 'Panjab Univesity'},
      
      ]
     
    },
    {
      name: 'Govt Colleges',
      college: [
        {value: 'PGGCG-11', viewValue: 'PGGCG-11'},
        {value: 'PGGCG-42', viewValue: 'PGGCG-42'},
        {value: 'PGGC-11', viewValue: 'PGGC-11'},
      
      
      ]
      
    }
  ];
parameterGroups: parameterGroup[] = [
    {
      name: 'Funding Related',
      parameter: [
        {value: 'totalfunding', viewValue: 'Total Funding'},
        {value: 'researchgrantfunding', viewValue: 'Research grant funding'},
      
      ]
     
    },
    {
      name: 'Faculty Related',
      parameter: [
        {value: 'Contractual', viewValue: 'Contractual'},
        {value: 'Regular', viewValue: 'Regular'},
        {value: 'Guest', viewValue: 'Guest'},
      
      
      ]
      
    }
  ];
  toppingList: string[] = ['totalfunding', 'researchgrantfunding', 'different', 'again', 'Sausage', 'Tomato'];
  productForm: FormGroup;
  type_prog:string='';
  title_prog:string='';
  exp:number=null;
  isLoadingResults = false;
  
  data: Product[] = [];
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'type_prog' : [null,null],
      'title_prog' : [null, Validators.required],
      
      'duration' : [null, Validators.required],
     
      
    });
    
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    console.log("here");
    this.api.askQuery(form)
      .subscribe(res => {
        this.data = res;
       
        this.isLoadingResults = false;
        
          console.log("Data will be printed")
         
          this.randomize();
         // this.router.navigateByUrl('/products');
          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
       // this.router.navigateByUrl('/products');
      }
       
      public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      public barChartLabels:any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      public barChartType:string = 'bar';
      public barChartLegend:boolean = true;
     
      public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series C'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
      ];
     
      // events
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }
     
      public randomize():void {
        var elem,loc,substr,str;
        var series:any[]=[];
        var datarr={};
        
        this.barChartLabels=[];
       
        for (elem in this.data)
          {     
               console.log(this.data[elem][0].split("#",2)[1]);
               console.log(this.data[elem][1]);
               if(this.barChartLabels.indexOf(this.data[elem][0].split("#",2)[1])===-1)
               {  
                  this.barChartLabels.push(this.data[elem][0].split("#",2)[1]);
                   str= this.data[elem][1].split("#",2)[1];
                 if(str.indexOf("Total")!==-1)
                 {
                   var pos = str.search("Total");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(this.barChartData[0].label);
                  console.log(substr);   
                 }

                
                 if(str.indexOf("Research")!==-1)
                 {
                  var pos = str.search("Research");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr); 
                 }
                 if(str.indexOf("Contractual")!==-1)
                 {
                   var pos = str.search("Contractual");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr);   
                 }
                 if(str.indexOf("Regular")!==-1)
                 {
                   var pos = str.search("Regular");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr);   
                 }
                 if(str.indexOf("Guest")!==-1)
                 {
                   var pos = str.search("Guest");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr);   
                 }

               }
               
               else{ 
                str= this.data[elem][1].split("#",2)[1];
                if(str.indexOf("Contractual")!==-1)
                 {
                   var pos = str.search("Contractual");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr);  
                  console.log(this.data[elem][2]); 
                 }
                 if(str.indexOf("Regular")!==-1)
                 {
                   var pos = str.search("Regular");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr);
                  console.log(this.data[elem][2]);    
                 }
                 if(str.indexOf("Guest")!==-1)
                 {
                   var pos = str.search("Guest");  
                  var pos1 = str.indexOf("20",pos);  
                  substr = str.substring(pos,pos1);
                  console.log(substr);   
                  console.log(this.data[elem][2]); 
                 }



                if(str.indexOf("Total")!==-1)
                {
                  var pos0 = str.search("Total");  
                 var pos2 = str.indexOf("20",pos0);  
                 substr = str.substring(pos0,pos2);
                 console.log(substr);   
                 console.log(this.data[elem][2]); 
                }
                if(str.indexOf("Research")!==-1)
                {
                 var pos = str.search("Research");  
                 var pos1 = str.indexOf("20",pos);  
                 substr = str.substring(pos,pos1);
                 console.log(substr); 
                 console.log(this.data[elem][2]); 
                }
              } 
               
                 
          }
        
        }
          
          
       
      }

    
//Query for SPARQL
//PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//PREFIX owl: <http://www.w3.org/2002/07/owl#>
//PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
//PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
//PREFIX aca: <http://phdwork/research/academic#>
//SELECT ?Institute ?ResearchFunding
//	WHERE { ?Institute aca:has ?object
//                                  FILTER (regex(str(?Institute), "PGGC-11", "i") && regex(str(?object), "totalfunding2017-18", "i")).
//	               ?object aca:amount  ?ResearchFunding .  	
//                               }