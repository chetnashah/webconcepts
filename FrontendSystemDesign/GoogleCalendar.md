
## Functional requirements

* Create/delete/update events
* Reminders before events via email/notifications
* Day/Month/Week views
* support conflicting events
* multi user (i.e. invite users in an event), and this event will sync in their calendars
* **What about recurring events?**

## NFR

* Accessibility
* offline support
* efficient rendering - switching between day/month/week views should be quick


## Layout overview

1. Year View  - 12 rectangles(one for each month), each rectangle has 30 smalls squares showing each day.
2. Month View - a rectangle with 30 squares (one for each day), the day cell can contain a list of events.
3. Day View - a single vertical view with a bunch of events
4. Event View - generic rectangle describing event




## Data model


```ts
type User {
    name: String;
    id: String;
}

type RSVPStatus = 'YES' | 'NO' | 'Maybe';

type UserRSVPStatus = {
    id: String;
    rsvpStatus: RSVPStatus;
}

type MeetLink = String;

type Store {
    eventsMap: Map<eventId, Event>;
    events: IntervalTree<Event>;
    uiState: UIState;
}

type Event {
    id: String;
    startTime: Date;
    endTime: Date;
    participants: User[];
    repeatInfo: RepeatInfo;
    title: String;
    description: String;
    attachments: File[];
    usersRsvpStatus: UserRSVPStatus[];
    meetLink: MeetLink;
    conflictingEvents: List<EventId>;
    isRecurring: boolean;
}

type UIState {
    currentlyShownView: DAY | MONTH | WEEK;
    currentSelectedTimezone: TimeZone;
    preferredLanguage: Language;
}
```

## API design

```ts
interface Calendar{
    createEvent(eventDetails: EventDetails): Event;
    deleteEvent(id: String);
    updateEvent(id: String, eventDetails: EventDetails): Event;
}
```