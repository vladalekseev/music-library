import { Id } from '../types';

interface ITrack {
  id: Id;
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: [string, string];
  active: boolean;
}

export class Track implements ITrack {
  constructor(
    public id: Id,
    public name: string,
    public cover: string,
    public artist: string,
    public audio: string,
    public color: [string, string],
    public active: boolean,
  ) {}
}
