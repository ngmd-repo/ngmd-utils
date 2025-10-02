import { TRxSubject } from '@ngmd/utils/types';
import { BehaviorSubject, Observable } from 'rxjs';

import { TDestroyStream } from '../types/streams.types';

export class StreamsManager<ExtendsClass extends object> {
  public getSubject<T extends ExtendsClass, K extends keyof T & `${string}$`>(
    streamName: K,
  ): TRxSubject<T> {
    const stream$: TRxSubject<T> = this[streamName as keyof this] as unknown as TRxSubject<T>;

    if (!stream$) throw new Error(`Invalid stream name: "${streamName}"`);

    return this[streamName as keyof this] as unknown as TRxSubject<T>;
  }

  public getStream<
    T extends ExtendsClass,
    K extends keyof T & `${string}$`,
    V extends T[K] extends TRxSubject<infer Value> ? Observable<Value> : never,
  >(streamName: K): V {
    return this.getSubject<T, K>(streamName).asObservable() as unknown as V;
  }

  public getStreamValue<
    T extends ExtendsClass,
    K extends keyof T & `${string}$`,
    V extends T[K] extends TRxSubject<infer Value> ? Value : never,
  >(streamName: K): V {
    const sub$: TRxSubject<T> = this.getSubject<T, K>(streamName);

    if (sub$ instanceof BehaviorSubject) {
      return (sub$ as BehaviorSubject<any>).getValue();
    }

    throw new Error(`${streamName} is not an instance of the class: BehaviorSubject`);
  }

  public emitToStream<
    T extends ExtendsClass,
    K extends keyof T & `${string}$`,
    V extends T[K] extends TRxSubject<infer Value> ? Value | null : unknown,
  >(streamName: K, value: V): void {
    const stream$: TRxSubject<V> = this.getSubject<T, K>(streamName) as unknown as TRxSubject<V>;

    stream$.next(value);
  }

  public resetStreams(streamsData: TDestroyStream<ExtendsClass>[]): void {
    streamsData.forEach(stream => {
      if (typeof stream === 'string') {
        ((this as any)[stream] as unknown as TRxSubject<unknown>).next(null);
      } else {
        const { streamName, streamValue } = stream;

        if (!(this as any)[streamName]) {
          throw new Error(`Stream ${streamName} is not defined`);
        }

        ((this as any)[streamName] as unknown as TRxSubject<unknown>).next(streamValue);
      }
    });
  }

  /**
   * @deprecated use only resetStreams
   */
  public destroyStreams(streamsData: TDestroyStream<ExtendsClass>[]): void {
    streamsData.forEach(stream => {
      if (typeof stream === 'string') {
        ((this as any)[stream] as unknown as TRxSubject<unknown>).next(null);
      } else {
        const { streamName, streamValue } = stream;

        if (!(this as any)[streamName]) {
          throw new Error(`Stream ${streamName} is not defined`);
        }

        ((this as any)[streamName] as unknown as TRxSubject<unknown>).next(streamValue);
      }
    });
  }
}
