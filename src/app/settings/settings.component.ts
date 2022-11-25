import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
public email:string | undefined;
public telefono:string | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/settings/8'+  localStorage.getItem('usuarie-id') )
    .pipe(map((res: any) => {
        this.email= res.email;
        this.telefono= res.telefono;
    }))
    .subscribe();
}
}
