import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../models/task/task.module';
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task!: ITask;
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<ITask>();
}
