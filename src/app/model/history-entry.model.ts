
export class HistoryEntry {
  id: string | null;
  timestamp: Date;
  user: string;
  action: string;

  constructor(id: string | null, timestamp?: Date, user?: string, action?: string) {
    this.id = id ;
    this.timestamp = timestamp || new Date();
    this.user = user || '';
    this.action = action || '';
  }

  
}


