import { Component, OnInit } from '@angular/core';
import { CompoundService } from '../compound.service';

@Component({
  selector: 'app-compound-list',
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.css'],
})
export class CompoundListComponent implements OnInit {
  handleClick(id: string): void {
    console.log('Button clicked for compound ID:', id);
  }
  page = 1;
  pageSize = 8;
  compounds: any[] = [];
  isLoading = true;
  shimmerItems: number[] = Array(8).fill(0);

  constructor(private compoundService: CompoundService) {}

  ngOnInit(): void {
    this.compoundService.getCompounds(1, 50).subscribe({
      next: (response) => {
        this.compounds = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
