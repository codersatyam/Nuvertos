import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompoundService } from '../compound.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-compound-detail',
  templateUrl: './compound-detail.component.html',
  styleUrls: ['./compound-detail.component.css']
})
export class CompoundDetailComponent implements OnInit {
  compound: any = null; // The compound data
  compoundForm: FormGroup; // Reactive form group for editing
  isEditing: boolean = false; // Flag to determine if in editing mode
  

  constructor(
    private route: ActivatedRoute,
    private compoundService: CompoundService,
    private formBuilder: FormBuilder
  ) {
    this.compoundForm = this.formBuilder.group({
      CompoundName: [''],
      CompounrDescription: [''],
      strImageSource: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Compound ID from route:', id);
      if (id) {
        this.fetchCompoundDetails(id);
      }
    });
  }

  // Fetch compound details by ID
  fetchCompoundDetails(id: string): void {
    this.compoundService.getCompoundById(+id).subscribe(res => {
      this.compound = res.data; // Assign fetched data to compound
      this.compoundForm.patchValue(this.compound); // Populate form with compound details
    });
  }

  // Handle form submission
  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.compoundService.updateCompound(+id, this.compoundForm.value).subscribe(() => {
        alert('Compound updated successfully');
        this.isEditing = false; // Exit editing mode
        this.fetchCompoundDetails(id); // Refetch the updated details
      });
    }
  }

  // Set editing mode and populate form with existing values
  onEdit(): void {
    this.isEditing = true; // Switch to editing mode
    this.compoundForm.patchValue(this.compound); // Prefill form with current values
  }

  // Cancel editing
  onCancel(): void {
    this.isEditing = false; // Exit editing mode
    this.compoundForm.reset(); // Reset the form values
    this.compoundForm.patchValue(this.compound); // Restore form to original compound values
  }
}
