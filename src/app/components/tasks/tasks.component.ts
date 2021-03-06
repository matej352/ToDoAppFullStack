import { Component, OnInit } from '@angular/core';

import {Task} from '../../Task';
import { TaskService } from 'src/app/services/task.service';   //imporatli servis koji će komunicirat s backendom

import { UiService } from 'src/app/services/ui.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  //tasks: Task[] = [];    

  flag:boolean = false;
  subscription!: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) { //servis ubacili u konstruktor komponente (DI)
        this.subscription = uiService.onChange().subscribe(boolValue => this.flag = boolValue);
   }   

  ngOnInit(): void {
    this.tasks$ =  this.taskService.getTasks();
    //this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);   //kao da radimo sa Promise-ima
    
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe( () => this.tasks$ =  this.taskService.getTasks() );
    
    //this.taskService.deleteTask(id).subscribe(() => this.tasks = this.tasks.filter(t => t.id != id));
  }

  markTask(task: Task) {
  
    this.taskService.updateTask(task).subscribe();
  }

  addTask(obj: object) {
    this.taskService.createTask(obj).subscribe(t => {
      this.uiService.changeShowTaskAdd();
      this.tasks$ =  this.taskService.getTasks();
    });
    

   /*this.taskService.createTask(obj).subscribe(t => {
     this.tasks.unshift(t);
     this.uiService.changeShowTaskAdd();
  }); */
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }



}
