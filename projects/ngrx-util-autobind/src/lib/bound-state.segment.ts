import { Observable } from 'rxjs';

export type BoundStateSegment<T extends object> = Readonly<T> & { asObservable(): Observable<T> };
