import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompoundService } from '../compound.service';

@Component({
  selector: 'app-add-compound',
  templateUrl: './add-compound.component.html',
  styleUrls: ['./add-compound.component.css']
})
export class AddCompoundComponent implements OnInit {
  compoundForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private compoundService: CompoundService,
    private router: Router
  ) {
    this.compoundForm = this.formBuilder.group({
      CompoundName: ['', Validators.required],
      CompounrDescription: ['', Validators.required],
      strImageSource: ['', [Validators.required, Validators.pattern('https?://.+')]], 
      strImageAttribution: ['', [Validators.required, Validators.pattern('https?://.+')]], 
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.compoundForm.valid) {
      this.compoundService.addCompound(this.compoundForm.value).subscribe({
        next: (response) => {
         alert('added successfully')
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
