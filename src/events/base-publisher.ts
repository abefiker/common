import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subjects: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subjects: T['subjects'];
  constructor(protected client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subjects, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Event Published to Subject: ', this.subjects);
        resolve();
      });
    });
  }
}
