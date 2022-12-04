import { Injectable } from '@angular/core';
import { Task } from 'src/Task.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private httpClient: HttpClient) { }

  mainUrl = 'http://localhost:5001/tasks';

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.mainUrl);
  }

  toggleTaskReminder(task: Task): Observable<Task> {
    const url = `${this.mainUrl}/${task.id}`; 
    return this.httpClient.put<Task>(url, task)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.mainUrl}/${task.id}`;
    return this.httpClient.delete<Task>(url)
  }
}
