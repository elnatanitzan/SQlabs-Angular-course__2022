import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Task } from 'src/Task.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() _addTask = new EventEmitter();
  @Input() taskToEdit?: Task;


  text: string = '';
  reminder: boolean = false;
  buttonText = 'Create Task'

  ngOnInit(): void {
    if (this.taskToEdit) {
      this.text = this.taskToEdit.text;
      this.reminder = this.taskToEdit.reminder;
      this.buttonText = 'Done'
    }
  }

  onSubmit(e: SubmitEvent): void {
    const newTask: Task = {
      id: Math.random().toString(36),
      text: this.text.trim(),
      date: new Date().toLocaleString(),
      reminder: this.reminder
    }
    this._addTask.emit(newTask);
  }
}
