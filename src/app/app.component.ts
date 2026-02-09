import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCardComponent } from "./components/task-card/task-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDo-List';
}
