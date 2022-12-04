import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/Task.interface';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;

  @Output() onDeleteTask = new EventEmitter();
  
  faTrash = faTrash;

  deleteTask() {
    this.onDeleteTask.emit(this.task);
  }
}
