import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'title', 'description', 'isProcessed', 'createdAt', 'processedBy', 'processedAt', 'actions'];
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events.data;
    });
  }

  isContributor(): boolean {
    // Implement your logic to check if user is an admin
    return true; // Placeholder for demo
  }

  Process(id: string) {
    // Navigation or logic to edit the event
    this.eventService.processEvent(id).subscribe(response => {
      alert(response.message);
      this.loadEvents();
    })
  }

  deleteEvent(id: number) {
    // Call to service to delete the event, then reload or update the table data
  }
}
