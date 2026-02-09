import { Component, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../models/task/task.module';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-todo-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    TaskCardComponent,
    TaskModalComponent,
  ],
  templateUrl: './todo-board.component.html',
  styleUrl: './todo-board.component.css',
})
export class TodoBoardComponent implements OnInit {
  
  @ViewChild(TaskModalComponent) taskModal!: TaskModalComponent;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  todo: ITask[] = [
    { id: 3, title: 'Task 1', description: 'Description for Task 1  ' },
    { id: 4, title: 'Task 2', description: 'Description for Task 2 ' },
  ];
  inProgress: ITask[] = [];
  done: ITask[] = [];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todo));
    localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    localStorage.setItem('done', JSON.stringify(this.done));
  }

  loadFromLocalStorage() {
    const savedTodo = localStorage.getItem('todo');
    const savedInProgress = localStorage.getItem('inProgress');
    const savedDone = localStorage.getItem('done');
    
    if (savedTodo) this.todo = JSON.parse(savedTodo);
    if (savedInProgress) this.inProgress = JSON.parse(savedInProgress);
    if (savedDone) this.done = JSON.parse(savedDone);
  }

  getNextId(): number {
    const allTasks = [...this.todo, ...this.inProgress, ...this.done];
    if (allTasks.length === 0) return 1;
    return Math.max(...allTasks.map(t => t.id)) + 1;
  }

  openModal(task?: ITask) {
    if (task) {
      this.taskModal.open(task);
    } else {
      const newId = this.getNextId();
      this.taskModal.open({ id: newId, title: '', description: '' });
    }
  }

  handleSaveTask(task: ITask) {
    const exists = this.isTaskExists(task.id);
    
    if (exists) {
      this.updateTaskInList(this.todo, task);
      this.updateTaskInList(this.inProgress, task);
      this.updateTaskInList(this.done, task);
    } else {
      this.todo.push(task);
    }
    
    this.saveToLocalStorage();
  }

  updateTaskInList(list: ITask[], task: ITask) {
    const index = list.findIndex((t) => t.id === task.id);
    if (index !== -1) list[index] = task;
  }

  isTaskExists(id: number): boolean {
    return [...this.todo, ...this.inProgress, ...this.done].some(t => t.id === id);
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todo = this.todo.filter((t) => t.id !== taskId);
      this.inProgress = this.inProgress.filter((t) => t.id !== taskId);
      this.done = this.done.filter((t) => t.id !== taskId);
      this.saveToLocalStorage();
    }
  }

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
    this.saveToLocalStorage();
  }
}