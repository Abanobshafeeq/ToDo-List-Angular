import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/task/task.module';
declare var bootstrap: any;
@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Output() saveTask = new EventEmitter<ITask>();
  task: ITask = {
    id: 0,
    title: '',
    description: ''
  };
  isEditMode: boolean = false;
  private modalInstance : any;

  open(taskToEdit: ITask | null) {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      if (taskToEdit) {
        this.isEditMode = true;
        this.task = { ...taskToEdit };
      } else {
        this.isEditMode = false;
        this.task = {
          id: Date.now(),
          title: '',
          description: ''
        };
      }
      this.modalInstance.show();
    }
  }
  onSave() {
    if (this.task.title.trim()) {
      this.saveTask.emit(this.task);
      this.modalInstance.hide();
    } 
  }

  close() {
    this.modalInstance.hide();
  }
}
