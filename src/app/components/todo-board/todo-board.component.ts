import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../models/task/task.module';
import { TaskCardComponent } from '../task-card/task-card.component';
@Component({
  selector: 'app-todo-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskCardComponent],
  templateUrl: './todo-board.component.html',
  styleUrl: './todo-board.component.css',
})
export class TodoBoardComponent {
  todo: ITask[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
    },
  ];
  inProgress: ITask[] = [
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for Task 4',
    },
  ];
  done: ITask[] = [
    {
      id: 5,
      title: 'Task 5',
      description: 'Description for Task 5',
    },
    {
      id: 6,
      title: 'Task 6',
      description: 'Description for Task 6',
    },
  ];

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  deleteTask(taskId: number) {
    this.todo = this.todo.filter((task) => task.id !== taskId);
    this.inProgress = this.inProgress.filter((task) => task.id !== taskId);
    this.done = this.done.filter((task) => task.id !== taskId);
  }

  editTask(task: ITask) {
    const newTitle = window.prompt('Edit Task Title:', task.title);
    

    if (!newTitle) return;

    const updatedTask = { ...task, title: newTitle };

    this.todo = this.todo.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    this.inProgress = this.inProgress.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    this.done = this.done.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  }
}
