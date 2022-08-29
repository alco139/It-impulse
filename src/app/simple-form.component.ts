import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Title } from "./title.model";
import { TitleService } from "./title.service";
import { filter, map } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "simple-form",
  templateUrl: "./simple-form.component.html",
  styleUrls: ["./simple-form.component.css"],
})
export class SimpleFormComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  public titles;
  isValid: boolean = false;
  disableButton: boolean = true;

  form = new FormGroup({
    title: new FormControl(),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    acceptTerms: new FormControl(),
  });

  ngOnInit(): void {
    this.titles = this.titleService.getTitles().pipe(
      map((titles) => {
        const sortTitles = titles.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        const finalTitles = sortTitles.filter((title) => title.name.length > 1);
        return finalTitles;
      })
    );

    this.titles.subscribe((title) => {
      this.titles = title;
    });
  }

  onSubmit(): void {
    this.form.controls["lastName"].value.length <= 0
      ? (this.isValid = true)
      : console.log({
          lastName: this.form.controls["lastName"].value,
          firstName: this.form.controls["firstName"].value,
          acceptTerms: this.form.controls["acceptTerms"].value,
          title: this.form.controls["title"].value,
        });
  }

  validateLastName(): void {
    this.form.controls["lastName"].value.length <= 0
      ? (this.isValid = true)
      : (this.isValid = false);
  }
  handleCheckbox(): void {
    this.form.controls["acceptTerms"].value === true
      ? (this.disableButton = false)
      : (this.disableButton = true);
  }
}
